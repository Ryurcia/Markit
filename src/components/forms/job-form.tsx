'use client';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { poppins } from '@/utils/font.config';
import { Textarea } from '@/components/ui/textarea';
import { JobsCat, SalesCat } from '@/utils/categories';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '../ui/separator';

const JobFormSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title is too short').max(50, 'Title is too long').required('Title is required'),
  email: Yup.string().email().required('Email is required'),
  job_desc: Yup.string().max(250, 'Description is too long'),
  pay: Yup.number().required('Pay is required').typeError('Must be a number').max(500000, 'Max price exceeded'),
  company_name: Yup.string().max(50, 'Too Long'),
  requirements: Yup.string().max(400, 'Too long').required('Required'),
  tag: Yup.string(),
});

const JobForm = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  const imagesRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then((res) => {
      if (!res.data.user) throw 'no user';
      setUserId(res.data.user.id);
      supabase
        .from('Profile')
        .select('username')
        .eq('id', res.data.user.id)
        .limit(1)
        .single()
        .then((res) => {
          setUsername(res.data?.username);
        });
    });
  }, []);

  return (
    <div className={`w-full`}>
      <Formik
        initialValues={{
          title: '',
          job_desc: '',
          pay: '',
          email: '',
          company_name: '',
          tag: JobsCat[1].title,
          requirements: '',
        }}
        validationSchema={JobFormSchema}
        onSubmit={async (values) => {
          const supabase = createClient();
          await supabase.from('Job_Post').insert([
            {
              title: values.title,
              job_desc: values.job_desc,
              company_name: values.company_name,
              pay: (Math.round(Number(values.pay) * 100) / 100).toFixed(2),
              tag: values.tag,
              author_id: userId,
              author_username: username,
              requirements: values.requirements,
            },
          ]);

          router.back();

          return toast({
            title: 'Job post created',
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className={`flex flex-col items-start gap-4`}>
            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='title'>
                  Job title
                </label>
                <p className={`text-sm opacity-50`}>*Short job title</p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded md:w-[300px]`} name='title' />
                <ErrorMessage name='job_title' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='company_name'>
                  Company name
                </label>
                <p className={`text-sm opacity-50`}>Name of company hiring</p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded md:w-[300px]`} name='company_name' placeholder='Markit' />
                <ErrorMessage name='company_name' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='email'>
                  Email for applicants
                </label>
                <p className={`text-sm opacity-50`}>Email where applicants can apply</p>
              </div>
              <div>
                <Field
                  className={`text-dark p-[10px] rounded md:w-[300px]`}
                  name='email'
                  placeholder='hireMe@company.com'
                />
                <ErrorMessage name='email' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='job_desc'>
                  Description
                </label>
                <p className={`text-sm opacity-50`}>Short job description</p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded w-full md:w-[300px]`} name='job_desc' as={Textarea} />
                <ErrorMessage name='job_desc' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='requirements'>
                  Job requirements
                </label>
                <p className={`text-sm opacity-50`}>
                  *Seperate with a comma e.g "Knows HTML, Bachelors Degree, etc..."
                </p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded md:w-[300px]`} name='requirements' as={Textarea} />
                <ErrorMessage name='requirements' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='pay'>
                  Yearly salary
                </label>
                <p className={`text-sm opacity-50`}>*Starting pay(USD)</p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded md:w-[300px]`} name='pay' placeholder='100000' />
                <ErrorMessage name='pay' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='tag'>
                  Tag
                </label>
                <p className={`text-sm opacity-50`}>Select tag that best fits the job listing</p>
              </div>
              <Field className={`w-[180px] text-dark p-[10px] rounded`} name='tag' as='select'>
                {JobsCat.slice(1).map((cat, index) => {
                  return (
                    <option className={`text-dark hover:bg-primary`} key={index} value={cat.title}>
                      {cat.title}
                    </option>
                  );
                })}
              </Field>
            </div>

            <div className={`grid grid-rows-2 md:grid-cols-2 md:grid-rows-0 w-full gap-2`}>
              <button className={`w-full bg-primary py-[15px] rounded text-base font-semibold`} type='submit'>
                Post
              </button>
              <Link className={`w-full border-2 border-accent2 text-center p-[15px] rounded`} href={`/home`}>
                Cancel
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobForm;
