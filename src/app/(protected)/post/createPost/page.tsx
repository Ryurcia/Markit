'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { poppins } from '@/utils/font.config';

const SaleForm = dynamic(() => import('@/components/forms/sale-form'), {
  loading: () => <h1>LOADING</h1>,
});

enum FormType {
  SALE = 'Sale',
  JOB = 'Job',
  SERVICE = 'Service',
}

const page = () => {
  const [formType, setFormType] = useState<string>(FormType.JOB);

  return (
    <div
      className={`w-[90%] md:w-[95%] md:px-0 mx-auto mt-[32px] pb-[20px] grid grid-row-2 grid-cols-1 items-center justify-center gap-6 md:justify-center `}
    >
      <h1 className={`${poppins.className} text-h3 font-semibold`}>Create Post</h1>

      <div className={`grid items-center`}>
        <h1 className={`text-[20px] font-semibold mb-[10px]`}>Select Category</h1>
        <Select onValueChange={(e) => setFormType(e)}>
          <SelectTrigger className='w-[180px] text-lg rounded border-0 bg-dark px-[15px] py-[20px] '>
            <SelectValue placeholder={'Select type'} />
          </SelectTrigger>
          <SelectContent className={`rounded bg-dark border-0 `}>
            <SelectItem value={FormType.SALE} className={`hover:bg-primary hover:rounded text-lg`}>
              Sale
            </SelectItem>
            <SelectItem value={FormType.JOB} className={`hover:bg-primary hover:rounded text-lg`}>
              Job
            </SelectItem>
            <SelectItem value={FormType.SERVICE} className={`hover:bg-primary hover:rounded text-lg`}>
              Service
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lazy render different forms based on form type */}
      <div className={`w-full`}>
        {formType === FormType.SALE && <SaleForm />}
        {formType === FormType.JOB && <h1>Job</h1>}
        {formType === FormType.SERVICE && <h1>Service</h1>}
      </div>
    </div>
  );
};

export default page;
