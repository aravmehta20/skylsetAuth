const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDMwMzY0NywiZXhwIjoyMDU5ODc5NjQ3fQ.MRTSJM37ZMqG8ixq948xebNfRNc-koV-K3bsiMh2Dt0";
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co";

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

module.exports = async (req, res) => {
  const { name, email, password } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
    password,
    user_metadata: { 
      name, 
      saved_opportunities: {} 
                   }
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json(data);
};


