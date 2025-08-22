"use client";

import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function BackButton({ className }: { className: string }) {
  const router = useRouter();
  return (
    <div>
      <MdArrowBack
        className={`${className}`}
        onClick={() => {
          router.back();
        }}
      />
    </div>
  );
}
