"use client";

import { RestaurantCard } from "@/components/restaurantCard";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { getDistanceInKilometer } from "@/lib/utils";
import { BranchCardResponse } from "@/services/branch/branchList";
import { useEffect, useState } from "react";

export default function FeaturedRestaurants({
  restaurants,
}: {
  restaurants: BranchCardResponse[];
}) {
  const [filteredRestaurants, setFilteredRestaurants] =
    useState<BranchCardResponse[]>(restaurants);

  const { location } = useCurrentLocation();

  useEffect(() => {
    if (location) {
      var data = restaurants
        .map((restaurant) => {
          restaurant.distance = getDistanceInKilometer(
            location!.latitude,
            location!.longitude,
            restaurant.latitude,
            restaurant.longitude
          );

          return restaurant;
        })
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

      setFilteredRestaurants(data);
    }
  }, [location]);

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-6 text-[#004E64]">
        Featured Restaurants
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRestaurants.map((restaurant, index) => (
          <RestaurantCard restaurant={restaurant} key={index} />
        ))}
      </div>
    </section>
  );
}
