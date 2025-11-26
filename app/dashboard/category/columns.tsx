"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { DataTableRowActions } from "../../../components/data-table/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomerReportResponse } from "@/services/customer/customerReport";
import { useRouter } from "next/navigation";
import { request } from "@/lib/request";
import { CategoryListResponse } from "@/services/category/categoryList";
import { toast } from "@/components/ui/use-toast";

export function useColumns(
  handleEdit: (category: CategoryListResponse) => void
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
    {
      accessorKey: "imageUrl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: ({ row }) => (
        <div className="max-w-12">
          <img src={row.getValue("imageUrl")} className="w-10 h-10" />
        </div>
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
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("type")}
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
            { label: "Edit", handler: () => handleEdit(row.original) },
            {
              label: "Delete",
              handler: async (id: string) => {
                await request("/api/categories", "DELETE", { id });
                toast({
                  title: "Category Deleted",
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
  ] as ColumnDef<CategoryListResponse>[];
}
