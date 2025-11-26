import db from "@/lib/db";
import { CustomerStatus } from "@prisma/client";

export type CustomerCreateRequest = {
    name: string,
    email: string,
}

export type CustomerCreateResponse = {
    id: string
}

export async function createCustomer(data: CustomerCreateRequest) : Promise<CustomerCreateResponse> {
    return await db.customer.create({
        data: {
            name: data.name,
            email: data.email,
            status: CustomerStatus.ACTIVE
        }
    });
}