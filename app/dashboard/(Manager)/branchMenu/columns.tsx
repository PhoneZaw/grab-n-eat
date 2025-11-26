"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";
import { BranchMenuListResponse } from "@/services/branchMenu/BranchMenuList";
import Switch from "react-switch";
import { request } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";

export function useColumns() {
  const router = useRouter();

  const handleSwitchChange = async (id: string, value: boolean) => {
    if (value) {
      await request(`/api/branchMenus/activate`, "PUT", { id: id });

      toast({
        title: "Branch menu activated",
      });

      router.refresh();
    } else {
      await request(`/api/branchMenus/deactivate`, "PUT", { id: id });

      toast({
        title: "Branch menu deactivated",
      });

      router.refresh();
    }
  };

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
          <Switch
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={50}
            onChange={(isChecked) =>
              handleSwitchChange(row.original.id, isChecked)
            }
            checked={row.original.isActive as boolean}
          />
        );
      },
    },
  ] as ColumnDef<BranchMenuListResponse>[];
}
