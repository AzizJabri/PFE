import React, { useState, useEffect } from 'react';
import { fetchMostRepetitiveUserId } from '@/providers/Orders';

const BestUser = () => {
  const [data , setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMostRepetitiveUserId().then((data) => {
          setData(data);
        });
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className=" text-3xl font-extrabold text-center mb-4">Best Clients</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full ">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Total Orders</th>
              <th className="px-4 py-2">Total Spent</th>
            </tr>
          </thead>
          <tbody className='bg-base-300'>
          {
            data && data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-base-200" : "bg-base-300"}>
                <td className="px-4 py-2"><img src={row[0].profile.image} alt="User" className="w-8 h-8 rounded-full avatar" /></td>
                <td className="px-4 py-2">{row[0].id}</td>
                <td className="px-4 py-2">{row[0].profile.firstName}</td>
                <td className="px-4 py-2">{row[0].profile.lastName}</td>
                <td className="px-4 py-2">{row[1]} Orders</td>
                <td className="px-4 py-2">${row[2]}</td>
              </tr>
            ))
          }
          {
            !data && (
              <tr>
                <td colSpan="6" className="text-center px-4 py-2">Loading...</td>
              </tr>
            )
          }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestUser;
