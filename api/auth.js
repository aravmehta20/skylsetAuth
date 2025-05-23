const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew";
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co";

const supabase = window.supabase.createClient(projectURL, anonKey);
async function signUp(name, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    email_confirm: true,
    password: password,
    user_metadata: {
      name: name,
      saved_opportunities: {}
    }
  });

  if (error) {
    console.error('Signup error:', error.message);
    return null;
  }

  console.log('Signup successful:', data);
  return data;
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out user:', error.message)
  } else {
    console.log('User account deleted successfully')
  }
}
async function resetPassword(){
const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://example.com/update-password',
})
}
async function deleteAccount() {
  //Retrieve current User
  const user = supabase.auth.user();
  //If there is no user logged in, end function here
  if (!user) {
    console.error('No user logged in')
    return;
  }
  //Delete User
  const { error } = await supabase.auth.api.deleteUser(user.id);
  if (error) {
    console.error('Error deleting user:', error.message)
  } else {
    console.log('User account deleted successfully')
    // Sign out user after deletion
    await signOut();
  }
}
