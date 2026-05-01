const express = require('express');
const router = express.Router();
const { searchKnowledge, getPricing } = require('../services/supabase');

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query parameter q is required' });

    const results = await searchKnowledge(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/pricing', async (req, res) => {
  try {
    const { destination } = req.query;
    const pricing = await getPricing(destination);
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
