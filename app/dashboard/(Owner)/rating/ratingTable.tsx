"use client";

import { DataTable } from "@/components/data-table/data-table";
import { BranchListResponse } from "@/services/branch/branchList";
import { ReviewResponse } from "@/services/review/getReview";
import { useColumns } from "./columns";
import BranchDropdown from "@/components/branchDropdown";

export default function RatingTable({
  reviews,
  selectedBranch,
  branches,
}: {
  reviews: ReviewResponse[];
  selectedBranch: BranchListResponse;
  branches: BranchListResponse[] | null;
}) {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Ratings & Reviews
          </h2>
        </div>
        {branches && (
          <BranchDropdown selectedBranch={selectedBranch} branches={branches} />
        )}
      </div>
      <DataTable data={reviews} columns={useColumns()} />
    </>
  );
}
