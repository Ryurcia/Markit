import ProductCard from '@/components/product-card';
import { getProductsFromCategory } from '@/lib/supabase/products/productFunctions';
import { poppins } from '@/utils/font.config';

const page = async ({ params }: { params: { category: string } }) => {
  const categoryFirstLetter = params.category[0].toUpperCase();
  const category = categoryFirstLetter + params.category.slice(1);

  const products = await getProductsFromCategory(category);
  return (
    <div className={`mt-[32px] p-[16px] md:p-0 md:w-[95%] md:mx-auto`}>
      <h1 className={`${poppins.className} mb-3 text-h2 font-semibold  lg:text-h1`}>{category}</h1>
      <div className={`flex flex-wrap gap-5 justify-center md:justify-start`}>
        {products.map((res) => {
          const cardProps = {
            id: res.id,
            title: res.title,
            price: res.price,
            condition: res.condition,
            tag: res.tag,
          };
          return <ProductCard key={res.id} props={cardProps} />;
        })}
      </div>
    </div>
  );
};

export default page;
