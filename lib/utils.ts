import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDateToTimeString(d: Date | undefined, isStandard = true) {
  if (!d) return "";
  var dateObj = new Date(d);
  return (
    (isStandard
      ? dateObj.getHours().toString().padStart(2, "0")
      : dateObj.getHours()) +
    ":" +
    dateObj.getMinutes().toString().padStart(2, "0")
  );
}

export function parseDateToDayTimeString(
  d: Date | undefined,
  isStandard = true
) {
  if (!d) return "";
  var dateObj = new Date(d);
  const hours = isStandard
    ? dateObj.getHours().toString().padStart(2, "0")
    : dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const period = isStandard ? (dateObj.getHours() >= 12 ? "PM" : "AM") : "";
  const formattedHours = isStandard
    ? (dateObj.getHours() % 12 || 12).toString().padStart(2, "0")
    : hours;

  return `${formattedHours}:${minutes} ${period}`.trim();
}

export function getTodayMinutes(d: Date): number {
  return d.getHours() * 60 + d.getMinutes();
}

export function parseTimeStringToDate(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();

  // Set hours and minutes on the current date
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0); // Optional: reset seconds to zero
  date.setMilliseconds(0); // Optional: reset milliseconds to zero

  return date;
}

export function parseDateToReadableDateTimeString(d: Date | undefined) {
  if (!d) return "";
  var dateObj = new Date(d);
  return `${format(dateObj, "dd/MM/yyyy hh:mm a")} `;
}

export function getDayOfWeek(date: Date) {
  const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  return daysOfWeek[date.getDay()];
}

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace("_", " ")
    .replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
}

export function getDistanceInKilometer(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

export function getExpectedDuration(
  orderCount: number,
  paralledOrderCount: number,
  durationInMinutes: number
): string {
  const minimumMinutes = Math.max(
    (orderCount % paralledOrderCount) * durationInMinutes,
    durationInMinutes
  );

  // 25 - 40 min
  return `${minimumMinutes} - ${minimumMinutes + durationInMinutes} min`;
}

export function generateUID() {
  var firstRandom = (Math.random() * 46656) | 0;
  var secondRandom = (Math.random() * 46656) | 0;
  var firstPart = ("000" + firstRandom.toString(36)).slice(-3);
  var secondPart = ("000" + secondRandom.toString(36)).slice(-3);
  return firstPart + secondPart;
}
