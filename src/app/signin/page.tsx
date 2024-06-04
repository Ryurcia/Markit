'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { hind, poppins } from '@/utils/font.config';
import * as Yup from 'yup';
import { SignInUser } from '@/lib/supabase/auth/authFunctions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('*Invalid email').required('*Email Required'),
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
        validationSchema={SigninSchema}
        onSubmit={async (values) => {
          const res = await SignInUser(values);

          if (res?.authErrorMessage) return setAuthError(res.authErrorMessage);

          router.replace('/home');

          return router.refresh();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Card className='mx-auto max-w-[400px] animate-diagonal-green-wave rounded border-0'>
              <CardHeader>
                <CardTitle className={`${poppins.className} text-h3`}>Sign in</CardTitle>
                <CardDescription className={`${poppins.className} text-sm`}>Welcome Back!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4'>
                  <div className='grid grid-cols-2 gap-4'></div>
                  <div className='grid gap-2'>
                    <label htmlFor='email' className={`${hind.className} text-base w-full`}>
                      Email
                    </label>
                    <Field
                      className={`text-dark border-0 w-full p-[8px]`}
                      name='email'
                      placeholder='JohnDoe@example.com'
                    />
                  </div>
                  <div className='grid gap-2'>
                    <label htmlFor='password' className={`${hind.className} text-base`}>
                      Password
                    </label>
                    <Field name='password' className={`text-dark border-0 w-full p-[8px]`} type='password' />
                  </div>
                  <ErrorMessage name='email' render={(msg) => <div className={`text-accent2 text-sm`}>{msg}</div>} />
                  {authError ? <div className={`text-accent2`}>{authError}</div> : ''}
                  <button type='submit' className={`${poppins.className} w-full border-2 py-[8px]`}>
                    Sign in
                  </button>
                </div>
                <div className='mt-4 text-center text-sm'>
                  Dont have an account?{' '}
                  <Link href='/signup' className='underline'>
                    Sign up
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
