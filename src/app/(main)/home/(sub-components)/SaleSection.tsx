'use client';
import ProductCard from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { hind, poppins } from '@/utils/font.config';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { MdChevronRight } from 'react-icons/md';
import Link from 'next/link';

const SaleSection = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('Sale_Post')
      .select('*')
      .limit(6)
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  return (
    <div className={`${poppins.className} mt-[32px] px-[16px] md:px-0 w-[95%] mx-auto`}>
      <div className={`flex flex-col md:flex-row items-start md:items-center gap-3 mb-5`}>
        <h1 className={`font-semibold text-h3 `}>Look what's on the markit!</h1>
        <Link href={`/sale/all`} className={`${hind.className} hover:underline text-sm font-light flex items-center`}>
          <p>view more</p>
          <MdChevronRight fontSize={13} className={`mt-[2px]`} />
        </Link>
      </div>
      <Carousel
        className={`w-full`}
        opts={{
          align: 'center',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2500,
          }),
        ]}
      >
        <CarouselContent>
          {products?.map((item: any) => {
            const productObject = {
              id: item.id,
              title: item.title,
              price: item.price,
              condition: item.condition,
              tag: item.tag,
            };

            return (
              <CarouselItem className={`basis-1/1 md:basis-2/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5`}>
                <ProductCard key={item.id} props={productObject} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SaleSection;
