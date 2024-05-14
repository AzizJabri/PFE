import React from 'react'
import { ErrorMessage, Form,Formik,Field} from 'formik'
import { useAuth } from '@/auth/auth'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {useCart} from '@/providers/cart'


const Register = () => {
  const {register} = useAuth()
  const navigate = useNavigate()
  const {updateCartOnRegister} = useCart()

  return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          terms : false
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
          if (!values.terms) {
            errors.terms = 'You must accept the terms and conditions';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            register(values.email,values.password).then(() => {
                toast.success('Account created successfully')
                updateCartOnRegister(values.email,values.password)
            }).catch((error) => {
              console.log(error)
                toast.error(error.response.message)
            }).finally(() => {
                setSubmitting(false)
            })
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="bg-no-repeat bg-cover bg-center relative bg-gradient-to-b from-primary to-accent">
              <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                  <div className="self-start hidden lg:flex flex-col  text-primary-content">
                    <img src="" className="mb-3" />
                    <h1 className="mb-3 font-bold text-4xl">Create Your Account Now! </h1>
                    <p className="pr-3">
                      Welcome to our registration page. To get started, please fill out the required information below.
                    </p>
                    <Link to="/auth/login" className='link '>Already have an account? Login here</Link>
                  </div>
                </div>
                <div className="flex justify-center self-center  z-10">
                  <div className="p-12 bg-base-200 mx-auto rounded-2xl w-100 ">
                    <div className="mb-4">
                      <h3 className="font-semibold text-2xl text-base-content">Create an account</h3>
                      <p>Please fill to be a member</p>
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
                        <label className="inline-flex items-center cursor-pointer">
                          <Field
                            type="checkbox"
                            className="checkbox"
                            name="terms"
                          />
                          <span className="ml-2 text-sm font-medium">
                            I agree with terms and conditions
                          </span>
                        </label>
                          <ErrorMessage className='text-red-500' name="terms" component="span" />
                      </div>
                      <div>
                        <button
                          className="w-full btn btn-primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          <span className="inline-flex mx-auto">{isSubmitting ? <span className="loading loading-spinner loading-md"></span> : "Register"}</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-6">
                      <div className="font-light">
                        Already have an account?
                        <Link to="/auth/login" className="link link-primary">
                          Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}

      </Formik>
  )
}

export default Register