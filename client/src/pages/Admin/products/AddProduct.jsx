import React, { useState, useEffect } from 'react';
import { createProduct } from '@/services/products';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { toast } from 'react-hot-toast';
import { getCategories } from '@/providers/categories';
import { Link, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

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
        stock : '',
        _visible: true,
        image:''
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('description', values.description);
          formData.append('price', values.price);
          formData.append('category', values.category);
          formData.append('stock', values.stock);
          formData.append('_visible', values._visible);
          formData.append('image', values.image);

          await createProduct(formData).then((res) => {
            navigate(`/admin/products/update/${res.id}`);
          });
          toast.success('Product added successfully');
        } catch (error) {
          toast.error('Error adding product: ' + error.message);
        } finally {
          setSubmitting(false);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Name is required';
        }
        if (!values.price) {
          errors.price = 'Price is required';
        }
        if (!values.stock) {
          errors.stock = 'Stock is required';
        }
        if (!values.category) {
          errors.category = 'Category is required';
        }
        if (!values.image) {
          errors.image = 'Image is required';
        }
        return errors;
      }
      }
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form encType='multipart/form-data'>
          <div className="flex justify-center items-center">
            <div className="max-w-md">
              <h1 className="text-4xl md:text-6xl mb-4 text-center">Add a Product</h1>
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
                <Field name="stock" className="input w-full input-bordered" placeholder="Enter Stock" type="number" />
                <ErrorMessage className="text-red-500" name="stock" component="div" />
              </div>
              <div className="mb-4">
                  <label htmlFor="_visible" className="block">Visible</label>
                  <Field type="checkbox" id="_visible" name="_visible" className="checkbox" />
                  <ErrorMessage name="_visible" component="p" className="text-red-500" />
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
                <ErrorMessage className="text-red-500" name="image" component="div" />
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
