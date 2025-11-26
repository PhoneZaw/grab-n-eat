"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DialogComponent } from "./createDialogComponent";
import { Button } from "@/components/ui/button";
import { RestaurantListResponse } from "@/services/restaurant/restaurantList";
import { useColumns } from "./columns";
import { useState } from "react";
import { EditDialogComponent } from "./editDialogComponent";

export default function RestaurantList({
  restaurants,
}: {
  restaurants: RestaurantListResponse[];
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRestaurant, setEditCategory] = useState<RestaurantListResponse>();

  const handleEdit = (category: RestaurantListResponse) => {
    setEditCategory(category);
    setEditDialogOpen(true);
  };

  const columns = useColumns(handleEdit);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Restaurants</h2>
        </div>
        <div>
          <DialogComponent>
            <Button>Add Restaurant</Button>
          </DialogComponent>
          {editRestaurant && (
            <EditDialogComponent
              open={editDialogOpen}
              setOpen={setEditDialogOpen}
              values={editRestaurant}
            ></EditDialogComponent>
          )}
        </div>
      </div>
      <DataTable data={restaurants} columns={columns} />
    </div>
  );
}
