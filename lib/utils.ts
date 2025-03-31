import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateMiddle(
  text: string,
  startChars: number = 4,
  endChars: number = 4
): string {
  if (text.length <= startChars + endChars) {
    return text; // No truncation needed
  }
  return `${text.slice(0, startChars)}...${text.slice(-endChars)}`;
}
