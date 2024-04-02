import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { updateProduct,getProduct } from '@/services/products';
import { getCategories } from '@/providers/categories';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
const UpdateProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(productId);
                setProduct(response.data);

                const categoriesResponse = await getCategories();
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);



    const handleSubmit = async (values) => {
        try {
            await updateProduct(productId, values);
            toast.success('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl md:text-4xl mb-4 text-center font-semibold">Update Product</h1>
            <Formik
                initialValues={{
                    name: product?.name || '',
                    description: product?.description || '',
                    price: product?.price || '',
                    category: product?.category?.id || ''
                }}
                onSubmit={handleSubmit}
                enableReinitialize 
            >
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block">Name</label>
                        <Field type="text" id="name" name="name" className="input w-full input-bordered" />
                        <ErrorMessage name="name" component="p" className="text-red-500" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block">Description</label>
                        <Field as="textarea" id="description" name="description" className="textarea textarea-bordered w-full" />
                        <ErrorMessage name="description" component="p" className="text-red-500" />
                    </div>
                    <div>
                        <label htmlFor="price" className="block">Price</label>
                        <Field type="number" id="price" name="price" className="input w-full input-bordered" />
                        <ErrorMessage name="price" component="p" className="text-red-500" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block">Category</label>
                        <Field as="select" id="category" name="category" className="select w-full input-bordered">
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="p" className="text-red-500" />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Product</button>
                </Form>
            </Formik>
        </div>
    )
}

export default UpdateProduct