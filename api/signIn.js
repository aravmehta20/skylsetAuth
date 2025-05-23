const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDMwMzY0NywiZXhwIjoyMDU5ODc5NjQ3fQ.MRTSJM37ZMqG8ixq948xebNfRNc-koV-K3bsiMh2Dt0";
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co";

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.admin.signInWithPassword({
    email: email,
    password: password, 
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json(data);
};
