"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";
import { ReviewResponse } from "@/services/review/getReview";

export function useColumns() {
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
    // Customer
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Name" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {(row.getValue("customer") as { name: string }).name}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    // Review
    {
      accessorKey: "rating",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rating" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("rating")}
        </div>
      ),
    },
    // Comment
    {
      accessorKey: "comment",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Comment" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("comment")}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // CreatedAt
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ReviewDate" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {(row.getValue("createdAt") as Date).toLocaleDateString()}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
  ] as ColumnDef<ReviewResponse>[];
}
