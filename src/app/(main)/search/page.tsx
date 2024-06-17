import { poppins } from '@/utils/font.config';
import { createClient } from '@/utils/supabase/server';
import dynamic from 'next/dynamic';

const JobCard = dynamic(() => import('@/components/job-card'));
const ProductCard = dynamic(() => import('@/components/product-card'));

const page = async ({ searchParams }: { searchParams: { q: string; cat: string } }) => {
  const q = searchParams.q;
  const cat = searchParams.cat;
  let dbTable = '';

  if (cat === 'Sale') dbTable = 'Sale_Post';
  if (cat === 'Job') dbTable = 'Job_Post';

  const supabase = createClient();

  const keywords = q.split(' ');
  let keywordArray = [];
  let query = '';

  for (let i = 0; i < keywords.length; i++) {
    keywordArray.push(`'${keywords[i]}'`);
  }

  query = keywordArray.join('|');

  const { data, error } = await supabase.from(dbTable).select().textSearch('title', `${query}`);

  console.log(data);
  return !q ? (
    <div className={`px-[16px] md:px-0 md:w-[95%] md:mx-auto`}>
      <h1>No query provided</h1>
    </div>
  ) : (
    <div className={`px-[16px] mt-[32px] md:px-0 md:w-[95%] md:mx-auto grid gap-5`}>
      <h1 className={`${poppins.className} font-semibold text-h3`}>
        We found {data?.length} result(s) that match '{q}'
      </h1>
      {/* Sale */}
      {cat === 'Sale' && (
        <div className={`flex flex-wrap gap-5 justify-center md:justify-start`}>
          {data?.map((res) => {
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
      )}

      {/* Job */}
      {cat === 'Job' && (
        <div className={`flex flex-wrap gap-5 justify-center md:justify-start`}>
          {data?.map((res) => {
            const cardProps = {
              id: res.id,
              title: res.title,
              pay: res.pay,
              company: res.company_name,
              tag: res.tag,
              created_at: res.created_at,
            };
            return <JobCard key={res.id} props={cardProps} />;
          })}
        </div>
      )}
    </div>
  );
};

export default page;
