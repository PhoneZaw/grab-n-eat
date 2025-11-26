"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useColumns } from "./columns";
import { BranchMenuListResponse } from "@/services/branchMenu/BranchMenuList";

export default async function BranchMenuList({
  menus,
  branchName,
}: {
  menus: BranchMenuListResponse[];
  branchName: string;
}) {
  const columns = useColumns();
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Menus for - {branchName}
          </h2>
        </div>
      </div>
      <DataTable data={menus} columns={columns} />
    </div>
  );
}
