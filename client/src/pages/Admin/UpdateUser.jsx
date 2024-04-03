import React, { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { changeUserEmail, promoteUser, demoteUser, changeUserPassword } from '@/providers/Users'; // Import your API functions
import { getUserByID } from '@/providers/Users';

const UpdateUserEmail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [oldEmail, setOldEmail] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserByID(userId);
        setOldEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await changeUserEmail(oldEmail, values.newEmail);
      toast.success('User email updated successfully');
    } catch (error) {
      toast.error('Error updating user email');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePromote = async () => {
    try {
       promoteUser(oldEmail);
      toast.success('User promoted to admin');
    } catch (error) {
      toast.error('Error promoting user');
    }
  };

  const handleDemote = async () => {
    try {
      await demoteUser(oldEmail);
      toast.success('User demoted from admin');
    } catch (error) {
      toast.error('Error demoting user');
    }
  };

  const handleChangePassword = async () => {
    try {
      await changeUserPassword(oldEmail, newPassword);
      toast.success('User password changed successfully');
      
      setShowPasswordModal(false); // Close the modal after successful password change
    } catch (error) {
      toast.error('Error changing user password');
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          newEmail: ''
        }}
        validate={values => {
          const errors = {};
          if (!values.newEmail) {
            errors.newEmail = 'Required';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
         
             <Form className="space-y-5">
          <h3 className="font-semibold text-2xl text-gray-800 text-white">Update User Email</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 text-white">Old Email</label>
            <Field
              className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              type="text"
              name="oldEmail"
              value={oldEmail}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 text-white">New Email</label>
            <Field
              className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              type="email"
              placeholder="Enter new email"
              name="newEmail"
            />
            <ErrorMessage className="text-red-500" name="newEmail" component="div" />
          </div>
          <div className="flex justify-center space-x-2">
  <button
    className="w-1/3 bg-black-400 hover:bg-gray-500 text-white-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
    type="submit"
    disabled={isSubmitting}
  >
    <span className="inline-flex mx-auto">
      {isSubmitting ? <span className="loading loading-spinner loading-md"></span> : "Update Email"}
    </span>
  </button>
  <button
    className="w-1/3 bg-black-400 hover:bg-gray-500 text-white-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
    onClick={() => setShowPasswordModal(true)}
  >
    Change Password
  </button>
</div>

          
          <div className="flex justify-center gap-2">
  <div className="w-1/3"> {/* Adjust the width as needed */}
    <button
      className="w-full bg-black-400 hover:bg-gray-500 text-white-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
      onClick={handlePromote}
      type="button"
    >
      Promote
    </button>
  </div>
  <div className="w-1/3"> {/* Adjust the width as needed */}
    <button
      className="w-full bg-black-400 hover:bg-gray-500 text-white-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
      onClick={handleDemote}
      type="button"
    >
      Demote
    </button>
  </div>
</div>


            <br></br>
        
        </Form>
         
        )}
      </Formik>
      
    

      {/* Password change modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block mb-2">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-lg w-full"
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
            <button
              className="ml-4 text-gray-600 px-4 py-2 rounded-lg border border-gray-300"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUserEmail;
