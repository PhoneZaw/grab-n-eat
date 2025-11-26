"use client";

import useCurrentLocation from "@/hooks/useCurrentLocation";
import { getDistanceInKilometer } from "@/lib/utils";
import { MapPin } from "lucide-react";

export default function DistanceSpan({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const { location } = useCurrentLocation();

  const distance = location
    ? getDistanceInKilometer(
        location.latitude ?? 0,
        location.longitude ?? 0,
        latitude,
        longitude
      )
    : null;

  return (
    <>
      <MapPin className="w-4 h-4 mr-1" />
      <span>
        {}
        {distance ? Math.round(distance) + " km" : "---"}
      </span>
    </>
  );
}
