import ServiceCard from '@/components/service-card';
import { getServicesFromCategory } from '@/lib/supabase/services/servicesFunctions';

import { poppins } from '@/utils/font.config';

const page = async ({ params }: { params: { category: string } }) => {
  const categoryFirstLetter = params.category[0].toUpperCase();
  const category = categoryFirstLetter + params.category.slice(1);

  const services = await getServicesFromCategory(category);
  return (
    <div className={`mt-[32px] p-[16px] md:p-0 md:w-[95%] md:mx-auto`}>
      <h1 className={`${poppins.className} mb-3 text-h2 font-semibold  lg:text-h1`}>{category}</h1>
      <div className={`flex flex-wrap gap-5 justify-center md:justify-start`}>
        {services?.length === 0 ? (
          <div>No services posted</div>
        ) : (
          services?.map((res) => {
            const cardProps = {
              id: res.id,
              title: res.title,
              created_at: res.created_at,
              company: res.company_name,
              tag: res.tag,
              price: res.price,
              pay_by: res.pay_by,
            };
            return <ServiceCard key={res.id} props={cardProps} />;
          })
        )}
      </div>
    </div>
  );
};

export default page;
