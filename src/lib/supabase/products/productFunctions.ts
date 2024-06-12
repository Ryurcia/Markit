import { createClient } from '@/utils/supabase/server';

const getSaleProductsWithLimit = async (limit: number) => {
  const supabase = createClient();

  const { data } = await supabase.from('Sale_Post').select('*').limit(limit);

  if (!data) return [];

  return data;
};

export { getSaleProductsWithLimit };
