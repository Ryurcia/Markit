'use client';

import { checkIfUserBookmarked, createBookmark, deleteBookmark } from '@/lib/supabase/bookmarks/bookmarkFunctions';
import { useEffect, useState, useTransition } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const BookmarkButton = ({ catType, id, title }: { catType: string; id: string; title: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    //Check if user is logged in first
    supabase.auth.getSession().then((res) => {
      if (!res.data.session?.user) {
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
      //Check if user already bookmarked this item
      checkIfUserBookmarked(id).then((res) => {
        setIsBookmarked(res);
      });
    });
  }, []);

  return isBookmarked ? (
    <FaBookmark
      onClick={() => {
        startTransition(async () => {
          setIsBookmarked(false);
          await deleteBookmark(id);
        });
      }}
      fontSize={30}
    />
  ) : (
    <FaRegBookmark
      className={`cursor-pointer`}
      onClick={() => {
        if (!isLoggedIn) {
          return router.replace('/signin');
        }
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
