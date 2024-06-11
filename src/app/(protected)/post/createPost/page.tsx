import { createClient } from '@/utils/supabase/server';
import CreatePost from './(sub-components)/createPost';
import { redirect } from 'next/navigation';

const page = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect('/signin');
  return <CreatePost />;
};

export default page;
