import { Metadata } from "next";
import CategoryList from "./categoryList";
import { getCategoryList } from "@/services/category/categoryList";
import { getAuth } from "@/lib/getSession";

export const meta: Metadata = {
  title: "Category",
};

export default async function Category() {
  const user = await getAuth(["ADMIN"], "/dashboard/category");

  const categories = await getCategoryList();

  return <CategoryList categories={categories}></CategoryList>;
}
