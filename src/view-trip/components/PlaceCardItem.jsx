import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GloablApi';
import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("/cartoon.jpg"); // Default image

  useEffect(() => {
    if (place) {
      GetPlaceImg();
    }
  }, [place]);

  const GetPlaceImg = async () => {
    try {
      const data = {
        textQuery: place?.placeName, // Use label to query
      };
      const result = await GetPlaceDetails(data);

      console.log("API Response:", result.data);

      if (result?.data?.places?.length > 0 && result.data.places[0].photos?.length > 3) {
        const photoName = result.data.places[0].photos[3].name;
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);

        console.log("Photo URL:", photoUrl);

        setPhotoUrl(photoUrl);
      } else {
        console.warn("No suitable photo found, using default image.");
      }
    } catch (error) {
      console.error("Error fetching place image:", error);
    }
  };

  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName} target='_blank'>
      <div className='relative border border-gray-300 rounded-xl p-4 mt-4 flex gap-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer'>
        <img
          src={photoUrl ? photoUrl : "/cartoon.jpg"}
          className='w-[230px] h-[230px] rounded-xl object-cover'
          alt={place.placeName}
        />
        <div className='flex-1'>
          <h2 className='font-bold text-xl mb-2'>{place.placeName}</h2>
          <p className='text-sm text-gray-600 mb-2'>{place.placeDetails}</p>
          <h2 className='text-sm font-medium text-gray-700'>
            🎟️ {place.ticketPricing}
          </h2>
        </div>
      
      </div>
    </Link>
  );
}

export default PlaceCardItem;
