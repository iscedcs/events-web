"use client";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

export default function CopyButton({
  text,
  width,
  height,
}: {
  height?: string;
  width?: string;
  text: string;
}) {
  const [copied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const copy = await copyToClipboard(text);
    if (copy) {
      setIsCopied(true);
    } else {
      setIsCopied(false);
    }
  };
  return (
    <div>
      {copied ? (
        <IoCheckmark className={`text-accent w-${width}px h-${height}px`} />
      ) : (
        <FaRegCopy
          onClick={handleCopy}
          className={`text-accent w-${width}px h-${height}px`}
        />
      )}
    </div>
  );
}
