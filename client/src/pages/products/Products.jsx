import Product from '@/components/Product'
import React, { useState, useEffect } from 'react'
import { getProducts } from '@/services/products'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Loading from '@/components/Loading'
import { getCategories } from '@/providers/categories'
import GhostProduct from '@/components/GhostProduct'
import GhostCategory from '@/components/GhostCategory'

const Products = () => {
    const [productData, setProductData] = useState({
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 9
        },
        totalPages: 0
    });

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const page = parseInt(searchParams.get('page')) || 0;
    const size = parseInt(searchParams.get('size')) || 9;
    const category = searchParams.get('category') || '';

    const search = searchParams.get('search') || '';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const productResponse = await getProducts(page, size, search, category)
            setProductData(productResponse.data)
            const categoryResponse = await getCategories()
            setCategories(categoryResponse.data)
            setLoading(false);
        }
        fetchData();
    }, [page, size, search, category])

    const handlePreviousClick = () => {
        const prevPage = Math.max(page - 1, 0);
        searchParams.set('page', prevPage.toString());
        navigate({ search: searchParams.toString() });
    };

    const handleNextClick = () => {
        const nextPage = Math.min(page + 1, productData.totalPages - 1);
        searchParams.set('page', nextPage.toString());
        navigate({ search: searchParams.toString() });
    };

    return (
        <div class="drawer">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <div class="flex">
      {/* Categories Section (Visible only on medium screens and above) */}
      <div class="hidden md:block w-1/4 bg-base-200 p-4 h-auto min-h-screen">
        <h2 class="text-lg font-semibold mb-4">Categories</h2>
        <ul class="space-y-2">
          {loading ? (
            <>
              <GhostCategory />
              <GhostCategory />
              <GhostCategory />
              <GhostCategory />
              <GhostCategory />
            </>
          ) : (
            categories.map(category => (
              <li key={category.id}>
                <Link to={`/products/?category=${category.id}`} class="btn btn-ghost w-full text-left bg-base-100">{category.name}</Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Products Section */}
      <div class="w-full md:w-3/4 p-4">
        <h1 class="text-2xl font-semibold mb-4">Products</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
          {loading ? (
            <>
              <GhostProduct />
              <GhostProduct />
              <GhostProduct />
            </>
          ) : (
            productData.numberOfElements === 0 ? (
              <div>No products found</div>
            ) : (
              productData.content.map(product => (
                <Product key={product.id} product={product} />
              ))
            )
          )}
        </div>
        {productData.totalPages > 1 && (
          <div class="flex justify-center py-2">
            <div class={`join grid ${productData.pageable.pageNumber > 0 & productData.pageable.pageNumber < productData.totalPages - 1 ? "grid-cols-3" : "grid-cols-2"}`}>
              {productData.pageable.pageNumber > 0 && (
                <button class='join-item btn btn-outline' onClick={handlePreviousClick}>Previous</button>
              )}
              <div class="join-item btn btn-outline">{productData.pageable.pageNumber + 1}</div>
              {productData.pageable.pageNumber < productData.totalPages - 1 && (
                <button class='join-item btn btn-outline' onClick={handleNextClick}>Next</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><a href="#">Sidebar Item 1</a></li>
      <li><a href="#">Sidebar Item 2</a></li>
    </ul>
  </div>
</div>


    )
}

export default Products
