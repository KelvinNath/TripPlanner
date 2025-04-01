import React from 'react'
import { Link } from 'react-router-dom'

function Hotel({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl'>Hotel Recommendations</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3'>
        {trip?.tripData?.[0]?.travelPlan?.hotelOptions?.map((hotel, index) => (
          <Link 
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.HotelName},${hotel["Hotel address"]}`} 
            target='_blank'
          >
            <div className='hover:scale-105 transition:all cursor-pointer'>
              <img src='/image.jpeg' className='rounded-xl' />

              <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel.HotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍 {hotel["Hotel address"]}</h2>
                <h2 className='text-xs text-gray-500'>{hotel.Price} 💵</h2>
                <h2 className='text-xs text-gray-500'>{hotel.rating} ⭐</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotel;
