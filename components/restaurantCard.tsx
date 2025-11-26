import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, MapPin, Star } from "lucide-react";
import { BranchCardResponse } from "@/services/branch/branchList";
import { getExpectedDuration } from "@/lib/utils";
import { useEffect } from "react";

export function RestaurantCard({
  restaurant,
}: {
  restaurant: BranchCardResponse;
}) {
  useEffect(() => {
    console.log(restaurant);
  }, []);
  return (
    <a href={`/ui/restaurant/${restaurant.id}`}>
      <Card className="w-full h-full max-w-sm overflow-hidden hover:scale-105 transition-all">
        <div className="relative h-48">
          <img
            src={restaurant.imageUrl ?? "/placeholder.png"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          {/* Coupon Related */}
          <Badge className="absolute top-2 right-2 bg-[#FF6B35] text-white">
            Hot Deal
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{restaurant.name}</h2>
              <p className="text-sm text-muted-foreground">
                {restaurant.categories.join(", ")}
              </p>
            </div>
            {/* TODO: Rating */}
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-bold">
                {(restaurant.rating ?? 0).toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground ml-1"></span>
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span className="mr-3">
              {getExpectedDuration(restaurant.orderCountForNearestSlot, 2, 10)}
            </span>
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {restaurant.distance
                ? Math.round(restaurant.distance) + " km"
                : "---"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col items-start">
          {/* <Badge className="mb-2 bg-green-500 text-white">
            50% OFF MIN ₱100
          </Badge>
          <Badge variant="outline" className="text-green-600">
            Free Pickup
          </Badge> */}
        </CardFooter>
      </Card>
    </a>
  );
}
