"use client";
import React, { useEffect, useState } from "react";
import { Star, Clock, MapPin, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Cart from "./cart";
import { BranchDetailResponse } from "@/services/branch/branchList";
import MenuCard from "@/components/menuCard";
import { useRestaurantCart } from "@/hooks/useLocalStorage";
import {
  getDayOfWeek,
  getDistanceInKilometer,
  getTodayMinutes,
  parseDateToTimeString,
} from "@/lib/utils";
import { Location } from "@/hooks/useCurrentLocation";

export default function RestaurantDetail({
  restaurant,
  customerId,
}: {
  restaurant: BranchDetailResponse;
  customerId: string;
}) {
  const [modifiedRestaurant, setModifiedRestaurant] = useState(restaurant);

  const [location, setLocation] = useState<Location | undefined>();

  if (typeof window !== "undefined" && navigator) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }

  useEffect(() => {
    if (location) {
      restaurant.distance = getDistanceInKilometer(
        location!.latitude,
        location!.longitude,
        restaurant.latitude,
        restaurant.longitude
      );

      setModifiedRestaurant(restaurant);
    }
  }, [location]);

  const { cart, addItemQuantity, removeItemQuantity, clearItems, setCart } =
    useRestaurantCart(restaurant.id);

  if (cart.restaurantId !== restaurant.id) {
    const userConfirmed = confirm("Do you want to change restaurant?");

    if (!userConfirmed) {
      window.history.back();
    }

    setCart({
      restaurantId: restaurant.id,
      items: [],
    });
  }

  const openTime = restaurant.openHours.find(
    (openHour) => openHour.day === getDayOfWeek(new Date())
  )?.startTime;

  const closeTime = restaurant.openHours.find(
    (openHour) => openHour.day === getDayOfWeek(new Date())
  )?.endTime;

  const isOpening =
    closeTime &&
    openTime &&
    getTodayMinutes(closeTime) > getTodayMinutes(new Date()) &&
    getTodayMinutes(openTime) < getTodayMinutes(new Date());

  const averageRating =
    restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) /
    restaurant.reviews.length;

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="mb-4"></div>

      <div className="flex items-start gap-4 mb-6">
        <img
          src={modifiedRestaurant.imageUrl ?? "/placeholder.png"}
          alt={modifiedRestaurant.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{modifiedRestaurant.name}</h1>
          <p className="text-muted-foreground">
            {modifiedRestaurant.categories.join(" · ")}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <span className="font-medium">{averageRating.toFixed(1)}/5</span>
            <span className="text-muted-foreground">
              ({modifiedRestaurant.reviews.length})
            </span>
            <a href="#" className="text-blue-600 hover:underline">
              See reviews
            </a>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5 text-blue-600" />
              Open Hours - {parseDateToTimeString(openTime)} -{" "}
              {parseDateToTimeString(closeTime)}
              <span className="font-medium ml-4 text-red-600">
                {isOpening ? "" : "Closed"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-1">
          <MapPin className="w-5 h-5 text-green-600" />
          <span className="font-medium">{modifiedRestaurant.address}</span>
          <div className="bg-black h-1 w-1 rounded-full mx-1"></div>

          <span className="font-medium">
            {modifiedRestaurant.distance?.toFixed(2)} km
          </span>

          <div className="bg-black h-1 w-1 rounded-full mx-1"></div>
          <a
            href={`http://maps.google.com/maps?z=12&t=m&q=loc:${modifiedRestaurant.latitude}+${modifiedRestaurant.longitude}`}
            className="text-blue-600 underline"
          >
            Open in Maps
          </a>
        </div>
      </div>

      <div className="flex justify-start items-center gap-6 mb-6">
        {modifiedRestaurant.coupons.length > 0 &&
          modifiedRestaurant.coupons.slice(0, 3).map((coupon) => (
            <Card key={coupon.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-rose-600">
                  {coupon.discountPercentage}% off ({coupon.code})
                </h3>
                <div className="flex items-center gap-2">
                  <span className="">
                    End in {new Date(coupon.expiryDate).toLocaleDateString()}{" "}
                  </span>
                  <span className="text-sm"> - Use in checkout</span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Menu</h2>
          <div className="relative">
            <input
              type="search"
              placeholder="Search in menu"
              className="pl-8 pr-4 py-2 border rounded-md"
            />
            <svg
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {modifiedRestaurant.categories.map((category) => (
            <Button key={category} variant="outline">
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-start gap-8">
        <div className="grid gap-4 flex-1 xl:grid-cols-2">
          {modifiedRestaurant.menus
            .filter((m) => m.isActive)
            .map((menu) => (
              <MenuCard
                key={menu.id}
                menu={menu}
                itemQuantities={cart.items}
                addItemQuantities={addItemQuantity}
                removeItemQuantities={removeItemQuantity}
              />
            ))}
        </div>
        <div>
          <Cart
            restaurant={modifiedRestaurant}
            cart={cart}
            addItemQuantities={addItemQuantity}
            removeItemQuantities={removeItemQuantity}
            clearItems={clearItems}
            customerId={customerId}
            isOpenHours={isOpening}
          />
        </div>
      </div>
    </div>
  );
}
