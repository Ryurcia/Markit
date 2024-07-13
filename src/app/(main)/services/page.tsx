import BookmarkButton from '@/components/bookmark-btn';
import { getServiceData } from '@/lib/supabase/services/servicesFunctions';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { poppins } from '@/utils/font.config';
import ServiceEditForm from './(sub-components)/ServiceEditForm';

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currUserId = user ? user.id : '';
  const params = searchParams.id;
  const serviceData = await getServiceData(params);

  return (
    <div className={`px-[16px] mt-[32px] md:w-[95%] md:mx-auto md:px-0 grid grid-rows-3 gap-2 items-center`}>
      <div>
        <div className={`flex gap-4 items-center`}>
          <h1 className={`text-h2 font-semibold`}>{serviceData.title}</h1>
          <BookmarkButton catType={'services'} id={serviceData.id} title={serviceData.title} />
        </div>

        <h2 className={`text-h3`}>{serviceData.company_name}</h2>
        <p className={`mt-2`}>
          Posted by{' '}
          <Link className={`underline`} href={`/profile?uid=${serviceData.post_author}`}>
            @{serviceData.post_author_username}
          </Link>
        </p>
      </div>
      <p>{serviceData.description}</p>
      <div className={`flex gap-5`}>
        {serviceData.post_author === currUserId ? (
          <Dialog modal={false}>
            <DialogTrigger className={`px-[25px] py-[8px] bg-primary text-neutral rounded`}>Edit</DialogTrigger>
            <DialogContent className={`bg-dark rounded`}>
              <DialogHeader>
                <DialogTitle className={`text-h3 ${poppins.className}`}>Edit Post</DialogTitle>
                <DialogDescription>Make changes to your post</DialogDescription>
              </DialogHeader>
              <ServiceEditForm
                props={{
                  service_id: serviceData.id,
                  company_name: serviceData.company_name,
                  title: serviceData.title,
                  description: serviceData.description,
                  price: serviceData.price,
                  pay_by: serviceData.pay_by,
                }}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <button className={`bg-primary py-[5px] px-[30px] rounded `}>Contact</button>
        )}

        <h1 className={`font-semibold text-sub`}>
          ${serviceData.price} <span className={`text-sm italic`}>{serviceData.pay_by} payment</span>
        </h1>
      </div>
    </div>
  );
};

export default page;
