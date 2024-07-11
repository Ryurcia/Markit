import JobCard from '@/components/job-card';
import { createClient } from '@/utils/supabase/server';

const UserJobs = async ({ userId }: { userId: string }) => {
  const supabase = createClient();
  const { data } = await supabase.from('Job_Post').select('*').eq('author_id', userId);

  return (
    <div className={`flex justify-start flex-wrap gap-3`}>
      {data?.map((res) => {
        const cardProps = {
          id: res.id,
          title: res.title,
          created_at: res.created_at,
          company: res.company_name,
          desc: res.job_desc,
          tag: res.tag,
          pay: res.pay,
        };
        return <JobCard key={res.id} props={cardProps} />;
      })}
    </div>
  );
};

export default UserJobs;
