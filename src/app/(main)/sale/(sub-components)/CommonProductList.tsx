'use server';
import ProductCard from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { getCommonProducts } from '@/lib/supabase/products/productFunctions';
import { createClient } from '@/utils/supabase/server';
import Autoplay from 'embla-carousel-autoplay';

const CommonProductList = async ({ keyword, currProductId }: { keyword: string; currProductId:string }) => {
  const supabase = createClient();
  const kwrds = keyword.split(' ');
  let keywordArray = [];
  let query = '';
  
  for (let i = 0; i < kwrds.length; i++) {
    keywordArray.push(`'${kwrds[i]}'`);
  }

  query = keywordArray.join('|');

  const products = await getCommonProducts(query, currProductId);

  return products.length <= 0 ? (
    <div>No products like this.</div>
  ) : (
    <div className={`w-full`}>
      <Carousel
        className={`w-full`}
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent>
          {products?.map((item: any, idx: number) => {
            const productObject = {
              id: item.id,
              title: item.title,
              price: item.price,
              condition: item.condition,
              tag: item.tag,
            };

            return (
              <CarouselItem key={idx} className={`basis-1/1 md:basis-2/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5`}>
                <ProductCard key={item.id} props={productObject} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CommonProductList;
