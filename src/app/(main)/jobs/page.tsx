import BookmarkButton from '@/components/bookmark-btn';
import { Badge } from '@/components/ui/badge';
import { getJobData } from '@/lib/supabase/jobs/jobFunctions';
import { poppins } from '@/utils/font.config';
import moment from 'moment';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createClient } from '@/utils/supabase/server';
import JobEditForm from './(sub-components)/JobEditForm';

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const params = searchParams.id;
  const jobData = await getJobData(params);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currUserId = user ? user.id : '';

  const requirements = jobData.requirements.split(',');
  return (
    <div className={`px-[16px] mt-[32px] md:w-[95%] md:mx-auto md:px-0 grid grid-rows-2 gap-2 items-center`}>
      <div className={`flex flex-col gap-3`}>
        <div>
          <div className={`flex gap-4 items-center`}>
            <h1 className={`${poppins.className} text-h3 font-semibold md:text-h2 lg:text-h1`}>{jobData.title}</h1>
            <BookmarkButton catType={'jobs'} id={jobData.id} title={jobData.title} />
          </div>
          <Badge className={`border-0 rounded bg-primary mb-3`}>{jobData.tag}</Badge>
          <p className={`opacity-50 text-[18px]`}>Salary ${jobData.pay}/year</p>
        </div>
        <p className={`text-sub font-semibold`}>{jobData.company_name}</p>
        <p>{jobData.job_desc}</p>
      </div>

      <div>
        <h1 className={`mb-2 text-sub font-semibold`}>Job Requirements</h1>
        <div>
          {requirements.map((req: any, index: number) => {
            return (
              <p key={index} className={`mb-[5px]`}>
                {' '}
                &bull;{req}
              </p>
            );
          })}
        </div>
      </div>

      <div>
        {jobData.author_id === currUserId ? (
          <Dialog modal={false}>
            <DialogTrigger className={`px-[25px] py-[8px] bg-primary text-neutral rounded`}>Edit</DialogTrigger>
            <DialogContent className={`bg-dark rounded`}>
              <DialogHeader>
                <DialogTitle className={`text-h3 ${poppins.className}`}>Edit Post</DialogTitle>
                <DialogDescription>Make changes to your post</DialogDescription>
              </DialogHeader>
              <JobEditForm
                props={{
                  job_id: jobData.id,
                  title: jobData.title,
                  requirements: jobData.requirements,
                  description: jobData.job_desc,
                  company_name: jobData.company_name,
                  pay: jobData.pay,
                }}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog modal={false}>
            <DialogTrigger className={`bg-primary py-[10px] px-[30px] rounded `}>Contact Info</DialogTrigger>
            <DialogContent className={`bg-dark rounded`}>
              <DialogHeader>
                <DialogTitle className={`text-h3 ${poppins.className}`}>Contact Info</DialogTitle>
                <DialogDescription>You can communicate your interest with provided info.</DialogDescription>
              </DialogHeader>
              <div>
                <h1>Apply at</h1>
                <p>{jobData.email}</p>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <p className={`mt-5`}>
          Posted {moment(jobData.created_at).fromNow()} by{' '}
          <Link className={`underline`} href={`/profile?uid=${jobData.author_id}`}>
            {' '}
            @{jobData.author_username}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
