import { getFeaturedBranchList } from "@/services/branch/branchList";
import { RestaurantCard } from "@/components/restaurantCard";
import FeaturedRestaurants from "@/components/featuredRestaurants";

export default async function FeaturedSection() {
  const restaurants = await getFeaturedBranchList(4);
  return <FeaturedRestaurants restaurants={restaurants} />;
}
