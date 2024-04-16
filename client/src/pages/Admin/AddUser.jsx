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
          confirmPassword: ''
        }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = '(Required)';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              values.email,
            )
          ) {
            errors.email = '(Invalid email address)';
          }
          if (!values.password) {
            errors.password = '(Required)';
          } else if (values.password.length < 8) {
            errors.password = '(Password must be at least 6 characters)';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = '(Required)';
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = '(Passwords do not match)';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            register(values.email,values.password).then(() => {
                toast.success('Account created successfully')
            }).catch((error) => {
                toast.error('Error creating account')
            }).finally(() => {
                setSubmitting(false)
            })
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form>
                <div className="flex justify-center self-center  z-10">
                  <div className="p-12 bg-base-200 mx-auto rounded-2xl w-100 ">
                    <div className="mb-4">
                      <h3 className="font-semibold text-2xl text-base-content">Create an account</h3>
                    </div>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium tracking-wide">
                          Email 
                        </label>
                        <Field
                          className="input input-bordered w-full"
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                        />
                        <ErrorMessage className='text-red-500' name="email" component="span" />
                      </div>
                      <div className="space-y-2">
                        <label className="mb-5 text-sm font-medium tracking-wide">
                          Password 
                        </label>
                        <Field
                          className="input input-bordered w-full"
                          type="password"
                          placeholder="Enter your password"
                          name="password"
                        />
                        <ErrorMessage className='text-red-500' name="password" component="span" />
                      </div>
                      <div className="space-y-2">
                        <label className="mb-5 text-sm font-medium tracking-wide">
                          Confirm Password 
                        </label>
                        <Field
                          className="input input-bordered w-full"
                          type="password"
                          placeholder="Enter your password"
                          name="confirmPassword"
                        />
                        <ErrorMessage className='text-red-500' name="confirmPassword" component="span" />
                      </div>
                      <div>
                        <button
                          className="w-full btn btn-primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          <span className="inline-flex mx-auto">{isSubmitting ? <span className="loading loading-spinner loading-md"></span> : "Add User"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
          </Form>
        )}

      </Formik>
);
};

export default AddUser;
