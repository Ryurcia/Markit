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

const JobFormSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title is too short').max(50, 'Title is too long').required('Title is required'),
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
          company_name: '',
          tag: JobsCat[1].title,
          requirements: '',
        }}
        validationSchema={JobFormSchema}
        onSubmit={async (values) => {
          const supabase = createClient();
          await supabase.from('Job_Post').insert([
            {
              job_title: values.title,
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
            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='title'>
                Job title <span className={`font-light text-sm block`}>*required</span>
              </label>
              <Field className={`text-dark p-[10px] rounded max-w-[500px]`} name='title' />
              <ErrorMessage name='job_title' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='company_name'>
                Company name
              </label>
              <Field className={`text-dark p-[10px] rounded max-w-[500px]`} name='company_name' placeholder='Markit' />
              <ErrorMessage name='company_name' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='job_desc'>
                Description
              </label>
              <Field className={`text-dark p-[10px] rounded max-w-[500px]`} name='job_desc' as={Textarea} />
              <ErrorMessage name='job_desc' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='requirements'>
                Job requirements <span className={`font-light text-sm block`}>*required</span>
              </label>
              <Field className={`text-dark p-[10px] rounded max-w-[500px]`} name='requirements' as={Textarea} />
              <ErrorMessage name='requirements' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='pay'>
                Yearly salary <span className={`font-light text-sm block`}>*required</span>
              </label>
              <Field className={`text-dark p-[10px] rounded w-[200px]`} name='pay' placeholder='100000' />
              <ErrorMessage name='pay' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='tag'>
                Tag <span className={`font-light text-sm block`}>*required</span>
              </label>
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

            <button className={`w-full bg-primary py-[15px] rounded text-base font-semibold`} type='submit'>
              Post
            </button>
            <Link className={`w-full border-2 border-accent2 text-center p-[15px] rounded`} href={`/home`}>
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobForm;
