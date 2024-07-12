'use client';
import { poppins } from '@/utils/font.config';
import { FaArrowRight } from 'react-icons/fa6';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoChevronDown } from 'react-icons/io5';

enum FormType {
  SALE = 'Sale',
  JOB = 'Job',
  SERVICE = 'Service',
}

const SearchSection = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [formType, setFormType] = useState<string>(FormType.SALE);
  const router = useRouter();
  return (
    <div className={`w-full py-[250px] px-5 flex justify-center animate-diagonal-green-wave`}>
      <div className={`w-[900px] grid gap-4`}>
        <h1 className={`${poppins.className} font-semibold text-h3 md:text-h1 text-center`}>
          Search anything in the Markitplace
        </h1>
        <div className={`w-full relative`}>
          <input
            type='text'
            placeholder='What are you looking for...'
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                return router.push(`/search?q=${searchInput}&cat=${formType}`);
              }
            }}
            className={`${poppins.className} w-full p-4 rounded text-dark2`}
          />
          <button
            onClick={() => {
              router.push(`/search?q=${searchInput}&cat=${formType}`);
            }}
            disabled={!searchInput}
            className={`w-[50px] h-[50px] bg-[#00000050] hover:bg-primary p-4 rounded-[50%] absolute right-[5px] bottom-[3px] flex justify-center items-center`}
          >
            <FaArrowRight />
          </button>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            className={`w-[180px] border-[2px] border-[#0000005b] py-[10px] rounded bg-neutral text-dark flex justify-between items-center px-[10px]`}
          >
            {formType} <IoChevronDown fontSize={16} stroke='#000000' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`w-[180px] border-[2px] border-[#0000005b] bg-neutral rounded`}>
            <DropdownMenuItem
              className={`text-base text-dark p-3 hover:bg-primary rounded`}
              onClick={() => setFormType(FormType.SALE)}
            >
              Sale
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-base text-dark p-3 hover:bg-primary rounded`}
              onClick={() => setFormType(FormType.JOB)}
            >
              Job
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-base text-dark p-3 hover:bg-primary rounded`}
              onClick={() => setFormType(FormType.SERVICE)}
            >
              Service
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SearchSection;
