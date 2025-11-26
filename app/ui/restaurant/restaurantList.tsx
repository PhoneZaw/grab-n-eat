"use client";

import React, { useEffect, useState } from "react";
import { CategoryListResponse } from "@/services/category/categoryList";
import { BranchCardResponse } from "@/services/branch/branchList";
import { RestaurantCard } from "@/components/restaurantCard";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { getDistanceInKilometer } from "@/lib/utils";
import SearchBox from "@/components/searchBox";
import { Loader2, X } from "lucide-react";

const sortModes = ["Relevance", "Top rated", "Distance"];

export default function RestaurantList({
  restaurants,
  categories,
  selectedCategory,
  searchValue,
}: {
  restaurants: BranchCardResponse[];
  categories: CategoryListResponse[];
  selectedCategory: string | undefined;
  searchValue: string | undefined;
}) {
  var [filteredRestaurants, setFilteredRestaurants] = useState<
    BranchCardResponse[]
  >([]);

  var { location } = useCurrentLocation();

  const [sortBy, setSortBy] = useState(sortModes[0]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    selectedCategory ? [selectedCategory] : []
  );

  const [loading, setLoading] = useState(false);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var value = event.target.value;

    if (selectedCategories.includes(value)) {
      setSelectedCategories((prev) => prev.filter((name) => name !== value));
    } else {
      setSelectedCategories((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    if (location) {
      setLoading(true);

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

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [location]);

  useEffect(() => {
    setLoading(true);
    if (sortBy === "Distance") {
      setFilteredRestaurants((prev) =>
        prev.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
      );
    } else if (sortBy === "Top rated") {
      setFilteredRestaurants((prev) =>
        prev.sort((a, b) => b.rating - a.rating)
      );
    } else {
      setFilteredRestaurants((prev) => prev);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [sortBy]);

  useEffect(() => {
    setLoading(true);
    if (selectedCategories.length > 0) {
      setFilteredRestaurants((prev) =>
        prev.filter((restaurant) =>
          restaurant.categories.some((category) =>
            selectedCategories.includes(category)
          )
        )
      );
    } else {
      setFilteredRestaurants(restaurants);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [selectedCategories]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8 flex">
        <aside className="w-64 pr-8">
          <h2 className="font-bold text-lg mb-4 mt-10">Filters</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Sort by</h3>
              <div className="space-y-2">
                {sortModes.map((mode, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value={mode}
                      checked={sortBy === mode}
                      onChange={handleSortChange}
                      className="form-radio text-pink-500"
                    />
                    <span className="ml-2">{mode}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cuisines</h3>
              <div className="mt-2 space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      value={category.name}
                      checked={selectedCategories.includes(category.name)}
                      onChange={handleCategoryChange}
                      className="form-checkbox text-pink-500"
                    />
                    <span className="ml-2">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <section className="mb-8">
            <SearchBox large searchValue={searchValue} />
          </section>

          <section className="mb-16">
            <div className="flex items-center gap-6 mb-6">
              <h3 className="text-2xl font-semibold text-[#004E64]">
                Restaurants
              </h3>
              <div className="flex space-x-2">
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center px-3 py-1 border bg-white rounded-full text-sm"
                  >
                    <span>{category}</span>
                    <button
                      onClick={() =>
                        setSelectedCategories((prev) =>
                          prev.filter((name) => name !== category)
                        )
                      }
                      className="ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    Loading...
                  </h2>
                  <p className="text-muted-foreground">
                    Please wait while we fetch your content.
                  </p>
                </div>
                <div className="mt-8 space-y-4 w-full max-w-md">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants &&
                  filteredRestaurants.map((restaurant, index) => (
                    <RestaurantCard restaurant={restaurant} key={index} />
                  ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
