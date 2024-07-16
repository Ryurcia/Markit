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
import { Separator } from '../ui/separator';

const SaleFormSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title is too short').max(50, 'Title is too long').required('Title is required'),
  description: Yup.string().max(250, 'Description is too long'),
  price: Yup.number().required('Price is required').typeError('Must be a number').max(500000, 'Max price exceeded'),
  telNo: Yup.number().typeError('Must be a number').max(9990000000, 'Not a phone no'),
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
                price: Number(values.price).toFixed(2),
                tag: values.tag,
                condition: values.condition,
                post_author: userId,
                post_author_username: username,
                tel_no: values.telNo,
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
            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='title'>
                  Title
                </label>
                <p className={`text-sm opacity-50`}>*Short title for product you are selling</p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded md:w-[300px]`} name='title' />
                <ErrorMessage name='title' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='description'>
                  Description
                </label>
                <p className={`text-sm opacity-50`}>Short description of product.</p>
              </div>
              <div>
                <Field
                  className={`text-dark p-[10px] rounded block w-full md:w-[300px]`}
                  name='description'
                  as={Textarea}
                />
                <ErrorMessage name='description' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
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
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='price'>
                  Price
                </label>
                <p className={`text-sm opacity-50 w-[250px]`}>*Set a price point for your item (USD)</p>
              </div>
              <div>
                <Field className={`text-dark p-[10px] rounded md:w-[300px]`} name='price' placeholder='10000' />
                <ErrorMessage name='price' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='condition'>
                  Condition
                </label>
                <p className={`text-sm opacity-50 w-[250px]`}>
                  Select the option that best fits the condition of your item.
                </p>
              </div>
              <Field className={`w-[180px] text-dark p-[10px] rounded`} name='condition' as='select'>
                <option className={`text-dark`} value='New'>
                  New
                </option>
                <option value='Used' className={`text-dark`}>
                  Used
                </option>
              </Field>
            </div>

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='tag'>
                  Tag
                </label>
                <p className={`text-sm opacity-50 w-[250px]`}>
                  Select the tag that best fits your item. This will also help people search for your item
                </p>
              </div>
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

            <Separator className={`bg-dark h-[1px]`} />

            <div className={`w-full flex flex-col justify-between md:flex-row items-start gap-5`}>
              <div>
                <label className={`${poppins.className} text-sub font-medium`} htmlFor='images'>
                  Images
                </label>
                <p className={`text-sm opacity-50 w-[250px]`}>*Upload an image of your item.</p>
              </div>
              <input ref={imagesRef} className='max-w-[500px]' type='file' accept='image/*' required />
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

export default SaleForm;
