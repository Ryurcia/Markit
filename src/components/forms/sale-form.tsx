'use client';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { poppins } from '@/utils/font.config';
import { Textarea } from '@/components/ui/textarea';
import { SalesCat } from '@/utils/categories';

const SaleFormSchema = Yup.object().shape({
  title: Yup.string().min(10, 'Title is too short').max(20, 'Title is too long').required('Title is required'),
  description: Yup.string().max(250, 'Description is too long'),
  price: Yup.number().required('Price is required').typeError('Must be a number').max(20000, 'Max price exceeded'),
  email: Yup.string().email('Invalid email'),
  telNo: Yup.number().typeError('Must be a number').max(1000000000, 'Max price exceeded'),
});

const SaleForm = () => {
  return (
    <div className={`w-full `}>
      <Formik
        initialValues={{
          title: '',
          description: '',
          price: '',
          email: '',
          tag: '',
          telNo: '',
        }}
        validationSchema={SaleFormSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ errors, touched }) => (
          <Form className={`grid grid-rows-[8] gap-3`}>
            <div className={`grid grid-rows-2 gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='title'>
                Title
              </label>
              <Field className={`text-dark p-[10px] rounded max-w-[500px]`} name='title' />
              <ErrorMessage name='title' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`grid grid-row-2 gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='description'>
                Description
              </label>
              <Field className={`text-dark p-[10px] rounded max-w-[500px]`} name='description' as={Textarea} />
              <ErrorMessage name='description' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`grid grid-row-2 gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='email'>
                Contact info *optional
              </label>
              <div className={`grid grid-row-2 gap-2`}>
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

            <div className={`grid grid-row-2 gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='price'>
                Price
              </label>
              <Field className={`text-dark p-[10px] rounded w-[200px]`} name='price' placeholder='10000' />
              <ErrorMessage name='price' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <div className={`grid grid-row-2 gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='condition'>
                Condition
              </label>
              <Field className={`w-[180px] text-dark p-[10px] rounded`} name='condition' as='select'>
                <option className={`hover:bg-primary`} value='New'>
                  New
                </option>
                <option value='Used'>Used</option>
              </Field>
            </div>

            <div className={`grid grid-row-2 gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='tag'>
                Tag
              </label>
              <Field className={`w-[180px] text-dark p-[10px] rounded`} name='tag' as='select'>
                {SalesCat.slice(1).map((cat, index) => {
                  return (
                    <option key={index} value={cat.title}>
                      {cat.title}
                    </option>
                  );
                })}
              </Field>
            </div>

            <div className={`grid grid-row-2 gap-2 items-center`}>
              <label className={`${poppins.className} text-sub font-medium`} htmlFor='price'>
                Images
              </label>
              <input type='file' accept='images/*' multiple />
              <ErrorMessage name='price' render={(msg) => <p className={`text-accent2`}>{msg}</p>} />
            </div>

            <button className={`bg-primary p-[15px] rounded text-base font-semibold`} type='submit'>
              Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SaleForm;
