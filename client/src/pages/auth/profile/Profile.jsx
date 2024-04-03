import React, { useState } from 'react';
import { useAuth } from '@/auth/auth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateProfile } from '@/services/profile';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, setUser } = useAuth();

    const handleSubmit = async (values) => {
        try {
            const response = await updateProfile(values);
            setUser({ ...user, profile: response.data });
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
        }
    };
    return (
        
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center py-2">Update Profile</h1>
            <div className="flex justify-center items-center">
                <div className="max-w-md">
                    <Formik
                        initialValues={{
                            firstName: user?.profile?.firstName || '',
                            lastName: user?.profile?.lastName || '',
                            phoneNumber: user?.profile?.phoneNumber || '',
                        }}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        <Form className="bg-base-200 p-10 rounded">
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block">First Name</label>
                                <Field name="firstName" id="firstName" className="input w-full input-bordered" type="text" />
                                <ErrorMessage name="firstName" component="p" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block">Last Name</label>
                                <Field name="lastName" id="lastName" className="input w-full input-bordered" type="text" />
                                <ErrorMessage name="lastName" component="p" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block">Phone Number</label>
                                <Field name="phoneNumber" id="phoneNumber" className="input w-full input-bordered" type="text" />
                                <ErrorMessage name="phoneNumber" component="p" className="text-red-500" />
                            </div>
                            <button type="submit" className="btn btn-primary">Update Profile</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Profile;