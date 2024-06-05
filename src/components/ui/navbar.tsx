import { poppins } from '@/utils/font.config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaTag, FaBriefcase, FaGear } from 'react-icons/fa6';
import { RiMenu3Fill } from "react-icons/ri";
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import SignOutBtn from '../signout-btn';

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
      <div className={`hidden flex-row gap-[32px] text-base md:flex`}>
        <Link href={'/'} className={`flex flex-row items-center gap-[8px]`}>
          <FaTag /> Sale
        </Link>
        <Link href={'/'} className={`flex flex-row items-center gap-[8px]`}>
          <FaBriefcase /> Jobs
        </Link>
        <Link href={'/'} className={`flex flex-row items-center gap-[8px]`}>
          <FaGear /> Services
        </Link>
      </div>

      <div className={`md:hidden`}>
        <DropdownMenu>
          <DropdownMenuTrigger><RiMenu3Fill fontSize={20}/></DropdownMenuTrigger>
          <DropdownMenuContent className={`mt-[20px] rounded bg-primary border-0`}>
            <DropdownMenuItem>Sales</DropdownMenuItem>
            <DropdownMenuItem>Jobs</DropdownMenuItem>
            <DropdownMenuItem>Services</DropdownMenuItem>
            <DropdownMenuItem>Your Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={`hidden px-[15px] py-[8px] rounded-[30px] font-semibold animate-diagonal-green-wave md:block`}>
        <DropdownMenu>
          <DropdownMenuTrigger className={`flex flex-row items-center gap-[8px]`}>
            <div className={`bg-dark w-[30px] h-[30px] rounded-[50%]`}></div>
            {res.data?.first_name} {res.data?.last_name}
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`mt-[20px] rounded bg-primary border-0`}>
            <DropdownMenuLabel>Your Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
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
