'use client';

import { checkIfUserBookmarked, createBookmark, removeBookmark } from '@/lib/supabase/bookmarks/bookmarkFunctions';
import { useEffect, useState, useTransition } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useToast } from '@/components/ui/use-toast';

const BookmarkButton = ({ catType, id, title }: { catType: string; id: string; title: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    //Check if user already bookmarked this item
    checkIfUserBookmarked(id).then((res) => {
      setIsBookmarked(res);
    });
  }, []);

  return isBookmarked ? (
    <FaBookmark
      onClick={() => {
        startTransition(async () => {
          setIsBookmarked(false);
          await removeBookmark(id);
        });
      }}
      fontSize={30}
    />
  ) : (
    <FaRegBookmark
      className={`cursor-pointer`}
      onClick={() => {
        startTransition(async () => {
          setIsBookmarked(true);
          await createBookmark(catType, id, title);
        });

        return toast({
          title: 'Saved to bookmarks',
        });
      }}
      fontSize={30}
    />
  );
};

export default BookmarkButton;
