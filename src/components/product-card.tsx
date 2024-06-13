'use client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { hind } from '@/utils/font.config';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  condition: string;
  tag: string;
}

const ProductCard = ({ props }: { props: ProductCardProps }) => {
  const [productImageLink, setProductImageLink] = useState<string>('');

  const supabase = createClient();

  useEffect(() => {
    const public_url = supabase.storage.from('sale').getPublicUrl(`public/sale_${props.id}`).data.publicUrl;
    setProductImageLink(public_url);
  }, []);

  return (
    <Link href={`/sale?pid=${props.id}`}>
      <Card className={`w-[300px] h-[400px] grid rounded bg-dark2 border-[1px] border-[#ffffff15]`}>
        <CardHeader className={`w-full p-0`}>
          <AspectRatio ratio={16 / 12}>
            <Image
              src={productImageLink}
              width={300}
              height={250}
              className={`w-full h-full object-cover rounded-tl rounded-tr`}
              alt={props.title}
              priority
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className='p-[10px]'>
          <h1 className={`text-[18px]`}>{props.title}</h1>
          <div className={`flex gap-2 mt-2`}>
            <Badge className={`${hind.className} bg-primary border-0 rounded font-light text-sm`}>
              {props.condition}
            </Badge>
            <Badge className={`${hind.className} bg-dark border-0 rounded font-light text-sm`}>{props.tag}</Badge>
          </div>
        </CardContent>
        <CardFooter className={`p-[10px] flex flex-row items-center justify-between`}>
          <p className={`block`}>${props.price}</p>
          <button className={`${hind.className} bg-primary py-[3px] px-[15px] rounded font-light`}>Claim</button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
