import { ArrowRight, UtensilsCrossed, Clock, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CustomerNav from "@/components/customerNav";
import Footer from "@/components/footer";
import { Suspense } from "react";
import FeaturedSection from "./sections/featured-section";
import CuisineSection from "./sections/cuisine-section";
import SearchBox from "@/components/searchBox";
import { RestaurantSkeleton } from "@/components/restaurantCard";
import { CategorySkeleton } from "@/components/categoryCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFEFEF] to-white">
      <CustomerNav />

      <main className="container mx-auto p-4">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold mb-4 text-[#004E64]">
            Delicious food, delivered to you
          </h2>
          <p className="text-xl mb-8 text-[#37474F]">
            Choose from thousands of restaurants and get your favorite meals
            delivered straight to your door.
          </p>
          <div className="flex justify-center">
            <SearchBox />
          </div>
        </section>

        {/* Featured Restaurants with Suspense */}
        <Suspense fallback={<FeaturedLoadingSkeleton />}>
          <FeaturedSection />
        </Suspense>

        {/* Cuisine Categories with Suspense */}
        <Suspense fallback={<CuisineLoadingSkeleton />}>
          <CuisineSection />
        </Suspense>

        {/* How It Works */}
        <section className="mb-16 bg-white rounded-lg shadow-md p-8 border border-[#00A5CF]">
          <h3 className="text-2xl font-semibold mb-6 text-center text-[#004E64]">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 text-[#FF6B35]" />
              <h4 className="text-xl font-semibold mb-2 text-[#004E64]">
                Choose Your Meal
              </h4>
              <p className="text-[#37474F]">
                Browse through our extensive list of restaurants and cuisines
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-[#FF6B35]" />
              <h4 className="text-xl font-semibold mb-2 text-[#004E64]">
                Place Your Order
              </h4>
              <p className="text-[#37474F]">
                Customize your meal and place your order with just a few taps
              </p>
            </div>
            <div className="text-center">
              <Bike className="w-12 h-12 mx-auto mb-4 text-[#FF6B35]" />
              <h4 className="text-xl font-semibold mb-2 text-[#004E64]">
                Get Your Food
              </h4>
              <p className="text-[#37474F]">
                Get your food without additional fee
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-[#004E64] rounded-lg text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to order?</h3>
          <p className="text-xl mb-8">
            Get your favorite food ready to pick in minutes!
          </p>
          <Button
            size="lg"
            className="bg-[#FF6B35] text-white hover:bg-[#E85A2A]"
            asChild
          >
            <Link href="/ui/restaurant">
              Order Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeaturedLoadingSkeleton() {
  return (
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-6 text-[#004E64]">
        Featured Restaurants
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <RestaurantSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

function CuisineLoadingSkeleton() {
  return (
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-6 text-[#004E64]">
        Explore Cuisines
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
