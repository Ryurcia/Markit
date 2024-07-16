import { Badge } from '@/components/ui/badge';

import { hind, poppins } from '@/utils/font.config';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { getAllProducts } from '@/lib/supabase/products/productFunctions';
import ProductCard from '@/components/product-card';
import BookmarkButton from '@/components/bookmark-btn';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SaleEditForm from './(sub-components)/SaleEditForm';
import CommonProductList from './(sub-components)/CommonProductList';

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currUserId = user ? user.id : '';
  const productData = await supabase.from('Sale_Post').select('*').eq('id', searchParams.id).limit(1).single();
  const productImage = await supabase.storage.from('sale').getPublicUrl(`public/sale_${searchParams.id}`).data
    .publicUrl;

  //All Products
  const allProducts = await getAllProducts();

  return !searchParams.id ? (
    <div className={`mt-[32px] p-[16px] md:p-0 md:w-[95%] md:mx-auto`}>
      <h1 className={`${poppins.className} mb-3 text-h2 font-semibold  lg:text-h1`}>For Sale</h1>
      <div className={`flex flex-wrap gap-5 justify-center md:justify-start`}>
        {allProducts.map((res) => {
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
  ) : (
    <div
      className={`p-[16px] md:p-0 md:w-[95%] md:mx-auto flex flex-col justify-center gap-5 lg:grid lg:grid-cols-2 lg:gap-5 items-center mt-5`}
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
          {productData.data.post_author === currUserId ? (
            <Dialog modal={false}>
              <DialogTrigger className={`px-[25px] py-[8px] bg-primary text-neutral rounded`}>Edit</DialogTrigger>
              <DialogContent className={`bg-dark rounded`}>
                <DialogHeader>
                  <DialogTitle className={`text-h3 ${poppins.className}`}>Edit Post</DialogTitle>
                  <DialogDescription>Make changes to your post</DialogDescription>
                </DialogHeader>
                <SaleEditForm
                  props={{
                    product_id: productData.data.id,
                    title: productData.data.title,
                    description: productData.data.description,
                    price: productData.data.price,
                  }}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog modal={false}>
              <DialogTrigger className={`bg-primary py-[5px] px-[30px] rounded `}>Contact Info</DialogTrigger>
              <DialogContent className={`bg-dark rounded`}>
                <DialogHeader>
                  <DialogTitle className={`text-h3 ${poppins.className}`}>Contact Info</DialogTitle>
                  <DialogDescription>You can reach the seller with provided info.</DialogDescription>
                </DialogHeader>
                <div>
                  <h1>Email:</h1>
                  <p>{productData.data.post_author_email}</p>
                </div>
                <div>
                  <h1>Tel no.</h1>
                  <p>{productData.data.tel_no ? productData.data.tel_no : 'N/A'}</p>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <BookmarkButton catType={'sale'} id={productData.data.id} title={productData.data.title} />
        </div>
      </div>
      <div className={`col-span-2 pb-2`}>
        <h1 className={`${poppins.className} text-h3 font-semibold mb-3`}>More Products like this</h1>
        <CommonProductList keyword={productData.data.title} currProductId={productData.data.id} />
      </div>
    </div>
  );
};

export default page;
