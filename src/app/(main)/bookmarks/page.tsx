import { getUserBookmarks } from '@/lib/supabase/bookmarks/bookmarkFunctions';
import { poppins } from '@/utils/font.config';
import { createClient } from '@/utils/supabase/server';
import BookmarkCard from '@/components/boomark-card';

const page = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw 'No user';

  const bookmarks = await getUserBookmarks(user?.id);

  return (
    <div className={`w-full px-[16px] mt-4 md:w-[95%] md:px-0 md:mx-auto`}>
      <h1 className={`text-h3 ${poppins.className} font-semibold`}>Bookmarks</h1>
      <div className={`mt-5 flex flex-col gap-3`}>
        {!bookmarks || bookmarks.length < 1 ? (
          <h1>No bookmarks</h1>
        ) : (
          bookmarks.map((bookmark) => {
            const cardProps = {
              bookmark_id: bookmark.bookmark_id,
              link: bookmark.link,
              title: bookmark.title,
              type: bookmark.type,
            };
            return <BookmarkCard key={bookmark.bookmark_id} props={cardProps} />;
          })
        )}
      </div>
    </div>
  );
};

export default page;
