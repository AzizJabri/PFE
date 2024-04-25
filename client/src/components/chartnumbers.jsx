// ChartNumbers.js

import React, { useState, useEffect } from 'react';
import { getNewUserCountLastWeek } from '@/providers/Users';
import { getCountOfAllProducts } from '@/services/products';
import { sumAllPrices } from '@/providers/Orders';
const stats = [
  { id: 1, name: 'Total products', value: ' ' },
  { id: 2, name: 'Total Revenue', value: '' },
  { id: 3, name: 'New users annually', value: ' ' },
 
];

export default function ChartNumbers() {
  const [newUserCount, setNewUserCount] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [Price, setPrice] = useState(null);
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
          console.log(count)
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
    <div className="bg-dark py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-white-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white-900 sm:text-5xl">
                {stat.id === 3 && newUserCount !== null ? newUserCount +" Users": 
                  stat.id === 1 && totalProducts !== null ? totalProducts+" Products" :
                  stat.id === 2 && Price !== null ? Price+" TND" : stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
