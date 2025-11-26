"use client";

import { ResponsiveContainer, XAxis, YAxis, BarChart, Bar } from "recharts";
import {
  CalendarIcon,
  CookingPot,
  DollarSign,
  ShoppingBag,
  ShoppingCart,
  Star,
  Users,
  Utensils,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BranchDashboardData } from "@/services/report/managerDashboard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ManagerDashboard({
  dashboardData,
}: {
  dashboardData: BranchDashboardData;
}) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Branch Dashboard</h1>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menus</CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.totalMenus}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.totalOrders}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Order Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.averageOrderValue.toFixed(0)} MMK
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Ratings
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.averageRating.toFixed(1)}/5.0
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Orders within 7 days</CardTitle>
              <CardDescription>
                Total orders placed within the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  orders: {
                    label: "Orders",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.ordersOfLast7Days}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="var(--color-orders)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Popular Items</CardTitle>
              <CardDescription>
                Top 5 most ordered items this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {dashboardData.popularItems.map((item) => (
                  <div className="flex items-center" key={item.name}>
                    <CookingPot className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.orders} orders
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {(
                        (item.orders / dashboardData.totalOrderItems) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest pickup orders placed in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.total.toFixed(2)}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
