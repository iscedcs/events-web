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

export default function LocationField({
  onChange,
  placeholder,
  value,
}: {
  onChange: (address: string, lat?: number, lng?: number) => void;
  placeholder?: string;
  value?: string;
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [service, setService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      setService(new google.maps.places.AutocompleteService());
    }
  }, [isLoaded]);

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

  const handleSelect = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    const placeId = prediction.place_id;
    setInputValue(prediction.description);
    setSuggestions([]);

    const detailsService = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    detailsService.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();
        onChange(prediction.description, lat, lng);
      } else {
        onChange(prediction.description);
      }
    });
  };

  // if (!isLoaded) return <p>Loading Google Maps...</p>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-[20px] cursor-pointer">
          <div className="bg-secondary rounded-[12px] py-[20px] px-[15px]">
            <div className="flex items-center gap-3">
              <FaLocationDot className="text-accent w-[20px] h-[20px]" />
              <div>
                <p>Add Event Location</p>
                <p className="text-accent text-sm">
                  Offline location or virtual link
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="border-0 p-[13px] bg-secondary">
        <DialogTitle hidden>Content</DialogTitle>

        <div className="relative mt-[10px]">
          <p>Event Location</p>
          <Input
            className="bg-[#151515] mt-[10px] rounded-[8px] py-[20px] px-[20px]"
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
          />

          {suggestions.length > 0 && (
            <ul className=" bg-[#1e1e1e] border border-accent rounded-[12px] mt-2 max-h-56 overflow-auto z-50">
              {suggestions.map((s) => (
                <li
                  key={s.place_id}
                  className="px-4 py-2  hover:bg-secondary text-[14px] flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                  onClick={() => handleSelect(s)}
                >
                  <MapPin className=" w-4 h-4 text-accent" />
                  <p className=" w-full">{s.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
