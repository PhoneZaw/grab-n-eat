import db from "@/lib/db";

export type FooterData = {
  title: string;
  data: FooterDataItem[];
};

type FooterDataItem = {
  name: string;
  url: string;
};

export async function getFooterData(): Promise<FooterData[]> {
  // Get active restaurants for the Restaurants section
  const restaurants = await db.branch.findMany({
    where: { status: "ACTIVE" },
    select: {
      name: true,
      id: true,
    },
  });

  const categories = await db.category.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  const footerSections: FooterData[] = [
    {
      title: "Popular Restaurants",
      data:
        restaurants.map((restaurant) => ({
          name: restaurant.name,
          url: `/ui/restaurant/${restaurant.id}`,
        })) || [],
    },
    {
      title: "Popular Cuisines",
      data:
        categories.map((category) => ({
          name: category.name,
          url: `#`,
        })) || [],
    },
    {
      title: "Support",
      data: [
        { name: "FAQs", url: "/ui/faqs" },
        { name: "Terms & Policy", url: "/ui/terms" },
        { name: "Business with Us", url: "/dashboard" },
      ],
    },
  ];

  return footerSections;
}
