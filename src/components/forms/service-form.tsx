'use client';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { poppins } from '@/utils/font.config';
import { Textarea } from '@/components/ui/textarea';
import { ServicesCat } from '@/utils/categories';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '../ui/separator';

const ServiceFormSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title is too short').max(50, 'Title is too long').required('Title is required'),
  service_desc: Yup.string().max(250, 'Description is too long'),
  price: Yup.number().required('Pay is required').typeError('Must be a number').max(500000, 'Max price exceeded'),
  pay_by: Yup.string().required('Required'),
  company_name: Yup.string().max(50, 'Too Long'),
  email: Yup.string().email('Invalid email'),
  telNo: Yup.number().typeError('Must be a number').max(9990000000, 'Not a phone no'),
  tag: Yup.string(),
});

const ServiceForm = () => {
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
          service_desc: '',
          price: '',
          pay_by: 'one-time',
          company_name: '',
          tag: ServicesCat[1].title,
          email: '',
          telNo: '',
        }}
        validationSchema={ServiceFormSchema}
        onSubmit={async (values) => {
          const supabase = createClient();
          await supabase.from('Service_Post').insert([
            {
              title: values.title,
              description: values.service_desc,
              company_name: values.company_name,
              price: (Math.round(Number(values.price) * 100) / 100).toFixed(2),
              pay_by: values.pay_by,
              tag: values.tag,
              post_author: userId,
              post_author_username: username,
              email: values.email,
              tel_no: values.telNo,
            },
          ]);

          console.log('Submitted');

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
                  Service title
                </label>
                <p className={`text-sm opacity-50`}>*Short service title</p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded md:w-[300px]`} name='title' />
                <ErrorMessage name='title' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='company_name'>
                  Company name
                </label>
                <p className={`text-sm opacity-50`}>Name of company providing service</p>
              </div>
              <div>
                <Field
                  className={`text-dark p-[10px] rounded md:w-[300px]`}
                  name='company_name'
                  placeholder='John Does Cleaning Service'
                />
                <ErrorMessage name='company_name' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='service_desc'>
                  Description
                </label>
                <p className={`text-sm opacity-50`}>Short service description</p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded w-full md:w-[300px]`} name='service_desc' as={Textarea} />
                <ErrorMessage name='service_desc' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='price'>
                  Price
                </label>
                <p className={`text-sm opacity-50`}>*Price of your service(USD)</p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded md:w-[300px]`} name='price' placeholder='100000' />
                <ErrorMessage name='price' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='pay_by'>
                  Pay By
                </label>
                <p className={`text-sm opacity-50 w-[250px]`}>*Select payment rate</p>
              </div>
              <Field className={`w-[180px] text-dark p-[10px] rounded`} name='pay_by' as='select'>
                <option className={`text-dark`} value='one-time'>
                  One-time
                </option>
                <option value='monthly' className={`text-dark`}>
                  Monthly
                </option>
              </Field>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='email'>
                  Contact info
                </label>
                <p className={`text-sm opacity-50 w-[250px]`}>
                  Enter additional contact info where customer may also reach you. This is optional
                </p>
              </div>
              <div>
                <div className={`grid gap-2`}>
                  <div className={`grid grid-row-2`}>
                    <label htmlFor='email'>Email</label>
                    <Field
                      className={`text-dark p-[10px] rounded  md:w-[300px]`}
                      name='email'
                      placeholder='johndoe@email.com'
                    />
                    <ErrorMessage name='email' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
                  </div>

                  <div className={`grid grid-row-2`}>
                    <label htmlFor='telNo'>Cell no.</label>
                    <Field
                      className={`text-dark p-[10px] rounded md:w-[300px]`}
                      name='telNo'
                      placeholder='xxx xxx xxx'
                    />
                    <ErrorMessage name='telNo' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
                  </div>
                </div>
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='tag'>
                  Tag
                </label>
                <p className={`text-sm opacity-50`}>Select tag that best fits the service</p>
              </div>
              <Field className={`w-[180px] text-dark p-[10px] rounded`} name='tag' as='select'>
                {ServicesCat.slice(1).map((cat, index) => {
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

export default ServiceForm;
