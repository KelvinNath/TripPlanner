import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { db } from '@/service/FirebaseConfig';
import Infosection from './components/Infosection';
import Hotel from './components/hotels';
import PlacestoVisit from './components/PlacestoVisit';

function ViewTrip() {
  const { TripId } = useParams();
  const [trip, setTrip] = useState({});

  useEffect(() => {
    if (TripId) {
      getTripData();
    }
  }, [TripId]);

  const getTripData = async () => {
    const docRef = doc(db, 'Aitrips', TripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Document data:', data);

      if (data?.TravelPlan) {
        setTrip(data.TravelPlan);
      } else {
        setTrip(data);
      }
    } else {
      console.log('No Such Document');
      toast('No Trip Found!');
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <Infosection trip={trip} />
      <Hotel trip={trip} />
      <PlacestoVisit trip={trip} />
    </div>
  );
}

export default ViewTrip;
