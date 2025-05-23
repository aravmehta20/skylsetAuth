const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDMwMzY0NywiZXhwIjoyMDU5ODc5NjQ3fQ.MRTSJM37ZMqG8ixq948xebNfRNc-koV-K3bsiMh2Dt0";
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co";

const supabase = window.supabase.createClient(projectURL, serviceRoleKey);

//sign up function
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

async function signIn(email, password){
  const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
})
}
//sign out function
async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out user:', error.message)
  } else {
    console.log('User account deleted successfully')
  }
}

//reset password function
async function resetPassword(){
const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://example.com/update-password',
})
}
//delete account function
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
