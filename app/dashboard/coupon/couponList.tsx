"use client";

import { Button } from "@/components/ui/button";
import { DialogComponent } from "./createDialogComponent";
import { DataTable } from "@/components/data-table/data-table";
import { useColumns } from "./columns";
import { CouponResponse } from "@/services/coupon/readCoupon";
import { useState } from "react";
import { EditDialogComponent } from "./editDialogComponent";
import BranchDropdown from "@/components/branchDropdown";
import { BranchListResponse } from "@/services/branch/branchList";

export default function CouponList({
  coupons,
  branches,
  selectedBranch,
}: {
  coupons: CouponResponse[];
  selectedBranch: BranchListResponse;
  branches: BranchListResponse[] | null;
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState<CouponResponse>();

  const handleEdit = (coupon: CouponResponse) => {
    setEditCoupon(coupon);
    setEditDialogOpen(true);
  };

  const columns = useColumns(handleEdit);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Coupons</h2>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div>
            <DialogComponent selectedBranchId={selectedBranch.id}>
              <Button>Add Coupon</Button>
            </DialogComponent>
            {editCoupon && (
              <EditDialogComponent
                open={editDialogOpen}
                setOpen={setEditDialogOpen}
                values={editCoupon}
              ></EditDialogComponent>
            )}
          </div>
          {branches && (
            <BranchDropdown
              selectedBranch={selectedBranch}
              branches={branches}
            />
          )}
        </div>
      </div>
      <DataTable data={coupons} columns={columns} />
    </div>
  );
}
