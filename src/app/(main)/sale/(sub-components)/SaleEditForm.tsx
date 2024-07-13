'use client';
import { createClient } from '@/utils/supabase/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const EditFormSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title is too short').max(50, 'Title is too long').required('Title is required'),
  description: Yup.string().max(250, 'Description is too long'),
  price: Yup.number().required('Price is required').typeError('Must be a number').max(500000, 'Max price exceeded'),
});

interface EditFormProps {
  product_id: string;
  title: string;
  description: string;
  price: string;
}

const SaleEditForm = ({ props }: { props: EditFormProps }) => {
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{
          title: props.title,
          description: props.description,
          price: props.price,
        }}
        validationSchema={EditFormSchema}
        onSubmit={async (values) => {
          const supabase = createClient();
          await supabase
            .from('Sale_Post')
            .update([{ title: values.title, description: values.description, price: values.price }])
            .eq('id', props.product_id);

          router.back();
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
                <label htmlFor='title'>Description</label>
                <Field className={`p-[10px] text-dark2 rounded`} name='description' />
                <ErrorMessage name='description' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
              </div>
              <div className={`flex flex-col gap-2`}>
                <label htmlFor='title'>Price</label>
                <Field className={`p-[10px] text-dark2 rounded`} name='price' />
                <ErrorMessage name='price' render={(msg) => <p className={`text-accent2 text-sm`}>{msg}</p>} />
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
                  await supabase.from('Sale_Post').delete().eq('id', props.product_id);
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

export default SaleEditForm;
