const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDMwMzY0NywiZXhwIjoyMDU5ODc5NjQ3fQ.MRTSJM37ZMqG8ixq948xebNfRNc-koV-K3bsiMh2Dt0";
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co";

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(projectURL, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

module.exports = async (req, res) => {
  const { userID, email, new_password } = req.body;
  //redirect to reset password link
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://example.com/update-password',
})
  //update the password in auth database
  const { data, error } = await supabase.auth.admin.updateUserById(
  { password: new_password }
)

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json(data);
}
