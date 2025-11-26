"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { request } from "@/lib/request";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { OrderReport } from "@/services/report/orderReport";

export function useColumns() {
  const router = useRouter();

  return [
    {
      accessorKey: "orderId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order ID" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "orderDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "orderItems",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Items" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1 min-w-40">
          {(
            row.getValue("orderItems") as {
              name: string;
              quantity: number;
              price: number;
            }[]
          ).map((item) => (
            <div key={item.name} className="flex justify-between">
              <span>
                {item.name} x{item.quantity}
              </span>
            </div>
          ))}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "orderStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "pickupTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pickup Time" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "customerRating",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rating" />
      ),
      enableSorting: true,
    },
  ] as ColumnDef<OrderReport>[];
}
