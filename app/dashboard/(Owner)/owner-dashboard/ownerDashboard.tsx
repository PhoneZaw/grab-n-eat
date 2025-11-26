"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CalendarIcon,
  CookingPot,
  DollarSign,
  MapPin,
  ShoppingBag,
  ShoppingCart,
  Store,
  TicketPercent,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantDashboardData } from "@/services/report/ownerDashboard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function OwnerDashboard({
  dashboardData,
}: {
  dashboardData: RestaurantDashboardData;
}) {
  const branchOrdersData = dashboardData.branchOrders.reduce(
    (acc: { day: string; [key: string]: any }[], branch) => {
      branch.orders.forEach((order) => {
        const existingDay = acc.find((item) => item.day === order.day);
        if (existingDay) {
          existingDay[branch.name] = order.orders;
        } else {
          acc.push({ day: order.day, [branch.name]: order.orders as number });
        }
      });
      return acc;
    },
    []
  );

  const ChartConfig = dashboardData.branchOrders.reduce(
    (acc: { [key: string]: { label: string; color: string } }, branch) => {
      acc[branch.name] = {
        label: branch.name,
        color: COLORS[dashboardData.branchOrders.indexOf(branch)],
      };
      return acc;
    },
    {}
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Branches</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData.totalBranches}
                </div>
              </CardContent>
            </Card>
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
                <CardTitle className="text-sm font-medium">
                  Active Coupons
                </CardTitle>
                <TicketPercent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData.activeCoupons}
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
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Branch Orders Over Time</CardTitle>
                <CardDescription>
                  Orders placed at each branch over the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={ChartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={branchOrdersData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      {dashboardData.branchOrders &&
                        dashboardData.branchOrders.map((branch) => (
                          <Line
                            key={branch.name}
                            type="monotone"
                            dataKey={branch.name}
                            stroke={ChartConfig[branch.name].color}
                          />
                        ))}
                    </LineChart>
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
                    <TableHead>Order Code</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Branch</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.recentOrders.map((order) => (
                    <TableRow key={order.code}>
                      <TableCell className="font-medium">
                        {order.code}
                      </TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.branch}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
