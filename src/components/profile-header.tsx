import { getUserProfile } from '@/lib/supabase/user/userFunctions';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { poppins } from '@/utils/font.config';
import moment from 'moment';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

const ProfileHeader = async ({ user_id }: { user_id: string }) => {
  const supabase = createClient();
  const { first_name, last_name, username, bio, joined_on } = await getUserProfile(user_id);
  const joinedDateFormatted = moment(joined_on).format('MMMM YYYY');

  
  const { data } = await supabase.storage.from('avatars').getPublicUrl(`public/${user_id}`);

  return (
    <div className={`relative w-full animate-diagonal-green-wave flex flex-row justify-center`}>
      <div className={`flex flex-col items-center gap-[16px] px-[5px] py-[32px]`}>
        <div className={`relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-[50%] bg-primary`}>
        <Image src={data.publicUrl} alt={username} width={150} height={150} style={{
            position:'absolute',
            borderRadius:'50%',
            width:'100%',
            height:'100%',
            objectFit:'cover'
            }}
            priority
            />
        </div>
     
       
        <h1 className={`${poppins.className} text-h3 font-medium`}>
          {first_name} {last_name}
        </h1>

        {bio ? <p className={`text-base text-center`}>{bio}</p> : ''}

        <div className={`h-5 flex items-center gap-2`}>
          <span>@{username}</span>
          <Separator orientation='vertical' className={`bg-neutral`} />

          <span>Joined {joinedDateFormatted}</span>
          <Separator orientation='vertical' className={`bg-neutral`} />

          <span>5.0 rating</span>
        </div>
        <Dialog modal={false}>
          <DialogTrigger className={` bg-[#247c49] mt-4 px-[25px] py-[8px] rounded ${poppins.className} text-sm`}>
            Profile settings
          </DialogTrigger>
          <DialogContent className={`bg-dark border-0 rounded`}>
            <DialogHeader>
              <DialogTitle className={`text-h3`}>Edit Profile</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileHeader;
