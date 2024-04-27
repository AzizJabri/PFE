import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { updateProduct,getProduct, addImageToProduct, deleteImageFromProduct } from '@/services/products';
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
            <div className="grid grid-cols-3 gap-4 py-2">
            {product?.images.map(image => (
                <div key={image.id} className="relative border border-base-300 p-4 rounded-md">
                    <img src={image.url} alt={product.name} className="w-full h-full object-cover" />
                    <button
                        className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 hover:text-red-700"
                        onClick={() => deleteImageFromProduct(product.id,image.id).then((res) => {
                            toast.success('Image deleted successfully');
                            setProduct({
                                ...product,
                                images: res.images
                            })
                        } )}

                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            ))}
            </div>
            <div className="py-4">
            <Formik
                    initialValues={{
                        image: ''
                    }}
                    onSubmit={async (values) => {
                        try {
                            const formData = new FormData();
                            formData.append('image', values.image);

                            await addImageToProduct(productId, formData).then((res) => {
                                setProduct({
                                    ...product,
                                    images: res.images
                                })
                            });
                            toast.success('Image added successfully');
                        } catch (error) {
                            toast.error('Error adding image: ' + error.message);
                            console.error('Error adding image:', error);
                        }
                    }}
                >{({setFieldValue}) => (
                    <Form encType='multipart/form-data'>
                        <div>
                            <label htmlFor="image" className="block">Upload Image</label>
                            <Field name="image" id="image" value={undefined} className="file-input file-input-bordered w-full max-w-xs" type="file" onChange={(event) => {
                                    setFieldValue("image", event.currentTarget.files[0]);
                                    }} />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Image</button>
                    </Form>
                )}
                </Formik>
                </div>
        </div>
    )
}

export default UpdateProduct