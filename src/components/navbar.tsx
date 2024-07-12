import { poppins } from '@/utils/font.config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FaGear } from 'react-icons/fa6';
import { RiMenu2Line } from 'react-icons/ri';
import { IoPersonCircle, IoBookmarkSharp } from 'react-icons/io5';
import { createClient } from '@/utils/supabase/server';
import SignOutBtn from './signout-btn';
import { SalesCat, JobsCat, ServicesCat } from '@/utils/categories';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = async () => {
  //Get user name
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  let profilePic;

  if (!data.user) {
    profilePic = '';
  } else {
    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(`public/${data.user.id}`);

    profilePic = publicUrl;
  }

  return (
    <div
      className={`w-full px-[16px] flex flex-row justify-between items-center py-[16px] md:w-[95%] md:px-0 md:mx-auto `}
    >
      <div className={`flex gap-4 items-center`}>
        <Sheet modal={false}>
          <SheetTrigger className={`pt-[4px]`}>
            <RiMenu2Line fontSize={20} />
          </SheetTrigger>
          <SheetContent side={'left'} className={`bg-[#222529] border-0 w-[90%]`}>
            <SheetHeader className={`text-left`}>
              <SheetTitle className={`flex flex-row items-center gap-4 md:flex-none`}>
                <h1 className={`${poppins.className} text-primary font-semibold text-h3`}>Markit</h1>
                <div className={`md:hidden`}>{!data.user ? <Link href={`/signin`}>Sign in | Register</Link> : ''}</div>
              </SheetTitle>
            </SheetHeader>
            <div>
              <Accordion type='single' collapsible>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className={`${poppins.className} font-semibold text-sub md:text-h3`}>
                    For Sale
                  </AccordionTrigger>
                  <AccordionContent className={`grid grid-cols-2`}>
                    {SalesCat.map((cat, index) => {
                      return (
                        <Link key={`item-${index}`} href={cat.link} className={`p-[10px] text-base`}>
                          {cat.title}
                        </Link>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger className={`${poppins.className} font-semibold text-sub md:text-h3`}>
                    Jobs
                  </AccordionTrigger>
                  <AccordionContent className={`grid grid-cols-2`}>
                    {JobsCat.map((cat, index) => {
                      return (
                        <Link key={`item-${index}`} href={cat.link} className={`p-[10px] text-base`}>
                          {cat.title}
                        </Link>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger className={`${poppins.className} font-semibold text-sub md:text-h3`}>
                    Services
                  </AccordionTrigger>
                  <AccordionContent className={`grid grid-cols-2`}>
                    {ServicesCat.map((cat, index) => {
                      return (
                        <Link key={`item-${index}`} href={cat.link} className={`p-[10px] text-base`}>
                          {cat.title}
                        </Link>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
                {!data.user ? (
                  ''
                ) : (
                  <AccordionItem className={`md:hidden`} value='item-4'>
                    <AccordionTrigger className={`${poppins.className} font-semibold text-sub md:text-h3`}>
                      Your Profile
                    </AccordionTrigger>
                    <AccordionContent className={`flex flex-col`}>
                      <Link href={`/profile?uid=${data.user.id}`} className={`p-[10px] text-base `}>
                        Profile
                      </Link>
                      <Link href={'/bookmarks'} className={`p-[10px] text-base `}>
                        Bookmarks
                      </Link>
                      <Link href={'/profile/settings'} className={`p-[10px] text-base `}>
                        Settings
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
            <div className={`absolute bottom-[10px] md:hidden`}>{data.user ? <SignOutBtn /> : ''}</div>
          </SheetContent>
        </Sheet>
        <Link href={'/home'} className={`text-h3 text-primary font-semibold`}>
          Markit
        </Link>
      </div>

      <div className={`flex flex-row items-center gap-[16px]`}>
        <Link
          href={`/post/createPost`}
          className={` text-sm px-[15px] py-[8px] rounded-[30px] font-semibold animate-diagonal-green-wave`}
        >
          + Create post
        </Link>
        {!data.user ? (
          <div className={`hidden md:block text-[14px]`}>
            <Link href={`/signin`}>Sign in</Link> | <Link href={`/signup`}>Register</Link>
          </div>
        ) : (
          <div className={`hidden rounded-[30px] md:block`}>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className={`flex flex-row items-center gap-[8px]`}>
                {/* PFP */}
                <div className={`relative bg-dark w-[45px] h-[45px] rounded-[50%] border-2 border-primary`}>
                  <Image
                    src={profilePic}
                    alt='profile_pic'
                    width={30}
                    height={30}
                    style={{
                      position: 'absolute',
                      borderRadius: '50%',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    priority
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`mt-[20px] rounded bg-dark border-0`}>
                <DropdownMenuItem>
                  <Link
                    href={`/profile?uid=${data.user.id}`}
                    className={`flex flex-row items-center gap-[5px] text-base`}
                  >
                    <IoPersonCircle /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/bookmarks'} className={`flex flex-row items-center gap-[5px] text-base`}>
                    <IoBookmarkSharp /> Bookmarked
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/profile/settings'} className={`flex flex-row items-center gap-[5px] text-base`}>
                    <FaGear /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutBtn />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
