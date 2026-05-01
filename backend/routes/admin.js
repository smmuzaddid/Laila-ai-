const express = require('express');
const router = express.Router();
const {
  getLeads,
  getAllConversations,
  addKnowledge,
  getAllKnowledge,
  updatePricing,
  getPricing,
  updateLeadStatus
} = require('../services/supabase');

const adminAuth = (req, res, next) => {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

router.get('/leads', adminAuth, async (req, res) => {
  try {
    const leads = await getLeads(req.query.status);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/leads/:id/status', adminAuth, async (req, res) => {
  try {
    const lead = await updateLeadStatus(req.params.id, req.body.status);
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/conversations', adminAuth, async (req, res) => {
  try {
    const conversations = await getAllConversations();
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/pricing', adminAuth, async (req, res) => {
  try {
    const pricing = await getPricing();
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/pricing/:id', adminAuth, async (req, res) => {
  try {
    const updated = await updatePricing(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/knowledge', adminAuth, async (req, res) => {
  try {
    const knowledge = await getAllKnowledge();
    res.json(knowledge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/knowledge', adminAuth, async (req, res) => {
  try {
    const { category, subcategory, title, content } = req.body;
    const entry = await addKnowledge({ category, subcategory, title, content });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
