import React, { useState, useEffect } from 'react';
import { fetchMostRepetitiveUserId } from '@/providers/Orders';

const BestUser = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMostRepetitiveUserId();
        setUsers(data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-white text-3xl font-extrabold text-center mb-4">Best Clients</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {
              users && users.map((user, index) => (
                <tr key={index}>
                  <td className="px-4 py-2"><img src={user.profile.image} alt="User" className="w-10 h-10 rounded-full avatar" /></td>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.profile.firstName}</td>
                  <td className="px-4 py-2">{user.profile.lastName}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestUser;
