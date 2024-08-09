import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlaceToVisit({ trip }) {
    return (
        <div>
         <h2 className="font-bold text-lg" style={{ marginTop: '100px' }}>Place to visit</h2>

            <div className="">
                {trip.tripData?.itinerary.map((item, index) => (
                    <div className="mt-5">
                        
                        <h2 className="font-medium text-lg">Day {item.day}</h2>
                        <div className=" grid grid-cols-2 gap-5">

                       
                        {item.plan.map((place, index) => (
                            <div className="">
                                <h2 className="font-medium text-sm text-purple-500">{place.time}</h2>

                          
                                  
                                    <PlaceCardItem place={place}/>
                                
                            </div>
                        ))}
                    </div>
                    </div>
                   
                ))}
                
            </div>
        </div>
    )
}

export default PlaceToVisit
