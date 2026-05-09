import { CategoryListResponse } from "@/services/category/categoryList";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategoryCard({
  category,
}: {
  category: CategoryListResponse;
}) {
  return (
    <div className="text-center group">
      <div className="relative w-20 h-20 mx-auto mb-2 overflow-hidden rounded-full border-2 border-[#00A5CF] group-hover:scale-110 transition-transform">
        <img
          src={category.imageUrl ?? "/placeholder-square.svg"}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm font-medium text-[#37474F] group-hover:text-[#004E64] transition-colors">
        {category.name}
      </p>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-2 overflow-hidden rounded-full border-2 border-gray-100">
        <Skeleton circle height="100%" />
      </div>
      <Skeleton width="60%" height={16} />
    </div>
  );
}
