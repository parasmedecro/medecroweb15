import React from "react";
import LeafletMap from "../Components/Map";
import { useState, useEffect } from "react";

const Health = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-violet-200 my-7 justify-center items-center p-5">
      <p className="text-3xl text-violet-800 font-semibold">
        Browse NearBy Hospitals
      </p>
      <div className="flex w-full h-full items-center">
        {selectedHospital && (
          <div className="flex flex-col gap-4 bg-white shadow-md h-fit w-1/3 mx-8 my-10 rounded-xl p-7 pr-3">
            <p className="text-2xl font-bold text-violet-800 mb-3">
              Selected Hospital
            </p>
            <p className="text-xl font-bold pb-3">{selectedHospital.name}</p>

            <p><span className="font-semibold mr-2">Latitude:</span>
              {selectedHospital.lat}</p>

            <p><span className="font-semibold mr-2">Longitude:</span>{selectedHospital.lon}</p>

            <p><span className="font-semibold block mb-3">Address:</span>
              {selectedHospital.address.full},{" "}
              {selectedHospital.address.district},{" "}
              {selectedHospital.address.state} -{" "}
              {selectedHospital.address.postcode}
            </p>
          </div>
        )}

        {currentLocation.lat !== 0 && currentLocation.lng !== 0 && (
          <LeafletMap
          // lat: 10.937937, lng: 76.9557255
            currentLocation={ currentLocation }
            setSelectedHospital={setSelectedHospital}
          />
        )}
      </div>
    </div>
  );
};

export default Health;
