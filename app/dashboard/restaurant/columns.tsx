"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@radix-ui/react-checkbox";
import { RestaurantListResponse } from "@/services/restaurant/restaurantList";
import { useRouter } from "next/navigation";
import { request } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";

export function useColumns(
  handleEdit: (restaurant: RestaurantListResponse) => void
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("name")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    // Email
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("email")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    // Status
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),

      cell: ({ row }) => {
        let isActive = row.getValue("status") == "ACTIVE";
        return (
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span>{isActive ? "Active" : "Inactive"}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          actions={[
            { label: "Edit", handler: () => handleEdit(row.original) },
            {
              label: "Delete",
              handler: async (id: string) => {
                await request("/api/restaurants", "DELETE", { id });

                toast({
                  title: "Restaurant Deleted",
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
  ] as ColumnDef<RestaurantListResponse>[];
}
