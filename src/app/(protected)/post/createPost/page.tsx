'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {useState } from 'react';
import dynamic from 'next/dynamic';

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
      className={`px-[16px] md:w-[95%] md:px-0 mx-auto py-[32px] grid grid-row-2 grid-cols-1 items-center justify-center gap-6 md:justify-center`}
    >
      <h1>Create Post </h1>

      <div className={`grid grid-rows-2 items-center`}>
        <h1 className={`font-medium`}>Select Category</h1>
        <Select onValueChange={(e) => setFormType(e)}>
          <SelectTrigger className='w-[180px] text-lg rounded border-0 bg-dark px-[15px] py-[20px]'>
            <SelectValue placeholder={'Select type'} />
          </SelectTrigger>
          <SelectContent className={`rounded bg-dark border-0`}>
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
      <div>
        {formType === FormType.SALE && <SaleForm />}
        {formType === FormType.JOB && <h1>Job</h1>}
        {formType === FormType.SERVICE && <h1>Service</h1>}
      </div>
    </div>
  );
};

export default page;
