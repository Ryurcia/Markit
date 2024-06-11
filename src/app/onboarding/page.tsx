import { createClient } from '@/utils/supabase/server';
import Onboarding from './(sub-components)/Onboarding';
import { redirect } from 'next/navigation';

const page = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect('/signup');

  const { data } = await supabase.from('Profile').select('username').eq('id', user.id).limit(1).single();

  if (data?.username) return redirect('/home');

  return <Onboarding />;
};

export default page;
