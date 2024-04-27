// ChartNumbers.js

import React, { useState, useEffect } from 'react';
import { getNewUserCountLastWeek } from '@/providers/Users';
import { getCountOfAllProducts } from '@/services/products';
import { sumAllPrices } from '@/providers/Orders';
const stats = [
  { id: 1, name: 'Total products', value: ' ' },
  { id: 2, name: 'Total Revenue', value: '' },
  { id: 3, name: 'New users this week', value: ' ' },
 
];

export default function ChartNumbers() {
  const [newUserCount, setNewUserCount] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const fetchNewUserCount = async () => {
      try {
        const count = await getNewUserCountLastWeek();
        setNewUserCount(count);
      } catch (error) {
        // Handle error
      }
    };
    const fetchTotalProductsCount = async () => {
        try {
          const count = await getCountOfAllProducts();
          setTotalProducts(count);
        } catch (error) {
         
        }
      };
      const Sumprice = async () => {
        try {
          const price = await sumAllPrices();
          setPrice(price);
        } catch (error) {
          // Handle error
        }
      };
      Sumprice();
    fetchNewUserCount();
    fetchTotalProductsCount();
  }, []);

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-3 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-white">{stat.name}</h3>
              <p className="text-2xl lg:text-3xl text-white mt-2">
                {stat.id === 3 && newUserCount !== null ? `${newUserCount} Users` :
                  stat.id === 1 && totalProducts !== null ? `${totalProducts} Products` :
                  stat.id === 2 && price !== null ? `$${price}` : stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}
