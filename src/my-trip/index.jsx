import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
    console.log("MyTrips");
  }, []);

  /**
   * Used to get all the trips of the user
   * @returns
   */
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation.navigate("/");
      return;
    }
  
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };
  return(

    <div className="p-6 md:p-12 lg:p-16 xl:p-20 mt-12 bg-gray-50 rounded-xl shadow-md">
    <h2 className="font-extrabold text-4xl text-gray-800 mb-8">
      Essential Highlights of My Upcoming Journey
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {userTrips?.length > 0 ? (
        userTrips.map((trip, index) => (
          <UserTripCardItem trip={trip} key={index} />
        ))
      ) : (
        [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            className="h-[220px] w-full bg-gray-300 animate-pulse rounded-lg"
            key={index}
          ></div>
        ))
      )}
    </div>
  </div>
);
}

export default MyTrips;