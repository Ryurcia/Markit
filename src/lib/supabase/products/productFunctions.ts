import { createClient } from '@/utils/supabase/server';

const getSaleProductsWithLimit = async (limit: number) => {
  const supabase = createClient();

  const { data } = await supabase.from('Sale_Post').select('*').limit(limit);

  if (!data) return [];

  return data;
};

const getProductsFromCategory = async (cat: string) => {
  const supabase = createClient();

  if (cat === 'All') {
    const { data } = await supabase.from('Sale_Post').select('*');
    return data;
  }

  const { data } = await supabase.from('Sale_Post').select('*').eq('tag', cat);

  if (!data || data.length < 0) return [];

  return data;
};

const getAllProducts = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('Sale_Post').select('*').order('created_at', { ascending: true });

  if (!data || data.length < 0) return [];

  return data;
};

const getCommonProducts = async(keywords:string,currProductId:string) => {
  const supabase = createClient();
  const { data } = await supabase.from('Sale_Post').select('*').textSearch('title',`${keywords}`);

  if(!data) return []

  return data.filter((res) => {
    return res.id !== currProductId;
  })
}

export { getSaleProductsWithLimit, getProductsFromCategory, getAllProducts, getCommonProducts };
