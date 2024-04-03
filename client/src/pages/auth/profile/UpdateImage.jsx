import React,{useState} from 'react'
import { useAuth } from '@/auth/auth'
import { Formik, Form, Field } from 'formik'
import toast from 'react-hot-toast'
import { changeImage } from '@/services/profile'


const UpdateImage = () => {
    const { user, setUser } = useAuth()

    const handleSubmit = async (values) => {
        const data = new FormData()
        data.append('image', values.image)
        try {
            await changeImage(data).then((response) => {
                setUser({
                    ...user,
                    profile: response.data
                })
            })
            toast.success('Image updated successfully')
        } catch (error) {
            console.error('Error updating image:', error)
        }
        
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center py-2">Update Image</h1>
            <div className="flex justify-center items-center">
                <div className="max-w-md">
                    <Formik
                        initialValues={{
                            image: ''
                        }}
                        onSubmit={handleSubmit}
                    >
                    {({isSubmitting, setFieldValue}) => (
                        <Form className="bg-base-200 p-10 rounded" encType='multipart/form-data'>
                            <div className="mb-4">
                                <label htmlFor="image" className="block">Image</label>
                                <Field name="image" id="image" value={undefined} className="file-input file-input-bordered w-full max-w-xs" type="file" onChange={(event) => {
                                    setFieldValue("image", event.currentTarget.files[0]);
                                    }} />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Update Image</button>
                        </Form>
                    )}
                    </Formik>
                </div>
            </div>
        </div>
    )
  
}

export default UpdateImage