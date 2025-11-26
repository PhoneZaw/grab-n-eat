"use client";

import { useColumns } from "./columns";
import { DataTable } from "../../../components/data-table/data-table";
import { CustomerReportResponse } from "@/services/customer/customerReport";
import { useRouter } from "next/navigation";
import { request } from "@/lib/request";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CustomerReport({
  customers,
}: {
  customers: CustomerReportResponse[];
}) {
  const router = useRouter();

  const columns = useColumns();
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          </div>
        </div>
        <DataTable data={customers} columns={columns} />
      </div>
    </>
  );
}
