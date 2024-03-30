import React, { useState, useEffect } from 'react';
import { createProduct } from '@/services/products';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { toast } from 'react-hot-toast';
import { getCategories } from '@/providers/categories';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching Categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        price: '',
        category: '', 
        image:''
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('description', values.description);
          formData.append('price', values.price);
          formData.append('category', values.category);
          formData.append('image', values.image);

          await createProduct(formData);
          document.getElementById('my_modal_3').close()
          toast.success('Product added successfully');
        } catch (error) {
          toast.error('Error adding product: ' + error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form encType='multipart/form-data'>
          <div className="flex justify-center items-center">
            <div className="max-w-md">
              <h1 className="text-4xl md:text-6xl mb-4 text-center">Fill the Form and Add a Product</h1>
              <div className="mb-4">
                <Field name="name" className="input w-full input-bordered" type="text" placeholder="Enter name" />
                <ErrorMessage className="text-red-500" name="name" component="div" />
              </div>
              <div className="mb-4">
                <Field name="description" className="input w-full input-bordered" type="text" placeholder="Description" />
              </div>
              <div className="mb-4">
                <Field name="price" className="input w-full input-bordered" placeholder="Enter price" type="number" />
                <ErrorMessage className="text-red-500" name="price" component="div" />
              </div>
              <div className="mb-4">
                <Field as="select" name="category" className="select w-full input-bordered">
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Field>
                <ErrorMessage className="text-red-500" name="category" component="div" />
              </div>
              <div className="mb-4">
                <Field name="image" className="file-input w-full input-bordered" value={undefined} type="file" onChange={(event) => setFieldValue("image", event.currentTarget.files[0])} />
              </div>
              <div className="text-center">
                <div className="flex flex-col md:flex-row justify-center">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full md:w-1/2 md:mr-2 mb-4 md:mb-0">
                    Add Product
                  </button>
                  <Link to="/admin/products" className="btn btn-secondary w-full md:w-1/2 md:ml-2" onClick={() => document.getElementById('my_modal_3').close()}>
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Form>
      
      
      )}
    </Formik>
  );
};

export default AddProduct;
