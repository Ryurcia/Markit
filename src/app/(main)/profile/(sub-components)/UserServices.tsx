import ServiceCard from '@/components/service-card';
import { createClient } from '@/utils/supabase/server';

const UserServices = async ({ userId }: { userId: string }) => {
  const supabase = createClient();
  const { data } = await supabase.from('Service_Post').select('*').eq('post_author', userId);

  return (
    <div className={`flex justify-start flex-wrap gap-3`}>
      {data?.map((res) => {
        const cardProps = {
          id: res.id,
          title: res.title,
          created_at: res.created_at,
          company: res.company_name,
          tag: res.tag,
          desc: res.description,
          price: res.price,
          pay_by: res.pay_by,
        };
        return <ServiceCard key={res.id} props={cardProps} />;
      })}
    </div>
  );
};

export default UserServices;
