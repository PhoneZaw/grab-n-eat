import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, MapPin, Star } from "lucide-react";
import { BranchCardResponse } from "@/services/branch/branchList";
import { getExpectedDuration } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function RestaurantCard({
  restaurant,
}: {
  restaurant: BranchCardResponse;
}) {
  return (
    <a href={`/ui/restaurant/${restaurant.id}`}>
      <Card className="w-full h-full max-w-sm overflow-hidden hover:scale-105 transition-all">
        <div className="relative h-48">
          <img
            src={restaurant.imageUrl ?? "/placeholder.png"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
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
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-bold">
                {(restaurant.rating ?? 0).toFixed(1)}
              </span>
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
      </Card>
    </a>
  );
}

export function RestaurantSkeleton() {
  return (
    <Card className="w-full h-full max-w-sm overflow-hidden">
      <div className="h-48">
        <Skeleton height="100%" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="w-3/4">
            <Skeleton width="80%" height={24} />
            <Skeleton width="60%" height={16} />
          </div>
          <div className="w-1/4 flex justify-end">
            <Skeleton width={30} height={20} />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <Skeleton width={100} height={16} />
          <div className="mx-2" />
          <Skeleton width={60} height={16} />
        </div>
      </CardContent>
    </Card>
  );
}
