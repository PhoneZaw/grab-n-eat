"use client";

import { DataTable } from "@/components/data-table/data-table";
import { OrderReport } from "@/services/report/orderReport";
import { useColumns } from "./columns";

export default function OrderReportTable({
  orders,
}: {
  orders: OrderReport[];
}) {
  const columns = useColumns();
  return <DataTable data={orders} columns={columns} />;
}
