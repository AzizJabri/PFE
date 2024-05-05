import React from 'react'
import { ErrorMessage, Form,Formik,Field} from 'formik'
import { useAuth } from '../../auth/auth'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    if (auth.user) {
  navigate('/')
    }

  return (
    <Formik
    initialValues={{
      email: '',
      password: '',
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
      } 
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      auth.login(values.email, values.password).then(() => {
        toast.success('Logged in successfully');
        navigate('/');
      }).catch((error) => {
        toast.error('Invalid email or password');
      });
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className="bg-no-repeat bg-cover bg-center relative bg-gradient-to-b from-primary to-accent">
          <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
            <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
              <div className="self-start hidden lg:flex flex-col  text-base-100">
                <img src="" className="mb-3" />
                <h1 className="mb-3 font-bold text-5xl">Hi, Welcome Back ! </h1>
                <p className="pr-3">
                Welcome to our secure login portal. Please enter your credentials to access your account. If you don't have an account yet, you can sign up <Link to="/auth/register" className="link link-warning">here</Link>.
                </p>
              </div>
            </div>
            <div className="flex justify-center self-center z-10 ">
              <div className="p-12 bg-base-200 mx-auto rounded-2xl w-100 ">
                <div className="mb-4">
                  <h3 className="font-semibold text-2xl text-base-content">Sign In</h3>
                  <p>Enter your email and password</p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-base-content">
                      Email <ErrorMessage className='text-red-500' name="email" component="span" />
                    </label>
                    <Field
                      className="input input-bordered w-full"
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-base-content">
                      Password <ErrorMessage className='text-red-500' name="password" component="span" />
                    </label>
                    <Field
                      className="input input-bordered w-full"
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                    />
                    
                  </div>
                  <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    defaultChecked
                    className="checkbox"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-base-content"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-400 hover:text-blue-500 link link-hover">
                    Forgot your password?
                  </a>
                </div>
              </div>
                  <div>
                    <button
                      className="w-full btn btn-primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <span className="inline-flex mx-auto">{isSubmitting ? <span className="loading loading-spinner loading-md"></span> : 'Login'}</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-6">
                  <div className="text-base-content font-light">
                    New here ?
                    <Link to="/auth/register" className="text-blue-400 hover:text-blue-500">
                      Register
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

export default Login