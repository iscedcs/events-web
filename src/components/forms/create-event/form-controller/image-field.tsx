"use client";

import { ExternalFieldsProps } from "@/lib/types/event";
import Image from "next/image";
import { useState } from "react";
import { LuImage } from "react-icons/lu";
import { toast } from "sonner";

export default function ImageField({
  onChange,
  value,
  placeholder,
}: ExternalFieldsProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onChange(result.url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error(result.error || "Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while uploading the image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = () => {
    onChange("");
    toast.info("Image removed");
  };

  return (
    <div
      className="bg-secondary relative h-[400px] w-full rounded-[24px] overflow-hidden cursor-pointer"
      onClick={() => document.getElementById("event-image-upload")?.click()}
    >
      {/* Image preview */}
      {value ? (
        <Image
          src={String(value)}
          alt={placeholder || "Uploaded image"}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-white opacity-60">
          {placeholder || "Click to upload image"}
        </div>
      )}

      {/* Upload button */}
      <div className="absolute bottom-3 right-3 bg-white w-[50px] h-[50px] rounded-full flex items-center justify-center">
        <LuImage
          className={`w-[25px] h-[25px] text-secondary ${
            isUploading ? "opacity-50 animate-pulse" : ""
          }`}
        />
        <input
          id="event-image-upload"
          type="file"
          accept="image/*"
          disabled={isUploading}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
      </div>

      {/* Delete button (only shown if image exists) */}
      {value && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteImage();
          }}
          className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 text-xs rounded-md hover:bg-black/70"
        >
          Remove
        </button>
      )}
    </div>
  );
}
