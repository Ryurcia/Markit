import ProfileHeader from '@/components/profile-header';
import { createClient } from '@/utils/supabase/server';

const page = async ({ searchParams }: { searchParams: { uid: string } }) => {
  const supabase = createClient();
  let userId = searchParams.uid;

  if (!searchParams) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    userId = user?.id!;
  }

  return (
    <div>
      <ProfileHeader user_id={userId} />
    </div>
  );
};

export default page;
