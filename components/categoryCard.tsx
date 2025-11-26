import { CategoryListResponse } from "@/services/category/categoryList";

export default function CategoryCard({
  category,
}: {
  category: CategoryListResponse;
}) {
  return (
    <div className="text-center">
      <img
        src={category.imageUrl ?? "/placeholder-square.svg"}
        alt={category.name}
        className="w-20 h-20 mx-auto rounded-full mb-2 border-2 border-[#00A5CF]"
      />
      <p className="text-sm font-medium text-[#37474F]">{category.name}</p>
    </div>
  );
}
