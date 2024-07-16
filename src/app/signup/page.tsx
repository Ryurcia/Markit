'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { hind, poppins } from '@/utils/font.config';
import * as Yup from 'yup';
import { SignUpNewUser } from '@/lib/supabase/auth/authFunctions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('*Invalid email').required('*Email Required'),
  password: Yup.string()
    .min(8, '*Password is too short!')
    .max(20, '*Password is too long!')
    .required('*Password is required'),
});

const page = () => {
  const [authError, setAuthError] = useState('');
  const router = useRouter();
  return (
    <div className={`h-dvh flex flex-col justify-center`}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const res = await SignUpNewUser(values);

          if (res?.authErrorMessage) return setAuthError(res.authErrorMessage);

          router.replace('/onboarding');

          return router.refresh();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Card className='mx-auto h-dvh flex flex-col justify-center md:flex-none min-[406px]:h-auto max-w-[400px] animate-diagonal-green-wave rounded border-0'>
              <CardHeader>
                <CardTitle className={`${poppins.className} text-h3`}>Sign Up</CardTitle>
                <CardDescription className={`${poppins.className} text-sm`}>
                  Please fill in the following info to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4'>
                  <div className='grid grid-cols-2 gap-4'></div>
                  <div className='grid gap-2'>
                    <div>
                      <label htmlFor='email' className={`${hind.className} text-base w-full`}>
                        Email
                      </label>
                      <p className={`text-sm`}>*This will be used for people to contact you</p>
                    </div>
                    <Field
                      className={`text-dark border-0 w-full p-[8px]`}
                      name='email'
                      placeholder='JohnDoe@example.com'
                    />
                  </div>
                  <div className='grid gap-2'>
                    <label htmlFor='password' className={`${hind.className} text-base`}>
                      Create password
                    </label>
                    <Field name='password' className={`text-dark border-0 w-full p-[8px]`} type='password' />
                  </div>
                  <ErrorMessage name='email' render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>} />
                  <ErrorMessage name='password' render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>} />
                  {authError ? <div className={`text-accent2`}>{authError}</div> : ''}
                  <button type='submit' className={`${poppins.className} w-full border-2 py-[8px]`}>
                    Create account
                  </button>
                  <Link href={`/home`} className={`${poppins.className} w-full border-2 py-[8px] text-center`}>
                    Continue to site
                  </Link>
                </div>
                <div className='mt-4 text-center text-sm'>
                  Already have an account?{' '}
                  <Link href='/signin' className='underline'>
                    Sign in
                  </Link>
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
