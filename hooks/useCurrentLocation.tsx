import { useState, useEffect } from "react";

export interface Location {
  latitude: number;
  longitude: number;
}

const useCurrentLocation = (withName: boolean = false) => {
  const [locationName, setLocationName] = useState<string>();

  const [location, setLocation] = useState<Location | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location && withName) {
      console.log("fetching location name api");
      fetchApiData(location);
    }
  }, [location]);

  return { location, locationName, loading, error };
};

export const fetchApiData = async ({
  latitude,
  longitude,
}: Location): Promise<string> => {
  console.log("fetching location name api");
  const res = await fetch(
    `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=66ebe4f0470a6248741213kwmd3b806`
  );
  const data = await res.json();

  console.log("LocationData : ", data);
  return data.display_name;
};

export default useCurrentLocation;
