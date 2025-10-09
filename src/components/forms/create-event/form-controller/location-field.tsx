import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LocationFieldsProps } from "@/lib/types/event";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";

const libraries: "places"[] = ["places"];
export default function LocationField({
  onChange,
  placeholder,
  value,
}: LocationFieldsProps) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place || !place.geometry) return;

    const location = place.formatted_address || place.name || "";
    const lat = place.geometry.location?.lat()!;
    const lng = place.geometry.location?.lng()!;
    onChange(location, lat, lng);
  };

  if (!isLoaded) return <p>Loading...</p>;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className=" mt-[20px]">
            <div className=" bg-secondary rounded-[12px] py-[20px] px-[15px]">
              <div className=" flex items-center gap-3  ">
                <FaLocationDot className=" text-accent w-[20px] h-[20px]" />
                <div className="">
                  <p>Add Event Location</p>
                  <p className=" text-accent">
                    Offline location or virtual link
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" border-0 bg-secondary">
          <DialogTitle hidden>Content</DialogTitle>
          <div className="">
            <p>Location</p>

            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Input
                className="bg-[#151515] mt-[10px] rounded-[8px] py-[20px] px-[20px]"
                type="text"
                placeholder={placeholder}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
              />
            </Autocomplete>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
