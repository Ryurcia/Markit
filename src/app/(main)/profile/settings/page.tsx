'use client';
import { poppins } from '@/utils/font.config';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SettingsSchema = Yup.object().shape({
  first_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),

  last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),

  bio: Yup.string().max(60, 'Too long'),
});

const page = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currBio, setCurrBio] = useState('');
  const [userId, setUserId] = useState('');

  const router = useRouter();
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then((res) => {
      if (!res.data.user) throw 'no user';

      setUserId(res.data.user.id);

      supabase
        .from('Profile')
        .select('first_name,last_name,bio')
        .eq('id', res.data.user.id)
        .limit(1)
        .single()
        .then((data) => {
          if (!data.data) throw 'No data found';

          setFirstName(data.data.first_name);
          setLastName(data.data.last_name);
          setCurrBio(data.data.bio);

          return;
        });
    });
  }, []);

  return (
    <div className={`mx-auto px-[16px] mt-4 md:w-[90%] md:px-0`}>
      <h1 className={`text-h1 ${poppins.className}`}>Settings</h1>
      <div className={`mt-[32px] grid grid-row-1`}>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            bio: '',
          }}
          validationSchema={SettingsSchema}
          onSubmit={async (values) => {
            const supabase = createClient();
            if (values.first_name === '') {
              values.first_name = firstName;
            }

            if (values.last_name === '') {
              values.last_name = lastName;
            }

            if (values.bio === '') {
              values.bio = currBio;
            }

            await supabase
              .from('Profile')
              .update({ first_name: values.first_name, last_name: values.last_name, bio: values.bio })
              .eq('id', userId);

            router.replace('/profile');

            return router.refresh();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Card className={`bg-dark rounded border-0 max-w-[400px]`}>
                <CardHeader>
                  <CardTitle className={`text-h3 ${poppins.className} font-semibold`}>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className={`grid grid-rows-2 gap-3`}>
                  <div className={`flex flex-col gap-2`}>
                    <label htmlFor='first_name'>First name</label>
                    <Field name='first_name' placeholder={firstName} className={`p-[10px] text-dark max-w-[400px]`} />
                    <ErrorMessage
                      name='first_name'
                      render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>}
                    />
                  </div>
                  <div className={`flex flex-col gap-2`}>
                    <label htmlFor='last_name'>Last name</label>
                    <Field name='last_name' placeholder={lastName} className={`p-[10px] text-dark max-w-[400px]`} />
                    <ErrorMessage
                      name='last_name'
                      render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>}
                    />
                  </div>
                  <div className={`flex flex-col gap-2`}>
                    <label htmlFor='bio'>Bio</label>
                    <Field name='bio' placeholder={currBio} className={`p-[10px] text-dark max-w-[400px]`} />
                    <ErrorMessage name='bio' render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>} />
                  </div>
                </CardContent>
                <CardFooter className={`grid grid-cols-2 gap-2`}>
                  <button type='submit' className={`px-[30px] py-[10px] bg-primary rounded`}>
                    Save
                  </button>
                  <Link
                    href={`/profile?uid=${userId}`}
                    className={`border-[1px] border-accent2 rounded px-[30px] py-[10px] hover:bg-accent2 text-center`}
                  >
                    Cancel
                  </Link>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default page;
