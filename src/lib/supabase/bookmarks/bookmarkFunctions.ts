import { createClient } from '@/utils/supabase/client';

const createBookmark = async (catType: string, searchParams: string, title: string) => {
  const basePath = window.location.origin;
  const bookmarkLink = `${basePath}/${catType}?id=${searchParams}`;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('Bookmarks')
    .insert([{ link: bookmarkLink, user_id: user?.id, title: title, type: catType, item_id: searchParams }]);

  if (error) {
    throw error.message;
  }

  return;
};

const getUserBookmarks = async (user_id: string) => {
  const supabase = createClient();

  const { data } = await supabase.from('Bookmarks').select('*').eq('user_id', user_id);

  return data;
};

const checkIfUserBookmarked = async (id: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase
    .from('Bookmarks')
    .select('*', { count: 'exact' })
    .match({ item_id: id, user_id: user?.id });

  return !count || count <= 0 ? false : true;
};

const removeBookmark = async (id: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return supabase.from('Bookmarks').delete().match({ item_id: id, user_id: user?.id });
};

const deleteBookmark = async (bookmark_id: string) => {
  const supabase = createClient();
  await supabase.from('Bookmarks').delete().eq('bookmark_id', bookmark_id);
};

export { createBookmark, checkIfUserBookmarked, removeBookmark, getUserBookmarks, deleteBookmark };
