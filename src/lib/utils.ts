import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CountdownCallback, CountdownEndCallback } from "./types/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function startFiveMinuteCountdown(
  onTick: CountdownCallback,
  onEnd?: CountdownEndCallback
) {
  let totalSeconds = 5 * 60;

  const interval = setInterval(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    onTick(minutes, seconds);

    if (totalSeconds === 0) {
      clearInterval(interval);
      if (onEnd) onEnd();
    }

    totalSeconds--;
  }, 1000);

  return () => clearInterval(interval); // returns a cleanup function
}
