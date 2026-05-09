import Link from "next/link";
import CategoryCard from "@/components/categoryCard";
import { getFeaturedCuisines } from "@/services/category/categoryList";

export default async function CuisineSection() {
  const cuisines = await getFeaturedCuisines(6);

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-6 text-[#004E64]">
        Explore Cuisines
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {cuisines.map((cuisine) => (
          <Link
            key={cuisine.id}
            href={`/ui/restaurant?category=${cuisine.name}`}
          >
            <CategoryCard category={cuisine} />
          </Link>
        ))}
      </div>
    </section>
  );
}
