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
import { RiMenu3Fill } from 'react-icons/ri';
import { IoPersonCircle, IoBookmarkSharp } from 'react-icons/io5';
import { createClient } from '@/utils/supabase/server';
import SignOutBtn from './signout-btn';
import DropDownNav from './dropdown-nav';
import { SalesCat, JobsCat, ServicesCat } from '@/utils/categories';
import Link from 'next/link';

const Navbar = async () => {
  //Get user name
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw 'Error: No User';
  const res = await supabase.from('Profile').select('first_name,last_name').eq('id', data.user.id).limit(1).single();

  return (
    <div
      className={`w-full px-[16px] flex flex-row justify-between items-center py-[16px] md:w-[90%] md:px-0 md:mx-auto `}
    >
      <h1 className={`${poppins.className} text-h3 font-semibold text-primary`}>Markit</h1>
      <DropDownNav />
      <div className={`md:hidden`}>
        <Sheet>
          <SheetTrigger>
            <RiMenu3Fill fontSize={20} />
          </SheetTrigger>
          <SheetContent side={'left'} className={`bg-[#222529] border-0 w-[90%] `}>
            <SheetHeader className={`text-left`}>
              <SheetTitle>
                <h1 className={`${poppins.className} text-primary font-semibold text-h3`}>Markit</h1>
              </SheetTitle>
            </SheetHeader>
            <div>
              <Accordion type='single' collapsible>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className={`${poppins.className} font-semibold text-h3`}>For Sale</AccordionTrigger>
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
                  <AccordionTrigger className={`${poppins.className} font-semibold text-h3`}>Jobs</AccordionTrigger>
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
                  <AccordionTrigger className={`${poppins.className} font-semibold text-h3`}>Services</AccordionTrigger>
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
                <AccordionItem value='item-4'>
                  <AccordionTrigger className={`${poppins.className} font-semibold text-h3`}>
                    Your Profile
                  </AccordionTrigger>
                  <AccordionContent className={`flex flex-col`}>
                    <Link href={'/profile'} className={`p-[10px] text-base `}>
                      Profile
                    </Link>
                    <Link href={'/'} className={`p-[10px] text-base `}>
                      Bookmarks
                    </Link>
                    <Link href={'/'} className={`p-[10px] text-base `}>
                      Settings
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className={`absolute bottom-[10px]`}>
              <SignOutBtn />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className={`hidden px-[15px] py-[8px] rounded-[30px] font-semibold animate-diagonal-green-wave md:block`}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className={`flex flex-row items-center gap-[8px]`}>
            <div className={`bg-dark w-[30px] h-[30px] rounded-[50%]`}></div>
            {res.data?.first_name} {res.data?.last_name}
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`mt-[20px] rounded bg-dark border-0`}>
            <DropdownMenuItem>
              <Link href={'/profile'} className={`flex flex-row items-center gap-[5px] text-base`}>
                <IoPersonCircle /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/'} className={`flex flex-row items-center gap-[5px] text-base`}>
                <IoBookmarkSharp /> Bookmarked
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/'} className={`flex flex-row items-center gap-[5px] text-base`}>
                <FaGear /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutBtn />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
