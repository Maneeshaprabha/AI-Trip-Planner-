import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GloablApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
    const [photoUrl, setPhotoUrl] = useState("/cartoon.jpg"); // Default image

    useEffect(() => {
      if (trip) {
        GetPlaceImg();
      }
    }, [trip]);
  
    const GetPlaceImg = async () => {
      try {
        const data = {
          textQuery: trip?.userSelection?.location?.label, // Use label to query
        };
        const result = await GetPlaceDetails(data);
  
        console.log("API Response:", result.data);
  
        if (result?.data?.places?.length > 0 && result.data.places[0].photos?.length > 3) {
          const photoName = result.data.places[0].photos[4].name;
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
    <Link to={`/view-trip/${trip.id}`}>
    <div className='hover:scale-105 transition-all cursor-pointer '>
      <img src={photoUrl?photoUrl:"/cartoon.jpg"}  className="object-cover rounded-xl h-[220px] w-full"alt="" />
      <div>
  <h2 className='text-lg font-bold'> {trip?.userSelection?.location?.label}</h2>
  <h2 className="text-sm text-gray-500"> {trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} budget</h2>

      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
