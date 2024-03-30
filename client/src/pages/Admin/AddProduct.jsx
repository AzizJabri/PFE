import React, { useState, useEffect } from 'react';
import { createProduct } from '@/services/products';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { toast } from 'react-hot-toast';
import { getCategories } from '@/providers/categories';

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
          toast.success('Product added successfully');
        } catch (error) {
          toast.error('Error adding product: ' + error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form  enctype="multipart/form-data">
          <div className="flex justify-center items-center h-screen">
            <div>
              <h3 className="text-4xl md:text-6xl">Fill the Form and Add a Product</h3>
              <br />
              <Field name="name" type="text" placeholder="Enter name" />
              <ErrorMessage className="text-red-500" name="name" component="div" />
              <br />
              <Field name="description" type="text" placeholder="Description" />
              <br />
              <Field name="price" placeholder="Enter price" type="number" />
              <ErrorMessage className="text-red-500" name="price" component="div" />
              <br />
              <Field as="select" name="category">
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Field>
              <ErrorMessage className="text-red-500" name="category" component="div" />
              <br />
             <Field name="image" type="file" onChange={(event) => setFieldValue("image", event.currentTarget.files[0])} />

              <br />
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                Add Product
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
