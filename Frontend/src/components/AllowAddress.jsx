/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const APIkey = import.meta.env.VITE_OPENCAGE_API_KEY;

export default function AllowAddress() {
  const [location, setLocation] = useState("");
  console.log(location);
  const getLocationInfo = (latitude, longitude) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log("results:", data.results);
          setLocation(data.results[0].formatted);
        } else {
          console.log("Reverse geolocation request failed.");
        }
      })
      .catch((error) => console.error(error));
  };
  const success = (pos) => {
    console.log(pos);
    let crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    getLocationInfo(crd.latitude, crd.longitude);
  };

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //   useEffect(() => {
  //     if (navigator.geolocation) {
  //       navigator.permissions.query({ name: "geolocation" }).then((result) => {
  //         console.log(result);
  //         if (result.state === "granted") {
  //           //If granted then you can directly call your function here
  //           navigator.geolocation.getCurrentPosition(success, errors, options);
  //         } else if (result.state === "prompt") {
  //           //If prompt then the user will be asked to give permission
  //           navigator.geolocation.getCurrentPosition(success, errors, options);
  //         } else if (result.state === "denied") {
  //           //If denied then you have to show instructions to enable location
  //         }
  //       });
  //     } else {
  //       console.log("Geolocation bot supported");
  //     }
  //   }, []);

  const handleAddress = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        console.log(result);
        if (result.state === "granted") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "prompt") {
          //If prompt then the user will be asked to give permission
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
        }
      });
    } else {
      console.log("Geolocation not supported");
    }
  };

  return (
    <div className="p-3 flex max-w-4xl mx-auto gap-4">
      {/* {location ? <p>Your location is : {location}</p> : null} */}
      <input
        name="address"
        placeholder="address"
        className="border p-3 w-full"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleAddress} className="p-3 bg-blue-400">
        allow current location
      </button>
    </div>
  );
}
