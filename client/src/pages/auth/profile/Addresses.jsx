import React,{useEffect, useState} from 'react'
import { getAddresses, createAddress, updateAddress, deleteAddress } from '@/services/address'
import { useAuth } from '@/auth/auth'
import { Formik , Form, Field, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'
const Addresses = () => {
    const { user } = useAuth()
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await getAddresses()
                setAddresses(response.data)
            } catch (error) {
                console.error('Error fetching addresses:', error)
            }
        }
        fetchAddresses()
    }, [])
    const handleSelectAddress = (address) => {
        setSelectedAddress(address)
    }
    const handleDeleteAddress = async (id) => {
        try {
            await deleteAddress(id)
            setAddresses(addresses.filter((address) => address.id !== id))
            toast.success('Address deleted successfully')
        } catch (error) {
            toast.error('Error deleting address: ' + error.message)
        }
    }

    const handleSubmit = async (values) => {
        try {
            if (selectedAddress) {
                await updateAddress(selectedAddress.id, values)
                const updatedAddresses = addresses.map((address) => {
                    if (address.id === selectedAddress.id) {
                        return { ...address, ...values }
                    }
                    return address
                })
                setAddresses(updatedAddresses)
                toast.success('Address updated successfully')
            } else {
                await createAddress(values)
                toast.success('Address created successfully')
                setAddresses([...addresses, values])
            }
        } catch (error) {
            console.error('Error updating address:', error)
        }
    }
    return (
        <div>
            <h1 className="text-3xl md:text-4xl mb-4 text-center font-semibold">Addresses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {addresses.map((address) => (
                    <div key={address.id} className="bg-base-200 p-4 rounded">
                        <p>{address.street}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.postalCode}</p>
                        <div className="flex justify-between">
                            <button onClick={() => handleSelectAddress(address)} className="btn btn-primary mt-2">Edit</button>
                            <button onClick={() => handleDeleteAddress(address.id)} className="btn btn-outline mt-2">Delete</button>
                        </div>
                    </div>
                ))} 
                {addresses.length === 0 && <div>No addresses found</div>}
            </div>
            <div>
                <h2 className="text-2xl font-semibold mt-4">Add/Edit Address</h2>
                <Formik
                    initialValues={{
                        street: selectedAddress?.street || '',
                        city: selectedAddress?.city || '',
                        state: selectedAddress?.state || '',
                        postalCode: selectedAddress?.postalCode || ''
                    }}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="street" className="block">Street</label>
                            <Field type="text" id="street" name="street" className="input w-full input-bordered" />
                            <ErrorMessage name="street" component="p" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="city" className="block">City</label>
                            <Field type="text" id="city" name="city" className="input w-full input-bordered" />
                            <ErrorMessage name="city" component="p" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="state" className="block">State</label>
                            <Field type="text" id="state" name="state" className="input w-full input-bordered" />
                            <ErrorMessage name="state" component="p" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="block">Postal Code</label>
                            <Field type="text" id="postalCode" name="postalCode" className="input w-full input-bordered" />
                            <ErrorMessage name="postalCode" component="p" className="text-red-500" />
                        </div>
                        <div className="flex justify-between">
                            <button type="submit" className="btn btn-primary">Save Address</button>
                            <button type="button" onClick={() => setSelectedAddress(null)} className="btn btn-outline">Clear</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>

    )

}

export default Addresses