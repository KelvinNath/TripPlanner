import React from 'react';

function Placecarditem({ place }) {
  return (
    <div className='my-3 border rounded-2xl p-4 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-[300px] bg-white'>
      {/* Image with fallback */}
      <div className="w-full h-[150px] overflow-hidden rounded-xl">
        <img
          src={place?.placeImageUrl || '/image.jpeg'}
          alt={place?.placeName || 'Image'}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Place Details with Scrollable Content */}
      <div className='flex flex-col mt-3 overflow-auto max-h-[200px] scrollbar-thin scrollbar-thumb-gray-400'>
        <h3 className='font-bold text-lg text-gray-900'>{place?.placeName || 'Unknown Place'}</h3>
       {/*} <p className='text-gray-600 text-sm mt-1'>{place?.placeDetails || 'No details available'}</p>

        {/* Display Best Time to Visit */}
        {place?.bestTimeToVisit && (
          <p className='text-sm text-gray-700 mt-1'>
            <span className='font-semibold text-gray-900'>Best Time:</span> {place.bestTimeToVisit}
          </p>
        )}

        {/* Display Time to Travel */}
        {place?.timeToTravel && (
          <p className='text-sm text-gray-700 mt-1'>
            <span className='font-semibold text-gray-900'>Time to Travel:</span> {place.timeToTravel}
          </p>
        )}

        {/* Display Ticket Pricing */}
        <p className='text-sm text-gray-700 mt-1'>
          <span className='font-semibold text-gray-900'>Ticket Pricing:</span> {place?.ticketPricing || 'Free'}
        </p>
      </div>
    </div>
  );
}

export default Placecarditem;
