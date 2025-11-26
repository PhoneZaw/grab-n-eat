"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { MenuListResponse } from "@/services/menu/menuList";
import { useColumns } from "./columns";
import { DialogComponent } from "./createDialogComponent";
import { EditDialogComponent } from "./editDialogComponent";
import { useState } from "react";

export default function MenuList({
  menus,
  restaurantId,
}: {
  menus: MenuListResponse[];
  restaurantId: string;
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editMenu, setEditMenu] = useState<MenuListResponse>();

  const handleEdit = (menu: MenuListResponse) => {
    setEditMenu(menu);
    setEditDialogOpen(true);
  };

  const columns = useColumns(handleEdit);
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Menus</h2>
        </div>
        <div>
          <DialogComponent restaurantId={restaurantId}>
            <Button>Add Menu</Button>
          </DialogComponent>
          {editMenu && (
            <EditDialogComponent
              open={editDialogOpen}
              setOpen={setEditDialogOpen}
              values={editMenu}
            ></EditDialogComponent>
          )}
        </div>
      </div>
      <DataTable data={menus} columns={columns} />
    </div>
  );
}
