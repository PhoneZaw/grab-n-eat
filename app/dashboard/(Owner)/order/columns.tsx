"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@radix-ui/react-checkbox";
import { request } from "@/lib/request";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { OrderResponse } from "@/services/order/orderRead";
import { parseDateToTimeString } from "@/lib/utils";

export function useColumns(
  orderActions?: {
    label: string;
    handler: (id: string) => void;
  }[]
) {
  const router = useRouter();

  return [
    // Id
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // Name
    {
      accessorKey: "orderCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OrderCode" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("orderCode")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "orderItemCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Items" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("orderItemCount")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    // Branches
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("status")}
        </div>
      ),
    },
    {
      accessorKey: "pickUpSlot",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Slot" />
      ),
      cell: ({ row }) => {
        const pickUpSlot = row.getValue("pickUpSlot") as {
          slotStartTime: Date;
          slotEndTime: Date;
        };
        if (!pickUpSlot) {
          return <div>-</div>;
        }

        const { slotStartTime, slotEndTime } = pickUpSlot;

        return (
          <div className="w-fit min-w-[100px] max-w-[200px]">
            {parseDateToTimeString(slotStartTime)} -{" "}
            {parseDateToTimeString(slotEndTime)}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OrderDate" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {(row.getValue("createdAt") as Date).toLocaleDateString()}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <>
            <DataTableRowActions row={row} actions={orderActions ?? []} />
          </>
        );
      },
    },
  ] as ColumnDef<OrderResponse>[];
}
