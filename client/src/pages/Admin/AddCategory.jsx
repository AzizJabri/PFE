import React from 'react'
import { ErrorMessage, Form, Formik, Field } from 'formik'
import { toast } from 'react-hot-toast'
import { createCategory } from '@/providers/categories'

const AddCategory = () => {
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Formik
          initialValues={{
            name: '',
            description: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            createCategory(values)
              .then(() => {
                toast.success('Category added successfully');
              })
              .catch((error) => {
                toast.error('Error adding category: ' + error.message);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form enctype="application/json"> {/* Add enctype attribute here */}
              <Field name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
              <br />
              <Field name="description" placeholder="Description" />
              <ErrorMessage name="description" component="div" className="text-red-500" />
              <br />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center bg-blue-400 hover:bg-blue-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddCategory
