"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DialogComponent } from "./createDialogComponent";
import { Button } from "@/components/ui/button";
import { StaffListResponse } from "@/services/staff/staffList";
import { useColumns } from "./columns";
import { useState } from "react";
import { EditDialogComponent } from "./editDialogComponent";

export default function StaffList({
  staffs,
  restaurantId,
}: {
  staffs: StaffListResponse[];
  restaurantId: string;
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editStaff, setEditCategory] = useState<StaffListResponse>();

  const handleEdit = (category: StaffListResponse) => {
    setEditCategory(category);
    setEditDialogOpen(true);
  };

  const columns = useColumns(handleEdit);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Staff</h2>
        </div>
        <div>
          <DialogComponent restaurantId={restaurantId}>
            <Button>Add Staff</Button>
          </DialogComponent>
          {editStaff && (
            <EditDialogComponent
              open={editDialogOpen}
              setOpen={setEditDialogOpen}
              values={editStaff}
              restaurantId={restaurantId}
            ></EditDialogComponent>
          )}
        </div>
      </div>
      <DataTable data={staffs} columns={columns} />
    </div>
  );
}
