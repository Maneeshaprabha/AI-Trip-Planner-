import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

export const getPlaceDetails = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data, config);
    debugger;
    const places = response.data.places[0];
    return response.data.places[0];
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};

//  export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)

// export const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?key=" + import.meta.env.VITE_GOOGLE_PLACE_API_KEY + "&maxHeightPx=600&maxWidthPx=600";

export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;


  // export const PHOTO_REF_URL ="https://places.googleapis.com/v1/{NAME}/media?key=AIzaSyCkgAbo7xML7KImllt4NRV56vMuN_AID8g&maxHeightPx=600&maxWidthPx=600;" 


// https://places.googleapis.com/v1/NAME/media?key=API_KEY&maxHeightPx=600

// https://places.googleapis.com/v1/places/ChIJE4QxymBYSjERBwDIE25g_i4/photos/AelY_CvM8hSVLoNQ0hTU1Yr5nsJgCacFtZ8nf8yI5-l_5n6WEkJTAkRJtuk0JPUYYQRz7M2_IheIFVyNBALjMutn7OuF5ijo_7H7y4ZiTNnVQp8caMoWIucwOhwr9JGy0xpMZCf646NHPmsIcDu3IwdibcbPUl56kstrcA18/media?key=AIzaSyCkgAbo7xML7KImllt4NRV56vMuN_AID8g&maxHeight=600&maxWidth=600

// https://places.googleapis.com/v1/"places/ChIJE4QxymBYSjERBwDIE25g_i4/photos/AelY_CvM8hSVLoNQ0hTU1Yr5nsJgCacFtZ8nf8yI5-l_5n6WEkJTAkRJtuk0JPUYYQRz7M2_IheIFVyNBALjMutn7OuF5ijo_7H7y4ZiTNnVQp8caMoWIucwOhwr9JGy0xpMZCf646NHPmsIcDu3IwdibcbPUl56kstrcA18
