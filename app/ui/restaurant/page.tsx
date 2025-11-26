import RestaurantList from "./restaurantList";
import {
  getFeaturedBranchList,
  searchBranches,
} from "@/services/branch/branchList";
import { getCategoryList } from "@/services/category/categoryList";

export default async function Restaurant({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  var search = searchParams["search"] as string | undefined;

  var category = searchParams["category"] as string | undefined;

  console.log("Search", search);
  var restaurants;

  if (!search) {
    console.log("Getting featured branches");
    restaurants = await getFeaturedBranchList();
  } else {
    console.log("Searching branches for ", search);
    restaurants = await searchBranches(search);
  }

  var categories = await getCategoryList();

  console.log(restaurants);
  return (
    <RestaurantList
      restaurants={restaurants}
      categories={categories}
      selectedCategory={category}
      searchValue={search}
    />
  );
}
