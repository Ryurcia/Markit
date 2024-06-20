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

const ServiceFormSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title is too short').max(50, 'Title is too long').required('Title is required'),
  description: Yup.string().max(250, 'Description is too long'),
  price: Yup.number().required('Price is required').typeError('Must be a number').max(500000, 'Max price exceeded'),
  pay_by: Yup.string().required('Required'),
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
          description: '',
          price: '',
          email: '',
          tag: ServicesCat[1].title,
          telNo: '',
          pay_by: 'hourly',
        }}
        validationSchema={ServiceFormSchema}
        onSubmit={async (values) => {
            console.log('Submit')
          const supabase = createClient();
          const { data } = await supabase
            .from('Service_Post')
            .insert([
              {
                title: values.title,
                description: values.description,
                price: Number(values.price).toFixed(2),
                email:values.email,
                tel_no:values.telNo,
                tag: values.tag,
                pay_by: values.pay_by,
                post_author: userId,
                post_author_username: username,
              },
            ])
            .select('id');

          if (!data) throw 'No Post Created';

          //Upload Images
          if (imagesRef.current?.files) {
            const { error } = await supabase.storage
              .from('sale')
              .upload(`public/sale_${data[0].id}`, imagesRef.current.files[0]);
            console.log(error?.message);
          }

          router.back();

          return toast({
            title: 'Post Created',
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className={`flex flex-col items-start gap-4`}>
            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='title'>
                Title
              </label>
              <Field className={`text-dark p-[10px] rounded max-w-[500px]`} name='title' />
              <ErrorMessage name='title' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='description'>
                Description
              </label>
              <Field className={`text-dark p-[10px] rounded max-w-[500px]`} name='description' as={Textarea} />
              <ErrorMessage name='description' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='email'>
                Contact info *optional
              </label>
              <div className={`grid gap-2`}>
                <div className={`grid grid-row-2`}>
                  <label htmlFor='email'>Email</label>
                  <Field
                    className={`text-dark p-[10px] rounded max-w-[500px]`}
                    name='email'
                    placeholder='johndoe@email.com'
                  />
                  <ErrorMessage name='email' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
                </div>

                <div className={`grid grid-row-2`}>
                  <label htmlFor='telNo'>Cell no.</label>
                  <Field
                    className={`text-dark p-[10px] rounded max-w-[500px]`}
                    name='telNo'
                    placeholder='xxx xxx xxx'
                  />
                  <ErrorMessage name='telNo' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
                </div>
              </div>
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='price'>
                Price
              </label>
              <Field className={`text-dark p-[10px] rounded w-[200px]`} name='price' placeholder='10000' />
              <ErrorMessage name='price' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='condition'>
                Rate
              </label>
              <Field className={`w-[180px] text-dark p-[10px] rounded`} name='pay_by' as='select'>
                <option className={`text-dark`} value='hourly'>
                  Hourly
                </option>
                <option value='monthly' className={`text-dark`}>
                  Monthly
                </option>
                <option value='one_time' className={`text-dark`}>
                  One time payment
                </option>
                <option value='contact_me' className={`text-dark`}>
                  Contact me
                </option>
              </Field>
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='tag'>
                Tag
              </label>
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

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='images'>
                Service Banner/Logo
              </label>
              <input ref={imagesRef} className='max-w-[500px]' type='file' accept='image/*' />
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

export default ServiceForm;