import { createClient } from '@/utils/supabase/client';

const SignUpNewUser = async (values: { email: string; password: string }) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  if (error) return { authErrorMessage: error.message };
};

export { SignUpNewUser };
