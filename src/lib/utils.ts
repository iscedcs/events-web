import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getAuthInfo } from "../../actions/auth";

const TAILWIND_TEXT_COLORS = [
  "text-red-500",
  "text-orange-500",
  "text-amber-500",
  "text-yellow-500",
  "text-lime-500",
  "text-green-500",
  "text-emerald-500",
  "text-teal-500",
  "text-cyan-500",
  "text-sky-500",
  "text-blue-500",
  "text-indigo-500",
  "text-violet-500",
  "text-purple-500",
  "text-fuchsia-500",
  "text-pink-500",
  "text-rose-500",
];

const TAILWIND_TONES = [400, 500, 600];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenToThree(text: string): string {
  return text.slice(0, 3);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error("Copy failed", error);
    return false;
  }
}

export function isPastDate(pastDateISO: Date): boolean {
  const today = new Date();
  const pastDate = new Date(pastDateISO);

  today.setHours(0, 0, 0, 0);
  pastDate.setHours(0, 0, 0, 0);

  return today > pastDate;
}

export function formatWithCommas(value: number | string): string {
  const numStr = value.toString();

  const [integerPart, decimalPart] = numStr.split(".");

  const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart ? `₦ ${formattedInt}.${decimalPart}` : `₦ ${formattedInt}`;
}

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

export const getRandomTextColor = (name: string): string => {
  const index = hashString(name) % TAILWIND_TEXT_COLORS.length;
  return TAILWIND_TEXT_COLORS[index];
};
