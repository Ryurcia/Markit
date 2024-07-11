import ProfileHeader from '@/components/profile-header';
import { createClient } from '@/utils/supabase/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { poppins } from '@/utils/font.config';
import dynamic from 'next/dynamic';

const UserSales = dynamic(async () => import('../profile/(sub-components)/UserSales'), {
  loading: () => <h1>Fetching...</h1>,
});

const UserJobs = dynamic(async () => import('../profile/(sub-components)/UserJobs'), {
  loading: () => <h1>Fetching...</h1>,
});

const UserServices = dynamic(async () => import('../profile/(sub-components)/UserServices'), {
  loading: () => <h1>Fetching...</h1>,
});

const page = async ({ searchParams }: { searchParams: { uid: string } }) => {
  const supabase = createClient();
  let userId = searchParams.uid;

  return (
    <div>
      <ProfileHeader user_id={userId} />
      <div className={`flex justify-start`}>
        <Tabs defaultValue='sales' className='mt-3 ml-2 p-3 '>
          <TabsList className={`bg-dark rounded h-[50px]`}>
            <TabsTrigger
              className={`text-[18px] ${poppins.className} data-[state=active]:bg-primary rounded`}
              value='sales'
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              className={`text-[18px] ${poppins.className} data-[state=active]:bg-primary rounded `}
              value='jobs'
            >
              Jobs
            </TabsTrigger>
            <TabsTrigger
              className={`text-[18px] ${poppins.className} data-[state=active]:bg-primary rounded `}
              value='services'
            >
              Services
            </TabsTrigger>
          </TabsList>
          <TabsContent value='sales'>
            <UserSales userId={userId} />
          </TabsContent>
          <TabsContent value='jobs'>
            <UserJobs userId={userId} />
          </TabsContent>
          <TabsContent value='services'>
            <UserServices userId={userId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
