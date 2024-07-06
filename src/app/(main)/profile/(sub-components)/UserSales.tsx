import ProductCard from '@/components/product-card';
import { createClient } from '@/utils/supabase/server';

const UserSales = async ({ userId }: { userId: string }) => {
  const supabase = createClient();
  const { data } = await supabase.from('Sale_Post').select('*').eq('post_author', userId);

  return (
    <div className={`flex justify-start flex-wrap gap-3`}>
      {data?.map((item) => {
        const cardProps = {
          id: item.id,
          title: item.title,
          price: item.price,
          condition: item.condition,
          tag: item.tag,
        };
        return <ProductCard key={item.id} props={cardProps} />;
      })}
    </div>
  );
};

export default UserSales;
