'use client';
import { poppins } from '@/utils/font.config';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from '@radix-ui/react-navigation-menu';
import { FaTag, FaBriefcase, FaGear } from 'react-icons/fa6';
import { SalesCat, JobsCat, ServicesCat } from '@/utils/categories';

const DropDownNav = () => {
  return (
    <div className={`hidden md:block`}>
      <NavigationMenu>
        <NavigationMenuList className={`flex flex-row gap-[32px]`}>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`flex flex-row items-center gap-[8px]`}>
              <FaTag /> Sale
            </NavigationMenuTrigger>
            <NavigationMenuIndicator />
            <NavigationMenuContent
              className={`bg-[#222529] z-50 absolute w-[420px] h-auto rounded p-[15px] mt-3 left-[-50%]`}
            >
              <h1 className={`${poppins.className} text-h3 font-semibold`}>Sale</h1>
              <div className={`grid grid-cols-2`}>
                {SalesCat.map((cat) => {
                  return (
                    <NavigationMenuLink className={`col-span-1 p-[10px]`} key={cat.title}>
                      {cat.title}
                    </NavigationMenuLink>
                  );
                })}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className={`flex flex-row items-center gap-[8px]`}>
              <FaBriefcase /> Jobs
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={`bg-[#222529] absolute z-50 w-[420px] h-auto rounded p-[15px] mt-3 left-[-50%]`}
            >
              <h1 className={`${poppins.className} text-h3 font-semibold`}>Jobs</h1>
              <div className={`grid grid-cols-2`}>
                {JobsCat.map((cat) => {
                  return (
                    <NavigationMenuLink className={`col-span-1 p-[10px]`} key={cat.title}>
                      {cat.title}
                    </NavigationMenuLink>
                  );
                })}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className={`flex flex-row items-center gap-[8px]`}>
              <FaGear /> Services
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={`bg-[#222529] absolute z-50 w-[420px] h-auto rounded p-[15px] mt-3 left-[-50%]`}
            >
              <h1 className={`${poppins.className} text-h3 font-semibold`}>Services</h1>
              <div className={`grid grid-cols-2`}>
                {ServicesCat.map((cat) => {
                  return (
                    <NavigationMenuLink className={`col-span-1 p-[10px]`} key={cat.title}>
                      {cat.title}
                    </NavigationMenuLink>
                  );
                })}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DropDownNav;
