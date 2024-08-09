import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GloablApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotrlCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("/cartoon.jpg"); // Default image

  useEffect(() => {
    if (hotel) {
      GetPlaceImg();
    }
  }, [hotel]);

  const GetPlaceImg = async () => {
    try {
      const data = {
        textQuery: hotel?.hotelName, // Use label to query
      };
      const result = await GetPlaceDetails(data);

      console.log("API Response:", result.data);

      if (result?.data?.places?.length > 0 && result.data.places[0].photos?.length > 3) {
        const photoName = result.data.places[0].photos[2].name;
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
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName)},${encodeURIComponent(hotel?.hotelAddress)}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer border p-2 rounded-xl shadow-lg">
        {photoUrl ? (
          <img
            src={photoUrl ? photoUrl : "/cartoon.jpg"}
            className="rounded-xl mb-2 h-[200px] w-full object-cover"
            alt={hotel?.hotelName}
          />
        ) : (
          <div className="rounded-xl mb-2 h-[200px] w-full bg-gray-200 flex items-center justify-center">
            No Image Available
          </div>
        )}
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName || "Hotel Name"}</h2>
          <h2 className="text-xs text-gray-500">
            📌 {hotel?.hotelAddress || "Hotel Address"}
          </h2>
          <h2 className="text-sm">💸 {hotel?.price || "Hotel Price"}</h2>
          <h2 className="text-sm">
            ⭐ {hotel?.rating || "Hotel Rating"} Stars
          </h2>
          <p className="text-sm text-gray-500">
            {hotel?.description || "Hotel Description"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default HotrlCardItem;
