"use client";

import useCurrentLocation, { fetchApiData } from "@/hooks/useCurrentLocation";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserLocation() {
  const { location } = useCurrentLocation();

  const [locationName, setLocationName] = useState<string>();

  useEffect(() => {
    if (location) {
      fetchApiData(location).then((data) => {
        setLocationName(data);
      });
    }
  }, [location]);

  return (
    <button className="flex items-center space-x-2">
      <MapPin className="w-4 h-4" />
      <span className="text-sm">
        {locationName
          ? locationName.slice(0, 40) + "..."
          : "No Location Access"}
        {/* {location ? location.latitude : "No Location Access"} */}
      </span>
    </button>
  );
}
