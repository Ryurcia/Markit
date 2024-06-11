'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { poppins } from '@/utils/font.config';
import { IoChevronDown } from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SaleForm = dynamic(() => import('@/components/forms/sale-form'), {
  loading: () => <h1>LOADING</h1>,
});

const JobForm = dynamic(() => import('@/components/forms/job-form'), {
  loading: () => <h1>LOADING</h1>,
});

enum FormType {
  SALE = 'Sale',
  JOB = 'Job',
  SERVICE = 'Service',
}

const page = () => {
  const [formType, setFormType] = useState<string>('Select type');

  return (
    <div
      className={`${poppins.className} w-[90%] md:w-[95%] md:px-0 mx-auto mt-[32px] pb-[20px] grid grid-row-2 grid-cols-1 items-center justify-center gap-6 md:justify-center `}
    >
      <h1 className={`text-h3 font-semibold`}>Create Post</h1>

      <div className={`grid items-center`}>
        <h1 className={`text-[20px] font-semibold mb-[10px]`}>Select Category</h1>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            className={`w-[180px] border-[1px] border-neutral py-[10px] rounded bg-dark flex justify-between items-center px-[10px]`}
          >
            {formType} <IoChevronDown fontSize={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`w-[180px] border-0 bg-dark rounded`}>
            <DropdownMenuItem
              className={`text-base p-3 hover:bg-primary rounded`}
              onClick={() => setFormType(FormType.SALE)}
            >
              Sale
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-base p-3 hover:bg-primary rounded`}
              onClick={() => setFormType(FormType.JOB)}
            >
              Job
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-base p-3 hover:bg-primary rounded`}
              onClick={() => setFormType(FormType.SERVICE)}
            >
              Service
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className={`w-full`}>
        {formType === FormType.SALE && <SaleForm />}
        {formType === FormType.JOB && <JobForm />}
        {formType === FormType.SERVICE && <h1>Service</h1>}
      </div>
    </div>
  );
};

export default page;
