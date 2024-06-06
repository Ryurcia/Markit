import ProfileHeader from '@/components/profile-header';
import { getUserProfile } from '@/lib/supabase/user/userFunctions';
import { createClient } from '@/utils/supabase/server';
import moment from 'moment';

const page = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <ProfileHeader user_id={user?.id!} />
    </div>
  );
};

export default page;
