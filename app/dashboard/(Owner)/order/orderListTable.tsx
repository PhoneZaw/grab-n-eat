"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useColumns } from "./columns";
import { OrderResponse } from "@/services/order/orderRead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderStatus } from "@prisma/client";
import { request } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InvoiceModal from "@/components/invoiceModal";
import { BranchListResponse } from "@/services/branch/branchList";
import BranchDropdown from "@/components/branchDropdown";

export default function OrderListTable({
  orders,
  selectedBranch,
  branches,
}: {
  orders: OrderResponse[];
  selectedBranch: BranchListResponse;
  branches: BranchListResponse[] | null;
}) {
  const orderCounts = orders.reduce((acc, order) => {
    const status = order.status;
    if (!acc[status]) {
      acc[status] = { status, count: 0 };
    }
    acc[status].count += 1;
    return acc;
  }, {} as Record<OrderStatus, { status: OrderStatus; count: number }>);

  const router = useRouter();
  const orderActions = [
    {
      label: "Detail",
      handler: async (id: string) => {
        setSelectedOrderId(id);
      },
    },
    {
      label: "Accept",
      handler: async (id: string) => {
        await request(`/api/order/accept`, "POST", { orderId: id });
        toast({ description: "Order accepted successfully" });
        setTimeout(() => {
          router.refresh();
        }, 1000);
      },
    },
    {
      label: "Reject",
      handler: async (id: string) => {
        await request(`/api/order/reject`, "POST", { orderId: id });
        toast({ description: "Order rejected successfully" });
        setTimeout(() => {
          router.refresh();
        }, 1000);
      },
    },
    {
      label: "Complete",
      handler: async (id: string) => {
        await request(`/api/order/complete`, "POST", { orderId: id });
        toast({ description: "Order is ready to pick" });
        setTimeout(() => {
          router.refresh();
        }, 1000);
      },
    },
  ];

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        </div>
        {branches && (
          <BranchDropdown selectedBranch={selectedBranch} branches={branches} />
        )}
      </div>
      <Tabs defaultValue="new">
        <TabsList>
          <TabsTrigger value="new">
            New ({orderCounts[OrderStatus.ORDERPLACED]?.count || 0})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted ({orderCounts[OrderStatus.PREPARING]?.count || 0})
          </TabsTrigger>
          <TabsTrigger value="ready">
            ReadyToPick ({orderCounts[OrderStatus.READY]?.count || 0})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({orderCounts[OrderStatus.PICKED]?.count || 0})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({orderCounts[OrderStatus.REJECTED]?.count || 0})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <DataTable
            data={orders.filter((o) => o.status == OrderStatus.ORDERPLACED)}
            columns={useColumns(
              orderActions.filter(
                (a) =>
                  a.label == "Accept" ||
                  a.label == "Reject" ||
                  a.label == "Detail"
              )
            )}
          />
        </TabsContent>
        <TabsContent value="accepted">
          <DataTable
            data={orders.filter((o) => o.status == OrderStatus.PREPARING)}
            columns={useColumns(
              orderActions.filter(
                (a) => a.label == "Complete" || a.label == "Detail"
              )
            )}
          />
        </TabsContent>
        <TabsContent value="ready">
          <DataTable
            data={orders.filter((o) => o.status == OrderStatus.READY)}
            columns={useColumns(
              orderActions.filter((a) => a.label == "Detail")
            )}
          />
        </TabsContent>
        <TabsContent value="completed">
          <DataTable
            data={orders.filter((o) => o.status == OrderStatus.PICKED)}
            columns={useColumns(
              orderActions.filter((a) => a.label == "Detail")
            )}
          />
        </TabsContent>
        <TabsContent value="rejected">
          <DataTable
            data={orders.filter((o) => o.status == OrderStatus.REJECTED)}
            columns={useColumns(
              orderActions.filter((a) => a.label == "Detail")
            )}
          />
        </TabsContent>
      </Tabs>
      {selectedOrderId && (
        <InvoiceModal
          order={orders.find((o) => o.id == selectedOrderId)}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
        />
      )}
    </>
  );
}
