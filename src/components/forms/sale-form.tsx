'use client';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { poppins } from '@/utils/font.config';
import { Textarea } from '@/components/ui/textarea';
import { SalesCat } from '@/utils/categories';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const SaleFormSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title is too short').max(50, 'Title is too long').required('Title is required'),
  description: Yup.string().max(250, 'Description is too long'),
  price: Yup.number().required('Price is required').typeError('Must be a number').max(20000, 'Max price exceeded'),
  email: Yup.string().email('Invalid email'),
  telNo: Yup.number().typeError('Must be a number').max(9000000000, 'Not a phone no'),
  condition: Yup.string(),
  tag: Yup.string(),
});

const SaleForm = () => {
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
          tag: SalesCat[1].title,
          telNo: '',
          condition: 'New',
        }}
        validationSchema={SaleFormSchema}
        onSubmit={async (values) => {
          const supabase = createClient();
          const { data } = await supabase
            .from('Sale_Post')
            .insert([
              {
                title: values.title,
                description: values.description,
                price: (Math.round(Number(values.price) * 100) / 100).toFixed(2),
                tag: values.tag,
                condition: values.condition,
                post_author: userId,
                post_author_username: username,
              },
            ])
            .select('id');

          if (!data) throw 'No Post Created';

          console.log(imagesRef.current?.files);
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
                Condition
              </label>
              <Field className={`w-[180px] text-dark p-[10px] rounded`} name='condition' as='select'>
                <option className={`text-dark`} value='New'>
                  New
                </option>
                <option value='Used' className={`text-dark`}>
                  Used
                </option>
              </Field>
            </div>

            <div className={`w-full grid gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='tag'>
                Tag
              </label>
              <Field className={`w-[180px] text-dark p-[10px] rounded`} name='tag' as='select'>
                {SalesCat.slice(1).map((cat, index) => {
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
                Images
              </label>
              <input ref={imagesRef} className='max-w-[500px]' type='file' accept='image/*' required />
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

export default SaleForm;
