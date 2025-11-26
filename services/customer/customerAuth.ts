import db from "@/lib/db";
import { CustomerStatus } from "@prisma/client";
import { compare, hash } from "bcrypt";

export type CustomerDetailResponse = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  age: number;
  status: string;
};

export async function customerLogin(
  email: string,
  password: string
): Promise<CustomerDetailResponse | null> {
  var customer = await db.customer.findFirst({
    where: {
      email: email,
    },
  });

  if (!customer) {
    return null;
  }

  var passwordCompare = await compare(password, customer.hashedPassword ?? "");

  console.log("Password Compare result - ", passwordCompare);

  if (!passwordCompare) {
    return null;
  }

  console.log("Login Success - ", customer);

  return customer;
}

export type RegisterCustomerRequest = {
  email: string;
  name: string;
  phoneNumber: string;
  age: number;
  password: string;
};

export async function register(
  data: RegisterCustomerRequest
): Promise<CustomerDetailResponse | null> {
  var customer = await db.customer.create({
    data: {
      email: data.email,
      hashedPassword: await hash(data.password, 10),
      name: data.name,
      phoneNumber: data.phoneNumber,
      age: data.age,
      status: CustomerStatus.ACTIVE,
    },
  });

  console.log("After create - ", customer);

  return customer;
}
