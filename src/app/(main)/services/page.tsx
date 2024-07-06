import { getServiceData } from '@/lib/supabase/services/servicesFunctions';
import Link from 'next/link';

const page = async ({ searchParams }: { searchParams: { sid: string } }) => {
  const params = searchParams.sid;
  const serviceData = await getServiceData(params);

  return (
    <div className={`px-[16px] mt-[32px] md:w-[95%] md:mx-auto md:px-0 grid grid-rows-3 gap-2 items-center`}>
      <div>
        <h1 className={`text-h2 font-semibold`}>{serviceData.title}</h1>
        <h2 className={`text-h3`}>{serviceData.company_name}</h2>
        <p className={`mt-2`}>
          Posted by{' '}
          <Link className={`underline`} href={`/profile?uid=${serviceData.post_author}`}>
            @{serviceData.post_author_username}
          </Link>
        </p>
      </div>
      <p>{serviceData.description}</p>
      <div>
        <h1 className={`font-semibold text-sub`}>
          ${serviceData.price} <span className={`text-sm italic`}>{serviceData.pay_by} payment</span>
        </h1>
      </div>
    </div>
  );
};

export default page;
