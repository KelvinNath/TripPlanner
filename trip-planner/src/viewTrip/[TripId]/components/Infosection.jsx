import React, { useEffect, useState } from 'react'
import { FaShareAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function Infosection({trip}) {
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
    <div>
      <img 
        src={photoUrl}
        alt="Trip"
        className='h-[340px] w-full object-cover rounded-xl'
      />

      <div className='my-5 flex justify-between items-center'>
        <div className='flex flex-col gap-2'> 
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          
          <div className='flex gap-5'>
            <h2 className='p-1 px-2 bg-gray-200 rounded-full text-gray-500 mt-5'> {trip.userSelection?.noOfDays} Day ☀️</h2>
            <h2 className='p-1 px-2 bg-gray-200 rounded-full text-gray-500 mt-5'>Budget: {trip.userSelection?.budget} 💰 </h2>
            <h2 className='p-1 px-2 bg-gray-200 rounded-full text-gray-500 mt-5 '> No.of Traveller: {trip.userSelection?.noOfPeople} 🫂</h2>
          </div>
        </div>

        {/* Share button moved to the right side of the same row */}
        <Button className='h-10'>
          <FaShareAlt />
        </Button>
      </div>
    </div>
  )
}

export default Infosection