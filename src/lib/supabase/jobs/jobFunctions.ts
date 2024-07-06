import { createClient } from '@/utils/supabase/server';

const getJobData = async (job_id: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('Job_Post').select('*').eq('id', job_id).limit(1).single();

  if (!data || data.length < 0) return [];

  return data;
};

const getJobsFromCategory = async (cat: string) => {
  const supabase = createClient();

  if (cat === 'All') {
    const { data } = await supabase.from('Job_Post').select('*');

    return data;
  }

  const { data } = await supabase.from('Job_Post').select('*').eq('tag', cat);

  return data;
};

export { getJobData, getJobsFromCategory };
