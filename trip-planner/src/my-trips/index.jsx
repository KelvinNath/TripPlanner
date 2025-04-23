import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../service/FirebaseConfig'; 
import UserTripCard from './components/UserTripCard';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function MyTrips() {
  const navigate = useNavigate(); 
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userString = localStorage.getItem('user'); 
      const user = userString ? JSON.parse(userString) : null;
      
      if (!user || !user.email) {
        console.log("No user found in localStorage or email missing");
        navigate('/');
        return;
      }
      
      console.log("Fetching trips for user:", user.email);
     
      const q = query(
        collection(db, 'Aitrips'), 
        where('userEmail', '==', user.email),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      // Collect all trip data
      const tripsData = [];
      querySnapshot.forEach((doc) => {
        console.log("Trip document:", doc.id, '=>', doc.data());
        tripsData.push({
          ...doc.data(),
          id: doc.id
        });
      });
      
      console.log("Total trips found:", tripsData.length);
      
      // Update state once with all trips
      setUserTrips(tripsData);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setError("Failed to load trips. Please try again later.");
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-40 px-5 mt-10 flex flex-col items-center justify-center text-center bg-white h-64'>
        <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin text-gray-500" />
        <p className="mt-4 text-gray-600">Loading your trips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-40 px-5 mt-10 flex flex-col items-center text-center bg-white'>
        <h2 className='font-bold text-3xl'>My Trips</h2>
        <p className="mt-5 text-red-500">{error}</p>
        <button 
          onClick={GetUserTrips}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-40 px-5 mt-10 flex flex-col items-center text-center bg-white'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      {userTrips.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 w-full'>
          {userTrips.map((trip, index) => (
            <UserTripCard key={trip.id || index} trip={trip} />
          ))}
        </div>
      ) : (
        <div className='mt-10 py-8 text-center'>
          <p className="text-lg text-gray-600">You haven't created any trips yet.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Your First Trip
          </button>
        </div>
      )}
    </div>
  ); 
}

export default MyTrips;