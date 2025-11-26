"use client";

import { Button } from "@/components/ui/button";
import { DialogComponent } from "./createDialogComponent";
import { DataTable } from "@/components/data-table/data-table";
import { useColumns } from "./columns";
import { CategoryListResponse } from "@/services/category/categoryList";
import { useState } from "react";
import { EditDialogComponent } from "./editDialogComponent";

export default function CategoryList({
  categories,
}: {
  categories: CategoryListResponse[];
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryListResponse>();

  const handleEdit = (category: CategoryListResponse) => {
    setEditCategory(category);
    setEditDialogOpen(true);
  };

  const columns = useColumns(handleEdit);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        </div>
        <div>
          <DialogComponent>
            <Button>Add Category</Button>
          </DialogComponent>
          {editCategory && (
            <EditDialogComponent
              open={editDialogOpen}
              setOpen={setEditDialogOpen}
              values={editCategory}
            ></EditDialogComponent>
          )}
        </div>
      </div>
      <DataTable data={categories} columns={columns} />
    </div>
  );
}
