const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function saveConversation(sessionId, messages, profile = {}) {
  const { data, error } = await supabase
    .from('conversations')
    .upsert({
      session_id: sessionId,
      messages: messages,
      client_profile: profile,
      updated_at: new Date().toISOString()
    }, { onConflict: 'session_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getConversation(sessionId) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

async function searchKnowledge(query) {
  const { data, error } = await supabase
    .from('knowledge_base')
    .select('title, content, category, subcategory')
    .textSearch('content', query, { type: 'websearch' })
    .limit(5);

  if (error) {
    const { data: allData } = await supabase
      .from('knowledge_base')
      .select('title, content, category, subcategory')
      .limit(10);
    return allData || [];
  }
  return data || [];
}

async function getPricing(destination = null) {
  let query = supabase
    .from('pricing')
    .select('*')
    .eq('is_active', true)
    .order('base_price');

  if (destination) {
    query = query.ilike('destination', `%${destination}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function saveLead(leadData) {
  const { data, error } = await supabase
    .from('leads')
    .insert(leadData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getLeads(status = null) {
  let query = supabase
    .from('leads')
    .select('*, conversations(session_id, messages)')
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function getAllConversations() {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data;
}

async function addKnowledge(entry) {
  const { data, error } = await supabase
    .from('knowledge_base')
    .insert(entry)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getAllKnowledge() {
  const { data, error } = await supabase
    .from('knowledge_base')
    .select('id, category, subcategory, title, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

async function updatePricing(id, updates) {
  const { data, error } = await supabase
    .from('pricing')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function updateLeadStatus(id, status) {
  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

module.exports = {
  saveConversation,
  getConversation,
  searchKnowledge,
  getPricing,
  saveLead,
  getLeads,
  getAllConversations,
  addKnowledge,
  getAllKnowledge,
  updatePricing,
  updateLeadStatus
};
