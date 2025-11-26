import { Metadata } from "next";
import { getCustomerReport } from "@/services/customer/customerReport";
import CustomerReport from "./customerReport";
import { redirect } from "next/navigation";
import { getAuth, getSession } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Customers",
  description: "Customers page",
};

export default async function Customer() {
  const session = await getAuth(["ADMIN"], "/dashboard/customer");

  const customers = await getCustomerReport();

  return <CustomerReport customers={customers}></CustomerReport>;
}
