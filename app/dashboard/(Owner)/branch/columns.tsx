"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@radix-ui/react-checkbox";
import { BranchListResponse } from "@/services/branch/branchList";
import { useRouter } from "next/navigation";
import { request } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";
import { BranchUpdateRequest } from "@/services/branch/branchUpdate";
import { fa } from "@faker-js/faker";

export function useColumns(handleEdit: (branch: BranchUpdateRequest) => void) {
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
    {
      accessorKey: "imageUrl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: ({ row }) => (
        <img src={row.getValue("imageUrl")} className="w-10 h-10" />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("description")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    // Address
    {
      accessorKey: "fullAddress",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("fullAddress")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    // Lat, Long Id
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
      enableSorting: true,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: "Edit",
              handler: () =>
                handleEdit({
                  ...row.original,
                  latitude: row.original.latitude.toString(),
                  longitude: row.original.longitude.toString(),
                }),
            },
            {
              label: "Delete",
              handler: async (id: string) => {
                await request("/api/branches", "DELETE", { id });

                toast({
                  title: "Branch Deleted",
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
  ] as ColumnDef<BranchListResponse>[];
}
