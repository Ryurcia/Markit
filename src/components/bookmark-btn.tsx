'use client'

import { createBookmark } from "@/lib/supabase/bookmarks/bookmarkFunctions";
import { FaRegBookmark } from "react-icons/fa";

const BookmarkButton = ({cat,id,title}:{cat:string,id:string,title:string}) => {
    return <FaRegBookmark onClick={() => createBookmark(cat,id,title)} fontSize={30} />;
}


export default BookmarkButton;