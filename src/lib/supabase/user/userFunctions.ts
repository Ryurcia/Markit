import { createClient } from '@/utils/supabase/server';

// const setupUserProfile = async (values: { firstName: string; lastName: string; username: string }) => {
//   const supabase = createClient();
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   if (!user || error) throw 'no user';

//   const res = await supabase.from('Profile').insert({
//     id: user.id,
//     first_name: values.firstName,
//     last_name: values.lastName,
//     username: values.username,
//     email: user.email,
//   });

//   if (res.error?.code === '23505') return { profileError: 'Username is taken' };
// };

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
