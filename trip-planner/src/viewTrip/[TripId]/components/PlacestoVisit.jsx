import React from 'react';
import Placecarditem from './Placecarditem';

function PlacestoVisit({ trip }) {
  const tripDetails = trip?.tripData?.[0]; // Extracting trip data
  const itinerary = tripDetails?.travelPlan?.itinerary; // Corrected path to itinerary

  console.log('Trip Details:', tripDetails); // Debugging log
  console.log('Full itinerary:', itinerary); // Debugging log

  return (
    <div>
      <h2 className='text-xl font-bold mt-10'>Places to Visit</h2>

      {itinerary ? (
        <div>
          {Object.entries(itinerary)
            .sort(([a], [b]) => a.localeCompare(b)) // Sorting day1, day2 correctly
            .map(([day, details], index) => {
              console.log(`Day: ${day}`, details); // Debugging log

              return (
                <div key={index} className="mt-5">
                  <h2 className='font-bold text-lg capitalize'>{day}</h2>
                  <p className='text-gray-600'>{details?.theme || 'No Theme'}</p>
                  <p className='text-sm text-orange-500'>
                    Best Time: {details?.bestTimeToVisit || 'Not specified'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                    {details?.places?.length > 0 ? (
                      details.places.map((place, idx) => (
                        <Placecarditem key={idx} place={place} />
                      ))
                    ) : (
                      <p className="text-gray-500">No places available</p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <p>Loading itinerary...</p>
      )}
    </div>
  );
}

export default PlacestoVisit;
