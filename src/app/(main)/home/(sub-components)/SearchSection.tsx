'use client';
import { poppins } from '@/utils/font.config';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import { useState } from 'react';

const SearchSection = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <div className={`w-full py-[250px] px-5 flex justify-center animate-diagonal-green-wave`}>
      <div className={`w-[900px] grid gap-4`}>
        <h1 className={`${poppins.className} font-semibold text-h3 md:text-h1 text-center`}>
          Search anything in the Markitplace
        </h1>
        <div className={`w-full relative`}>
          <input type='text' placeholder='Bicycle' className={`${poppins.className} w-full p-4 rounded text-dark2`} />
          <Link
            href={`/`}
            className={`w-[50px] h-[50px] bg-[#00000050] hover:bg-primary p-4 rounded-[50%] absolute right-[5px] bottom-[3px] flex justify-center items-center`}
          >
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
