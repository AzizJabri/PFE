import React, { useState, useEffect } from 'react';
import { fetchMostRepetitiveUserId } from '@/providers/Orders';
import { getUserByID } from '@/providers/Users';

const BestUser = () => {
  const [mostRepetitiveUserId, setMostRepetitiveUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const userId = await fetchMostRepetitiveUserId();
        setMostRepetitiveUserId(userId);

        const user = await getUserByID(userId);
        setUserDetails(user);
        console.log(user.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto">
      <h1 className="text-white-700 text-3xl font-extrabold text-center">
    Best Client
</h1>
<br></br>
        <table className="table">
          <thead>
            <tr>
            
              <th></th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
*            {userDetails && (
              <tr>
              
                <td><img src={userDetails.data.profile.image} alt="User" /></td>
                <td>{userDetails.data.id}</td>
                <td>{userDetails.data.profile.firstName}</td>
                <td>{userDetails.data.profile.lastName}</td>
              </tr>
            )}
          </tbody>
         
        </table>
      </div>
      <br></br>
    </div>
 
  );
};

export default BestUser;
