import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Key, LayoutDashboard, User, Store, ShieldCheck } from "lucide-react";
import Link from "next/link";
import CustomerNav from "@/components/customerNav";
import Footer from "@/components/footer";

export default function TesterPage() {
  const accounts = [
    {
      role: "Admin",
      email: "admin@gne.com",
      password: "P@ssword1!!",
      icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
      description: "Platform-wide control, restaurant management, and system configuration.",
      loginUrl: "/auth/dashboard/login",
    },
    {
      role: "Owner",
      email: "owner@pizza.com",
      password: "P@ssword1!!",
      icon: <Store className="w-5 h-5 text-blue-500" />,
      description: "Manage multiple branches, view overall restaurant reports and performance.",
      loginUrl: "/auth/dashboard/login",
    },
    {
      role: "Manager",
      email: "manager@pizza.com",
      password: "password",
      icon: <User className="w-5 h-5 text-green-500" />,
      description: "Handle branch orders, menu availability, and staff management.",
      loginUrl: "/auth/dashboard/login",
    },
    {
      role: "Customer",
      email: "phonezaw@gmail.com",
      password: "P@ssword1!!",
      icon: <User className="w-5 h-5 text-orange-500" />,
      description: "Browse restaurants, place orders, track status, and write reviews.",
      loginUrl: "/auth/login",
    },
  ];

  const routes = [
    { name: "Home / Explore", path: "/", description: "The main landing page for customers." },
    { name: "Restaurant List", path: "/ui/restaurant", description: "Search and browse all available restaurant branches." },
    { name: "Order History", path: "/ui/order-history", description: "View past and active orders (Customer only)." },
    { name: "Admin Dashboard", path: "/dashboard", description: "Main entry point for staff and admins." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFEFEF] to-white">
      <CustomerNav />

      <main className="container mx-auto p-8 max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#004E64] mb-4">QA & Tester Dashboard</h1>
          <p className="text-[#37474F] text-lg max-w-2xl mx-auto">
            Use this page to quickly access different user roles and key sections of the Grab-n-Eat platform.
          </p>
        </div>

        {/* Credentials Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Key className="w-6 h-6 text-[#FF6B35]" />
            <h2 className="text-2xl font-bold text-[#004E64]">Test Accounts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map((account) => (
              <Card key={account.role} className="border-l-4 border-l-[#00A5CF] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {account.icon}
                      <CardTitle className="text-xl">{account.role}</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 uppercase">{account.role}</Badge>
                  </div>
                  <CardDescription className="mt-2">{account.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-md font-mono text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-[#004E64] font-bold">{account.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Password:</span>
                      <span className="text-[#004E64] font-bold">{account.password}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-[#004E64] hover:bg-[#003D4F]" asChild>
                    <Link href={account.loginUrl}>
                      Login as {account.role} <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Routes Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <LayoutDashboard className="w-6 h-6 text-[#FF6B35]" />
            <h2 className="text-2xl font-bold text-[#004E64]">Quick Navigation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {routes.map((route) => (
              <Link href={route.path} key={route.path} className="group">
                <div className="h-full p-6 bg-white rounded-xl border border-gray-200 shadow-sm group-hover:border-[#00A5CF] group-hover:shadow-md transition-all">
                  <h3 className="font-bold text-[#004E64] mb-2 group-hover:text-[#00A5CF] transition-colors">{route.name}</h3>
                  <p className="text-xs text-[#37474F]">{route.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Testing Guide */}
        <section className="bg-[#004E64] text-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Testing Flow Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#00A5CF] mb-2 italic">1. Order Flow</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
                <li>Login as <span className="font-bold">Customer</span></li>
                <li>Go to <span className="font-bold">Home</span>, select a restaurant</li>
                <li>Add items to cart and <span className="font-bold">Checkout</span></li>
                <li>Track order status in real-time</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#00A5CF] mb-2 italic">2. Management Flow</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
                <li>Login as <span className="font-bold">Manager</span></li>
                <li>View the new order in <span className="font-bold">Dashboard</span></li>
                <li>Update status (Preparing → Ready)</li>
                <li>Confirm pickup once customer arrives</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
