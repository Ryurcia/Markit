import ProductCard from '@/components/product-card';
import { getSaleProductsWithLimit } from '@/lib/supabase/products/productFunctions';
import { poppins } from '@/utils/font.config';

const SaleSection = async () => {
  const products = await getSaleProductsWithLimit(5);

  return (
    <div className={`${poppins.className} mt-[15px]`}>
      <h1 className={`font-semibold text-h3 mb-5`}>Look what's on the markit!</h1>
      <div className={`w-full flex flex-row flex-wrap items-center justify-center gap-5 md:justify-between`}>
        {products?.map((item) => {
          const productObject = {
            id: item.id,
            title: item.title,
            price: item.price,
            condition: item.condition,
            tag: item.tag,
          };

          return <ProductCard key={item.id} props={productObject} />;
        })}
      </div>
    </div>
  );
};

export default SaleSection;
