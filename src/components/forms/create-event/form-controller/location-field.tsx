"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLoadScript } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

const libraries: "places"[] = ["places"];

interface LocationValue {
  address: string;
  lat?: number;
  lng?: number;
  town?: string;
}

interface LocationFieldProps {
  onChange: (value: LocationValue) => void;
  placeholder?: string;
  value?: LocationValue | string;
}

export default function LocationField({
  onChange,
  placeholder,
  value,
}: LocationFieldProps) {
  const [service, setService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [inputValue, setInputValue] = useState<string>(
    typeof value === "object" && value !== null ? value.address : value || ""
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  // Initialize autocomplete service once Google Maps is loaded
  useEffect(() => {
    if (isLoaded && window.google) {
      setService(new google.maps.places.AutocompleteService());
    }
  }, [isLoaded]);

  // Handle manual typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (!service || newValue.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    service.getPlacePredictions({ input: newValue }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions);
      } else {
        setSuggestions([]);
      }
    });
  };

  // Handle selecting a suggested location
  const handleSelect = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    const placeId = prediction.place_id;
    const description = prediction.description;
    setInputValue(description);
    setSuggestions([]);

    const detailsService = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    detailsService.getDetails(
      {
        placeId,
        fields: ["address_components", "geometry", "formatted_address"],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const lat = place.geometry?.location?.lat();
          const lng = place.geometry?.location?.lng();

          // Extract the town/city
          let town = "";
          if (place.address_components) {
            const locality = place.address_components.find((component) =>
              component.types.includes("locality")
            );
            const adminArea2 = place.address_components.find((component) =>
              component.types.includes("administrative_area_level_2")
            );

            town = locality?.long_name || adminArea2?.long_name || "";
          }

          // Update parent form or state
          onChange({
            address: description,
            lat,
            lng,
            town,
          });

          console.log("Selected Town:", town);
        } else {
          onChange({
            address: description,
          });
        }
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-[20px] cursor-pointer">
          <div className="bg-secondary rounded-[12px] py-[20px] px-[15px]">
            <div className="flex items-center gap-3">
              <FaLocationDot className="text-accent w-[20px] h-[20px]" />
              <div className="w-[250px]">
                <p className="truncate">
                  {inputValue ? inputValue : "Add Event Location"}
                </p>
                <p className="text-accent text-sm">
                  Offline location or virtual link
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="border-0 p-[13px] bg-secondary">
        <DialogTitle hidden>Choose Event Location</DialogTitle>

        <div className="relative mt-[10px]">
          <p className="text-white mb-2">Event Location</p>

          <Input
            className="bg-[#151515] rounded-[8px] py-[20px] px-[20px] text-white"
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
          />

          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-[#1e1e1e] border border-accent rounded-[12px] mt-2 max-h-56 overflow-auto z-50">
              {suggestions.map((s) => (
                <li
                  key={s.place_id}
                  className="px-4 py-2 hover:bg-secondary text-[14px] flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                  onClick={() => handleSelect(s)}
                >
                  <MapPin className="w-4 h-4 text-accent" />
                  <p className="w-full truncate">{s.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
