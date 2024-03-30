import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { toast } from 'react-hot-toast';
import { getCategoryByID, updateCategory } from '@/providers/categories';

const UpdateCategories = ({ onClose }) => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryByID(categoryId);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-4 space-y-4 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Update Category</h2>
        <Formik
          initialValues={{
            name: category.name,
            description: category.description,
          }}
          onSubmit={(values, { setSubmitting }) => {
            updateCategory(categoryId, values)
              .then(() => {
                toast.success('Category updated successfully');
                onClose();
              })
              .catch((error) => {
                toast.error('Error updating category: ' + error.message);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter category name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Field
                  name="description"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter category description"
                />
                <ErrorMessage name="description" component="div" className="text-red-500" />
              </div>
              <br></br>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateCategories;
