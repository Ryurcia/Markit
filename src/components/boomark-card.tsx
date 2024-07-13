'use client';

import { deleteBookmark } from '@/lib/supabase/bookmarks/bookmarkFunctions';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { FiMoreVertical } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type BookmarkCardProps = {
  bookmark_id: string;
  link: string;
  title: string;
  type: string;
};
const BookmarkCard = ({ props }: { props: BookmarkCardProps }) => {
  const router = useRouter();

  return (
    <div className={`flex flex-row items-center gap-4`}>
      <Link
        href={props.link}
        className={`w-[350px] md:w-[600px] flex flex-row items-center justify-between text-[21px] font-semibold p-5 border-[1px] border-primary hover:bg-primary rounded`}
      >
        {props.title} ( {props.type} )
      </Link>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <FiMoreVertical fontSize={25} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={` rounded border-2 border-dark bg-dark2 hover:bg-accent2`}>
          <DropdownMenuItem
            onClick={() => {
              deleteBookmark(props.bookmark_id);
              return router.refresh();
            }}
            className={`cursor-pointer hover:bg-accent2 hover:rounded`}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BookmarkCard;
