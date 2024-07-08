import { createClient } from "@/utils/supabase/client";

const createBookmark = async(cat:string,searchParams:string,title:string) => {
    const basePath = window.location.origin;
    const bookmarkLink = `${basePath}/${cat}?id=${searchParams}`;

    const supabase = createClient();
    const{data:{user}} = await supabase.auth.getUser();
    const {error} = await supabase.from('Bookmarks').insert([{link:bookmarkLink,user_id:user?.id,title:title,type:cat}]);

    if(error) {
        throw error.message;
    }

    return;
}


export{createBookmark};