import React, { useState, useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';


function UserTripCard({trip}) {
  const[photoUrl,setPhotoUrl]=useState();
  useEffect(() => { 
    trip&&GetPlacePhotos();
  }, [trip]);

  useEffect(() => {
    console.log("Updated photoUrl:", photoUrl); // Check if it updates correctly
  }, [photoUrl]);
  
  const GetPlacePhotos = async () => {
   
      const data ={
        textQuery:trip?.userSelection?.location?.label
  }
  const result=await GetPlaceDetails(data).then(resp=>{
    console.log(resp.data.places[0].photos[3].name );

    const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
    setPhotoUrl(PhotoUrl);
  })
}
return (
   <Link to={'/viewTrip/'+trip?.id}> {/* Fixed the space in the URL */}

  <div className='hover:scale-105 transition-all  '>

<img src={photoUrl?photoUrl:'/image.jpeg'} className='object-cover rounded-xl'/>

<div>
  <h2 className='font-bold txt-lg'>{trip?.userSelection?.location?.label}</h2>
  <h2 className='text-sm text-gray-500'>{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget}</h2>
</div>

  </div>
  </Link>
)
}

export default UserTripCard
