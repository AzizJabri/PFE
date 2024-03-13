import Product from '@/components/Product'
import React, { useState, useEffect } from 'react'
import { getProducts } from '@/services/products'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'


const Products = () => {
    const [data, setData] = useState({
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 2
        },
        totalPages: 0
    });

    const [searchParams] = useSearchParams()
    const history = useNavigate()

    const page = parseInt(searchParams.get('page')) || 0;
    const size = parseInt(searchParams.get('size')) || 2;

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts(page, size)
            setData(response.data)
        }
        fetchProducts()
    }, [page, size])

    const handlePreviousClick = () => {
        const prevPage = Math.max(page - 1, 0);
        searchParams.set('page', prevPage.toString());
        history({ search: searchParams.toString() });
    };

    const handleNextClick = () => {
        const nextPage = Math.min(page + 1, data.totalPages - 1);
        searchParams.set('page', nextPage.toString());
        history({ search: searchParams.toString() });
    };

    return (
        <>
        <div className="flex flex-wrap justify-center">
            {data.content.map(product => (
                <Product key={product.id} product={product} />
            ))}
            
        </div>
        <div className="flex justify-center">
            <div className='join grid grid-cols-2'>
                {data.pageable.pageNumber > 0 && (
                    <button className='join-item btn btn-outline' onClick={handlePreviousClick}>Previous</button>
                )}
                {data.pageable.pageNumber < data.totalPages - 1 && (
                    <button className='join-item btn btn-outline' onClick={handleNextClick}>Next</button>
                )}
            </div>
        </div>
        </>
    )
}

export default Products
