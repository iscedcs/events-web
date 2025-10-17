"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { SingleEventProps } from "@/lib/types/event";
import { Ban, Locate } from "lucide-react";

interface EventMapLocationProps {
  event: SingleEventProps;
}

const mapOptions = {
  disableDefaultUI: true, // hides all default controls
  zoomControl: false, // hides zoom control buttons
  streetViewControl: true,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "on" }], // hides all text labels
    },
  ],
};

const EventMapLocation: React.FC<EventMapLocationProps> = React.memo(
  ({ event }) => {
    const mapContainerStyle = {
      height: "200px",
      width: "100%",
    };

    // Safely convert lat/lng to numbers
    const latitude = Number(event?.latitude);
    const longitude = Number(event?.longitude);
    // const latitude = 6.47903;
    // const longitude = 3.06122;

    // Validate coordinates
    if (isNaN(latitude) || isNaN(longitude)) {
      return <p className="text-gray-500">Invalid or missing location data.</p>;
    }

    const center = { lat: latitude, lng: longitude };

    if (
      (event.latitude === "0" && event.longitude === "0") ||
      (event.latitude === null && event.longitude === null)
    ) {
      return (
        <div className=" flex items-center  gap-3 text-accent justify-center">
          <Ban />
          <p>No Map to Display</p>
        </div>
      );
    }
    return (
      <div className=" rounded-[20px] overflow-hidden">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            options={mapOptions}
          >
            {/* Marker showing event location */}
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
);

EventMapLocation.displayName = "EventMapLocation";

export default EventMapLocation;
