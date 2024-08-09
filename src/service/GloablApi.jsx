import axios from "axios"

const BASE_URL ='https://places.googleapis.com/v1/places:searchText'

const config={
    headers:{
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)
debugger;

export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;


// https://places.googleapis.com/v1/places/ChIJxQqXeB-0bTkRHId_W2Lvng4/photos/AelY_Cu6_PnyZbxhO9Q8gPaWMGS5zfTvSCyE6luzw18Wb19ZuRG4gRmsKRSKujLFpEYq5IHRMWbZF01RZiZjj6-s9ACrRJ452hBjgREsZK6Ih6PjNJCb30vOUxJ4vS3-M_7bFpX8JoV-Ttj20TrC95NIQqE9a2uWNeM9JQ1U/media?maxHeightPx=600&maxWidthPx=600&key=AIzaSyCkgAbo7xML7KImllt4NRV56vMuN_AID8g