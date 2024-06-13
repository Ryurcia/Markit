import { Badge } from '@/components/ui/badge';
import { hind, poppins } from '@/utils/font.config';
import { createClient } from '@/utils/supabase/server';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

const page = async ({ searchParams }: { searchParams: { pid: string } }) => {
  const supabase = createClient();
  const productData = await supabase.from('Sale_Post').select('*').eq('id', searchParams.pid).limit(1).single();
  const productImage = await supabase.storage.from('sale').getPublicUrl(`public/sale_${searchParams.pid}`).data
    .publicUrl;

  return (
    <div
      className={`p-[16px] md:p-0 md:w-[95%] md:mx-auto flex flex-col justify-center gap-5 lg:grid lg:grid-cols-2 lg:gap-5 items-center mt-[64px]`}
    >
      {/* IMAGE */}
      <div className={`max-w-[700px] max-h-[700px] justify-self-center self-center lg:self-start`}>
        <Image src={productImage} width={700} height={700} alt={productData.data.title} className={`object-cover`} />
      </div>

      {/* Data */}
      <div className={`flex flex-col gap-[32px] lg:grid lg:grid-rows-3 lg:gap-3 lg:items-center`}>
        <div>
          <h1 className={`${poppins.className} font-semibold text-h2`}>{productData.data.title}</h1>
          <Badge className={`mb-[8px] rounded bg-primary border-0 text-sm`}>{productData.data.tag}</Badge>
          <p>
            <Link className={`underline`} href={`/profile?uid=${productData.data.post_author}`}>
              @{productData.data.post_author_username}
            </Link>{' '}
            posted {moment(productData.data.created_at).fromNow()}
          </p>
          <h1 className={`${poppins.className} font-semibold text-h3 my-[8px]`}>${productData.data.price}</h1>
        </div>

        <div>
          <h1 className={`${poppins.className} text-base font-semibold mb-3`}>Product Description:</h1>
          <p className={`${hind.className} font-light text-[16px] mb-3`}>{productData.data.description}</p>
          <p>Condition: {productData.data.condition}</p>
        </div>

        <div className={`self-start flex items-center gap-3`}>
          <button className={`bg-primary py-[5px] px-[30px] rounded `}>Claim</button>
          <FaRegBookmark fontSize={30} />
        </div>
      </div>
    </div>
  );
};

export default page;
