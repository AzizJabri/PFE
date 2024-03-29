import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAuth } from '@/auth/auth';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddUser = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
            values.email,
          )
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 8) {
          errors.password = 'Password must be at least 6 characters';
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Required';
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = 'Passwords do not match';
        }
        if (!values.terms) {
          errors.terms = 'You must accept the terms and conditions';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        register(values.email, values.password).then(() => {
          toast.success('Account created successfully');
          navigate('/auth/login');
        }).catch((error) => {
          toast.error('Error creating account');
        }).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5">
          <h3 className="font-semibold text-2xl text-gray-800">Create an account</h3>
          <p className="text-gray-500">Please fill to be a member</p>
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
          <div className="space-y-2">
            <label className="mb-5 text-sm font-medium text-gray-700">Password</label>
            <Field
              className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              type="password"
              placeholder="Enter your password"
              name="password"
            />
            <ErrorMessage className="text-red-500" name="password" component="div" />
          </div>
          <div className="space-y-2">
            <label className="mb-5 text-sm font-medium text-gray-700">Confirm Password</label>
            <Field
              className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              type="password"
              placeholder="Enter your password"
              name="confirmPassword"
            />
            <ErrorMessage className="text-red-500" name="confirmPassword" component="div" />
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <Field
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                name="terms"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">I agree with terms and conditions</span>
            </label>
            <ErrorMessage className="text-red-500" name="terms" component="div" />
          </div>
          <div>
            <button
              className="w-full flex justify-center bg-blue-400 hover:bg-blue-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
              type="submit"
              disabled={isSubmitting}
            >
              <span className="inline-flex mx-auto">{isSubmitting ? <span className="loading loading-spinner loading-md"></span> : "Register"}</span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="text-gray-600 font-light">
              Already have an account?
              <Link to="/auth/login" className="text-blue-400 hover:text-blue-500">
Login
</Link>
</div>
</div>
</Form>
)}
</Formik>
);
};

export default AddUser;
