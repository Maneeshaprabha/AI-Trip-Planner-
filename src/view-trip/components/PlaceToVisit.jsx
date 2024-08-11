import React from 'react';
import PlaceCardItem from './PlaceCardItem';
import './PlaceCardItem.css'; // Import the CSS file

function PlaceToVisit({ trip }) {
  return (
    <div className="place-to-visit-container">
      <h2 className="section-title">Place to visit</h2>

      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="day-heading">Day {item.day}</h2>
            <h2 className="theme-heading">{item.theme}</h2>
            <div className="place-grid">
              {item.plan.map((place, index) => (
                <div key={index} className="place-card-container">
                  <h2 className="place-time">{place.time}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceToVisit;
