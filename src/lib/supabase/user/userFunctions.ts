import { createClient } from '@/utils/supabase/server';

const getUserProfile = async (user_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('Profile')
    .select('first_name,last_name,bio,username,joined_on')
    .eq('id', user_id)
    .limit(1)
    .single();

  if (error) {
    console.error(error.message);
  }

  return {
    first_name: data?.first_name,
    last_name: data?.last_name,
    username: data?.username,
    bio: data?.bio,
    joined_on: data?.joined_on,
  };
};

export { getUserProfile };
