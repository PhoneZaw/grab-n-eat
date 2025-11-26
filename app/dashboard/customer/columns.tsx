"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { DataTableRowActions } from "../../../components/data-table/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomerReportResponse } from "@/services/customer/customerReport";
import { useRouter } from "next/navigation";
import { request } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";
import { CustomerStatus } from "@prisma/client";

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
    // Order Count
    {
      accessorKey: "orderCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Orders" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[20px] max-w-[200px]">
          {row.getValue("orderCount")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    // CancelOrderCount
    {
      accessorKey: "cancelOrderCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cancelled" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[20px] max-w-[200px]">
          {row.getValue("cancelOrderCount")}
        </div>
      ),
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
              label: "Delete",
              handler: async (id: string) => {
                await request("/api/customers", "DELETE", { id });

                toast({
                  title: "Customer updated",
                });

                setTimeout(() => {
                  router.refresh();
                }, 1000);
              },
            },
            {
              label:
                row.original.status === "ACTIVE" ? "Deactivate" : "Activate",
              handler: async (id: string) => {
                if (row.original.status === "ACTIVE") {
                  await request(`/api/customers/deactivate/${id}`, "PUT");
                } else {
                  await request(`/api/customers/activate/${id}`, "PUT");
                }

                toast({
                  title: "Customer updated",
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
  ] as ColumnDef<CustomerReportResponse>[];
}
