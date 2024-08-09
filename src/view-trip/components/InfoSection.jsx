import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GloablApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

function InfoSection({ trip }) {
  const [photos, setPhotos] = useState(["/cartoon.jpg"]); // Default image
  const [currentIndex, setCurrentIndex] = useState(0);

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

      if (result?.data?.places?.length > 0 && result.data.places[0].photos?.length > 0) {
        const photoUrls = result.data.places[0].photos.map(photo =>
          PHOTO_REF_URL.replace("{NAME}", photo.name)
        );
        setPhotos(photoUrls);
      } else {
        console.warn("No suitable photos found, using default image.");
      }
    } catch (error) {
      console.error("Error fetching place images:", error);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-[900px] mx-auto">
      {/* Image container */}
      <div className="relative">
        <img
          src={photos[currentIndex]}
          alt={`Location ${currentIndex + 1}`}
          className="h-[340px] w-full object-cover rounded-xl"
        />
        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full"
        >
          <FaChevronLeft className="text-gray-700" />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full"
        >
          <FaChevronRight className="text-gray-700" />
        </button>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="my-5 flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label || "Unknown Location"}
          </h2>

          <div className="hidden sm:flex gap-5">
            <h2 className="p-1 px-3 bg-gray-50 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays || "N/A"} days
            </h2>
            <h2 className="p-1 px-3 bg-gray-50 rounded-full text-gray-500 text-xs md:text-md">
              💰{trip?.userSelection?.budget || "N/A"} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-50 rounded-full text-gray-500 text-xs md:text-md">
              ✈️ No of Travelers: {trip?.userSelection?.travelers || "N/A"}
            </h2>
          </div>
        </div>

        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
