"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { DataTableRowActions } from "../../../components/data-table/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { request } from "@/lib/request";
import { CouponResponse } from "@/services/coupon/readCoupon";
import { toast } from "@/components/ui/use-toast";

export function useColumns(handleEdit: (coupon: CouponResponse) => void) {
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
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("code")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "discountPercentage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Percentage" />
      ),
      cell: ({ row }) => (
        <div className="">{row.getValue("discountPercentage")}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "usedCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Used Count" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("usedCount")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "expiryDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ExpiryDate" />
      ),
      cell: ({ row }) => (
        <div className="">
          {(row.getValue("expiryDate") as Date).toLocaleDateString()}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: ({ row }) => {
        let status = row.getValue("isActive") as boolean;
        return (
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                status ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span>{status ? "Active" : "Inactive"}</span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: row.original.isActive ? "Deactivate" : "Activate",
              handler: async (id: string) => {
                if (row.original.isActive) {
                  await request(`/api/coupons/deactivate/${id}`, "PUT");
                } else {
                  await request(`/api/coupons/activate/${id}`, "PUT");
                }

                toast({
                  title: "Coupon updated",
                });

                setTimeout(() => {
                  router.refresh();
                }, 1000);
              },
            },
            {
              label: "Delete",
              handler: async (id: string) => {
                await request("/api/coupons", "DELETE", { id });
                toast({
                  title: "Coupon Deleted",
                });

                setTimeout(() => {
                  router.refresh();
                }, 1000);
              },
            },
          ]}
        />
      ),
    },
  ] as ColumnDef<CouponResponse>[];
}
