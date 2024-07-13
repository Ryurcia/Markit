'use client';
import { createClient } from '@/utils/supabase/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const EditFormSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title is too short').max(50, 'Title is too long').required('Title is required'),
  job_desc: Yup.string().max(250, 'Description is too long'),
  pay: Yup.number().required('Pay is required').typeError('Must be a number').max(500000, 'Max price exceeded'),
  company_name: Yup.string().max(50, 'Too Long'),
  requirements: Yup.string().max(400, 'Too long').required('Required'),
});

interface EditFormProps {
  job_id: string;
  title: string;
  company_name: string;
  description: string;
  requirements: string;
  pay: string;
}

const JobEditForm = ({ props }: { props: EditFormProps }) => {
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{
          title: props.title,
          company_name: props.company_name,
          job_desc: props.description,
          requirements: props.requirements,
          pay: props.pay,
        }}
        validationSchema={EditFormSchema}
        onSubmit={async (values) => {
          const supabase = createClient();
          await supabase
            .from('Job_Post')
            .update([
              { title: values.title, job_desc: values.job_desc, pay: values.pay, requirements: values.requirements },
            ])
            .eq('id', props.job_id);

          return router.refresh();
        }}
      >
        {({ errors, touched }) => (
          <Form className={`flex flex-col gap-4`}>
            <div className={`w-full flex flex-col gap-3`}>
              <div className={`flex flex-col gap-2`}>
                <label htmlFor='title'>Title</label>
                <Field className={`p-[10px] text-dark2 rounded`} name='title' />
                <ErrorMessage name='title' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
              <div className={`flex flex-col gap-2`}>
                <label htmlFor='company'>Company</label>
                <Field className={`p-[10px] text-dark2 rounded`} name='company_name' />
                <ErrorMessage name='company' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
              <div className={`flex flex-col gap-2`}>
                <label htmlFor='job_desc'>Description</label>
                <Field className={`p-[10px] text-dark2 rounded`} name='job_desc' />
                <ErrorMessage name='job_desc' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
              <div className={`flex flex-col gap-2`}>
                <label htmlFor='requirements'>
                  Requirements <span className={`text-sm`}>*seperate with commas</span>
                </label>
                <Field className={`p-[10px] text-dark2 rounded`} name='requirements' />
                <ErrorMessage name='requirements' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
              <div className={`flex flex-col gap-2`}>
                <label htmlFor='pay'>Pay</label>
                <Field className={`p-[10px] text-dark2 rounded`} name='pay' />
                <ErrorMessage name='pay' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
            </div>

            <div className={`flex flex-col gap-2`}>
              <button className={`bg-primary py-[10px] rounded`} type='submit'>
                Save
              </button>
              <button
                className={`bg-accent2 py-[10px] rounded`}
                onClick={async () => {
                  const supabase = createClient();
                  await supabase.from('Job_Post').delete().eq('id', props.job_id);
                  router.replace('/home');
                  return router.refresh();
                }}
              >
                Delete
              </button>
              <button className={`border border-neutral py-[10px] rounded`} onClick={() => router.back()}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobEditForm;
