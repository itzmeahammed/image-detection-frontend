import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  TrafficLayer,
  Marker,
} from "@react-google-maps/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const GoogleMapsTraffic = () => {
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) navigate("/");
  }, []);

  return (
    <LoadScript
      googleMapsApiKey='AIzaSyAp6FDgkn8sn4ejNFfaXi73VdVz6wL-qM8'
      libraries={["visualization"]}
    >
      {location ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={14}
        >
          {/* Traffic Layer */}
          <TrafficLayer />

          {/* Marker for User's Location */}
          <Marker position={location} label='You' />
        </GoogleMap>
      ) : (
        <p>Loading location...</p>
      )}
    </LoadScript>
  );
};

export default GoogleMapsTraffic;
