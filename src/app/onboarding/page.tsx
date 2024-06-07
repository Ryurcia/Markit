'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { hind, poppins } from '@/utils/font.config';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const OnboardingSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, '*First name is too short!')
    .max(20, '*First name is too long!')
    .required('*First name is required'),
  lastName: Yup.string()
    .min(2, '*Last name is too short!')
    .max(20, '*Last name is too long!')
    .required('*Last name is required'),
  username: Yup.string()
    .min(6, '*Username is too short!')
    .max(20, '*Username is too long!')
    .required('*Username is required'),
});

const page = () => {
  const [onBoardingError, setOnboardingError] = useState('');
  const pfpRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then((res) => {
      if(!res.data.user) throw 'No User';
      
      checkIfUserHasUsername(res.data.user.id).then((res) => {
        if(!res) return;

        return router.replace('/home')
      })

    })

    const checkIfUserHasUsername = async(user_id:string) => {
      const hasUsername = await supabase.from('Profile').select('*',{count:'exact'}).eq('id',user_id);

      if(!hasUsername.count) return false;

      return true;
    }

  },[]);

  return (
    <div className={`h-dvh flex flex-col justify-center`}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
        }}
        validationSchema={OnboardingSchema}
        onSubmit={async (values) => {
          const supabase = createClient();
          const {
            data: { user },
            error,
          } = await supabase.auth.getUser();

          if (!user || error) throw 'no user';

          const res = await supabase.from('Profile').insert({
            id: user.id,
            first_name: values.firstName,
            last_name: values.lastName,
            username: values.username,
            email: user.email,
            bio:'Just joined Markit!'
          });

          if(!pfpRef.current?.files) return;
          const upload = pfpRef.current.files[0];
          const {data} = await supabase.storage.from('avatars').upload(`public/${user.id}`,upload)
    
          if (res.error?.code === '23505') return setOnboardingError('Username is taken');

          return router.replace('/home');
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Card className='mx-auto max-w-[400px] animate-diagonal-green-wave rounded border-0'>
              <CardHeader>
                <CardTitle className={`${poppins.className} text-h3`}>Set up your profile</CardTitle>
                <CardDescription className={`${poppins.className} text-sm`}>
                  This information will be displayed in your profile for others to see
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4'>
                  <div className='grid grid-cols-2 gap-4'></div>
                  <div className={`grid gap-2`}>
                  <label htmlFor="pfp">Select Profile Picture</label>
                    <input className={`block w-full`} type="file" required ref={pfpRef} accept='image/*' />
                  </div>
                  <div className='grid gap-2'>
                    <label htmlFor='firstName' className={`${hind.className} text-base w-full`}>
                      First Name
                    </label>
                    <Field className={`text-dark border-0 w-full p-[8px]`} name='firstName' placeholder='John' />
                    <ErrorMessage
                      name='firstName'
                      render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <label htmlFor='firstName' className={`${hind.className} text-base w-full`}>
                      Last Name
                    </label>
                    <Field className={`text-dark border-0 w-full p-[8px]`} name='lastName' placeholder='Doe' />
                    <ErrorMessage
                      name='lastName'
                      render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <label htmlFor='username' className={`${hind.className} text-base`}>
                      Create Username
                    </label>
                    <Field name='username' className={`text-dark border-0 w-full p-[8px]`} placeholder='JohnDoe69' />
                    <ErrorMessage
                      name='username'
                      render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>}
                    />
                  </div>
                  <ErrorMessage name='email' render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>} />
                  <ErrorMessage name='password' render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>} />
                  {onBoardingError ? <div className={`text-accent2`}>{onBoardingError}</div> : ''}
                  <button type='submit' className={`${poppins.className} w-full border-2 py-[8px]`}>
                    Continue
                  </button>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;
