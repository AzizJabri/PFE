import React, { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAuth } from '@/auth/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateUser = () => {
  const { userId } = useParams();
  const { getUserById, updateUser } = useAuth();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        const { email } = response.data; // Assuming the API response includes the user's email
        setInitialValues({ ...initialValues, email });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        // Validation logic remains the same
      }}
      onSubmit={(values, { setSubmitting }) => {
        // Update user logic
        updateUser(userId, values).then(() => {
          toast.success('User updated successfully');
          navigate(`/users/${userId}`); // Navigate to user details page
        }).catch((error) => {
          toast.error('Error updating user');
        }).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5">
          <h3 className="font-semibold text-2xl text-gray-800">Update User</h3>
          <p className="text-gray-500">Update user information</p>
          {/* Remaining form fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Field
              className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              type="email"
              placeholder="Enter your email"
              name="email"
            />
            <ErrorMessage className="text-red-500" name="email" component="div" />
          </div>
          {/* Remaining form fields */}
          <div>
            <button
              className="w-full flex justify-center bg-blue-400 hover:bg-blue-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
              type="submit"
              disabled={isSubmitting}
            >
              <span className="inline-flex mx-auto">{isSubmitting ? <span className="loading loading-spinner loading-md"></span> : "Update"}</span>
            </button>
          </div>
          {/* Remaining form fields */}
        </Form>
      )}
    </Formik>
  );
};

export default UpdateUser;
