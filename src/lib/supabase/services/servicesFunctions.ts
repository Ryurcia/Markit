import { createClient } from '@/utils/supabase/server';

const getServiceData = async (sid: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('Service_Post').select('*').eq('id', sid).limit(1).single();

  if (!data || data.length == 0) return [];

  return data;
};

export { getServiceData };
