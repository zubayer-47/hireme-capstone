import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CSS_VARIABLES = {
  "--top-nav-bar-height": "3.5rem",
  "--resume-control-bar-height": "3rem",
  "--resume-padding": "1.5rem",
} as const;

export const getPxPerRem = () => {
  const bodyComputedStyle = getComputedStyle(
    document.querySelector("body")!
  ) as any;
  return parseFloat(bodyComputedStyle["font-size"]) || 16;
};