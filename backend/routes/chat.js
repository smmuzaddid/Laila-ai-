const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { chat, extractClientProfile } = require('../services/claude');
const {
  saveConversation,
  getConversation,
  searchKnowledge,
  getPricing,
  saveLead
} = require('../services/supabase');

router.post('/message', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const sid = sessionId || uuidv4();
    const existingConversation = await getConversation(sid);
    const history = existingConversation?.messages || [];

    const relevantKnowledge = await searchKnowledge(message);

    let pricingContext = '';
    const priceKeywords = ['price', 'cost', 'fee', 'how much', 'package', 'pricing'];
    if (priceKeywords.some(k => message.toLowerCase().includes(k))) {
      const pricing = await getPricing();
      pricingContext = '\n\nCURRENT PRICING:\n' +
        pricing.map(p =>
          `${p.destination} - ${p.package_name}: ${p.base_price} ${p.currency} (${p.processing_days} days)`
        ).join('\n');
    }

    const context = relevantKnowledge
      .map(k => `[${k.category.toUpperCase()} - ${k.subcategory || 'General'}]\n${k.title}\n${k.content}`)
      .join('\n\n') + pricingContext;

    const updatedHistory = [
      ...history,
      { role: 'user', content: message }
    ];

    const aiResponse = await chat(updatedHistory, context);

    const finalHistory = [
      ...updatedHistory,
      { role: 'assistant', content: aiResponse }
    ];

    let profile = existingConversation?.client_profile || {};

    // Extract profile every 10 messages
    if (finalHistory.length % 10 === 0) {
      const conversationText = finalHistory
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');
      profile = await extractClientProfile(conversationText);

      // Auto-save lead if email is detected and not yet saved
      if (profile.email && !existingConversation?.lead_saved) {
        await saveLead({
          conversation_id: existingConversation?.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          nationality: profile.nationality,
          business_type: profile.business_type,
          budget: profile.budget_range,
          interested_destination: profile.interested_destinations?.join(', '),
        });
      }
    }

    await saveConversation(sid, finalHistory, profile);

    res.json({
      response: aiResponse,
      sessionId: sid,
      profile: profile
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'AI service temporarily unavailable. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/history/:sessionId', async (req, res) => {
  try {
    const conversation = await getConversation(req.params.sessionId);
    res.json(conversation || { messages: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
