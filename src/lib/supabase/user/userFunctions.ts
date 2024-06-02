import { createClient } from '@/utils/supabase/client';

const setupUserProfile = async (values: { firstName: string; lastName: string; username: string }) => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) throw 'no user';

  const res = await supabase.from('Profile').insert({
    id: user.id,
    first_name: values.firstName,
    last_name: values.lastName,
    username: values.username,
    email: user.email,
  });

  if (res.error?.code === '23505') return { profileError: 'Username is taken' };
};

export { setupUserProfile };
