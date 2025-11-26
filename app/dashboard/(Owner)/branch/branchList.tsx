"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DialogComponent } from "./createDialogComponent";
import { Button } from "@/components/ui/button";
import { BranchListResponse } from "@/services/branch/branchList";
import { useColumns } from "./columns";
import { useState } from "react";
import { EditDialogComponent } from "./editDialogComponent";
import { BranchUpdateRequest } from "@/services/branch/branchUpdate";

export default function BranchList({
  branches,
  restaurantId,
}: {
  branches: BranchListResponse[];
  restaurantId: string;
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editBranch, setEditCategory] = useState<BranchUpdateRequest>();

  const handleEdit = (branch: BranchUpdateRequest) => {
    console.log("Handle Edit", branch);
    setEditCategory(branch);
    setEditDialogOpen(true);
  };

  console.log(branches);

  const columns = useColumns(handleEdit);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Branches</h2>
        </div>
        <div>
          <DialogComponent restaurantId={restaurantId}>
            <Button>Add Branch</Button>
          </DialogComponent>
          {editBranch && (
            <EditDialogComponent
              open={editDialogOpen}
              setOpen={setEditDialogOpen}
              values={editBranch}
            ></EditDialogComponent>
          )}
        </div>
      </div>
      <DataTable data={branches} columns={columns} />
    </div>
  );
}
