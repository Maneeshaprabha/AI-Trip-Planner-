import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GloablApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/custom-slider.css'; // Import custom styles if using an external stylesheet

function PlaceCardItem({ place }) {
  const [photos, setPhotos] = useState([]); // State for photos
  const [showPopup, setShowPopup] = useState(false); // State to control the popup

  useEffect(() => {
    if (place) {
      GetPlaceImg();
    }
  }, [place]);

  const GetPlaceImg = async () => {
    try {
      const data = {
        textQuery: place?.placeName, // Use placeName to query
      };
      const result = await GetPlaceDetails(data);

      if (result?.data?.places?.length > 0 && result.data.places[0].photos?.length > 0) {
        const photos = result.data.places[0].photos.map(photo => PHOTO_REF_URL.replace("{NAME}", photo.name));
        setPhotos(photos);
      }
    } catch (error) {
      console.error("Error fetching place images:", error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable navigation arrows
  };

  return (
    <>
      <div className='relative border border-gray-300 rounded-xl p-4 mt-4 bg-white shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105'>
        {/* Display the image */}
        <img
          src={photos.length > 0 ? photos[0] : "/cartoon.jpg"}
          className='w-full sm:w-[400px] h-[230px] rounded-xl object-cover'
          alt={place.placeName}
        />
        
        {/* Display the place name */}
        <h2 className='font-bold text-lg sm:text-xl mb-2'>{place.placeName}</h2>
        
        {/* Display the ticket pricing */}
        <h2 className='text-sm font-medium text-gray-700'>
          🎟️ {place.ticketPricing}
        </h2>
        
        {/* Google Maps Link with Icon */}
        <Link
          to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
          target='_blank'
          className='mt-2 inline-flex items-center px-3 py-2 text-sm font-medium rounded-xl  text-white transition-colors duration-300 ease-in-out'  style={{ backgroundColor: 'rgba(72,69,210,1)'}}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 mr-2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Google Maps
        </Link>

        {/* Read More Button */}
        <a  className="mt-4 inline-flex items-center px-12 py-2 text-sm font-medium  transition-colors duration-300 ease-in-out cursor-pointer " style={{ color: 'rgba(72,69,210,1)'}} onClick={() => setShowPopup(true)}>
          Read More
        </a>
      </div>

      {/* Popup Component */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPopup(false)}>
              &times;
            </button>

            {/* Image Slider */}
            <div className="slider-container mb-4">
              <Slider {...sliderSettings}>
                {photos.map((photo, index) => (
                  <div key={index}>
                    <img
                      src={photo}
                      className='w-full h-[230px] rounded-xl object-cover'
                      alt={place.placeName}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Popup Content */}
            <h2 className='font-bold text-lg sm:text-xl mb-2'>{place.placeName}</h2>
            <p className='text-sm text-gray-600 mb-2'>{place.placeDetails}</p>
            <p className='text-sm  mb-2 text-white'  style={{ backgroundColor: 'rgba(72,69,210,1)'}}>💁‍♀️ Tips :  {place.tips}</p>
            <h2 className='text-sm font-medium text-gray-700'>
              🎟️ {place.ticketPricing}
            </h2>
            <h2 className='text-sm font-medium text-gray-700'>
              🕜 {place.timeToSpend}
            </h2>

            {/* Google Maps Link inside Popup with Icon */}
            <Link
              to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
              target='_blank'
              className='mt-2 inline-flex items-center px-3 py-2 text-sm font-medium rounded-xl  text-white transition-colors duration-300 ease-in-out' style={{ backgroundColor: 'rgba(72,69,210,1)'}}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 mr-2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Google Maps
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaceCardItem;
