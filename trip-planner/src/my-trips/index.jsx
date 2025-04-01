import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../service/FirebaseConfig'; 
import UserTripCard from './components/UserTripCard';


function MyTrips() {
  const navigate = useNavigate(); 
  const [userTrips,setUserTrips]=useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const userString = localStorage.getItem('user'); 
    const user = userString ? JSON.parse(userString) : null;
    
    if (!user) {
      navigate('/');
      return;
    }
   
    const q = query(collection(db, 'Aitrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()])
    });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-40 px-5 mt-10 flex flex-col items-center text-center bg-white'>
<h2 className='font-bold text-3xl'>My Trips</h2>

<div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 '>

  {userTrips.map((trip,index)=>(
    <UserTripCard trip={trip} />
  ))}
    
</div>

    </div>
  ); 
}

export default MyTrips;