"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@radix-ui/react-checkbox";
import { MenuListResponse } from "@/services/menu/menuList";
import { request } from "@/lib/request";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function useColumns(handleEdit: (menu: MenuListResponse) => void) {
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
    // Description
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
    // Categories
    {
      accessorKey: "menuCategories",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Categories" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {(row.getValue("menuCategories") as string[]).join(", ")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    // Branches
    {
      accessorKey: "branches",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branches" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {(row.getValue("branches") as string[]).join(", ")}
        </div>
      ),
    },
    // Price
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => (
        <div className="w-fit min-w-[100px] max-w-[200px]">
          {row.getValue("price")}
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
            <DataTableRowActions
              row={row}
              actions={[
                { label: "Edit", handler: () => handleEdit(row.original) },
                {
                  label: "Delete",
                  handler: async (id: string) => {
                    await request(
                      `/api/menus/${row.getValue("restaurantId")}`,
                      "DELETE",
                      { id }
                    );
                    toast({ description: "Menu deleted successfully" });
                    setTimeout(() => {
                      router.refresh();
                    }, 1000);
                  },
                },
              ]}
            />
          </>
        );
      },
    },
  ] as ColumnDef<MenuListResponse>[];
}
