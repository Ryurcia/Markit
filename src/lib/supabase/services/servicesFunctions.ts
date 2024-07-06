import { createClient } from '@/utils/supabase/server';

const getServiceData = async (sid: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('Service_Post').select('*').eq('id', sid).limit(1).single();

  if (!data || data.length == 0) return [];

  return data;
};

const getServicesFromCategory = async (cat: string) => {
  const supabase = createClient();

  if (cat === 'All') {
    const { data } = await supabase.from('Service_Post').select('*');

    return data;
  }

  const { data } = await supabase.from('Service_Post').select('*').eq('tag', cat);

  return data;
};

export { getServiceData, getServicesFromCategory };
