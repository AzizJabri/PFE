import React from 'react'
import { ErrorMessage, Form, Formik, Field } from 'formik'
import { toast } from 'react-hot-toast'
import { createCategory } from '@/providers/categories'

const AddCategory = () => {
  
  return (
    <div className="flex justify-center items-center p-5">
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
            <Form enctype="application/json" className='space-y-5'> 
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter category name"
                />
                <ErrorMessage name="name" component="div" className="text-error" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Field
                  name="description"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter category description"
                />
                <ErrorMessage name="description" component="div" className="text-error" />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  Add Category
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddCategory
