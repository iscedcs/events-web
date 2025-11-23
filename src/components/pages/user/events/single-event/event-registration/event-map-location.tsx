"use client";

import { SingleEventProps } from "@/lib/types/event";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Ban } from "lucide-react";
import Link from "next/link";
import React from "react";

interface EventMapLocationProps {
  event: SingleEventProps;
}

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: true,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "on" }],
    },
  ],
};

const EventMapLocation: React.FC<EventMapLocationProps> = React.memo(
  ({ event }) => {
    const mapContainerStyle = {
      height: "200px",
      width: "100%",
    };

    const latitude = Number(event?.latitude);
    const longitude = Number(event?.longitude);
    // const latitude = 6.47903;
    // const longitude = 3.06122;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isNaN(latitude) || isNaN(longitude)) {
      return <p className="text-gray-500">Invalid or missing location data.</p>;
    }

    const center = { lat: latitude, lng: longitude };

    if (
      (event.latitude === 0 && event.longitude === 0) ||
      (event.latitude === null && event.longitude === null)
    ) {
      return (
        <div className=" flex items-center  gap-3 text-accent justify-center">
          <Ban />
          <p>No map to display</p>
        </div>
      );
    }

    // const url = isIOS
    //   ? `http://maps.apple.com/?q=${latitude},${longitude}`
    //   : `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    return (
      <div className=" rounded-[20px] overflow-hidden">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        >
          <Link target="_blank" href={url}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
              options={mapOptions}
            >
              {/* Marker showing event location */}
              <Marker position={center} />
            </GoogleMap>
          </Link>
        </LoadScript>
      </div>
    );
  }
);

EventMapLocation.displayName = "EventMapLocation";

export default EventMapLocation;
