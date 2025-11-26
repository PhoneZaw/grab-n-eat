import db from "@/lib/db";
import { UserRole, UserStatus } from "@prisma/client";
import { hash } from "bcrypt";

const DEFAULT_PASSWORD = "password";

export type StaffCreateRequest = {
  name: string;
  email: string;
  phoneNumber: string | null;
  branchId: string;
};

export type StaffCreateResponse = {
  id: string;
};

export async function createManager(
  data: StaffCreateRequest
): Promise<StaffCreateResponse> {
  return await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      branchId: data.branchId,
      phoneNumber: data.phoneNumber,
      hashedPassword: await hash(DEFAULT_PASSWORD, 10),
      role: UserRole.MANAGER,
      status: UserStatus.ACTIVE,
    },
  });
}

export type OwnerCreateRequest = {
  name: string;
  email: string;
  password: string;
};

export async function createOwner(
  data: OwnerCreateRequest
): Promise<StaffCreateResponse> {
  return await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      hashedPassword: await hash(data.password, 10),
      role: UserRole.OWNER,
      status: UserStatus.ACTIVE,
    },
  });
}
