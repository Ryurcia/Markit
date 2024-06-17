import { createClient } from '@/utils/supabase/server';

const getSaleProductsWithLimit = async (limit: number) => {
  const supabase = createClient();

  const { data } = await supabase.from('Sale_Post').select('*').limit(limit);

  if (!data) return [];

  return data;
};

const getProductsFromCategory = async (cat: string) => {
  const supabase = createClient();
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

export { getSaleProductsWithLimit, getProductsFromCategory, getAllProducts };
