import db from "@/lib/db";
import { UserRole } from "@prisma/client";
import { hash } from "bcrypt";

export type StaffUpdateRequest = {
  id: string;
  name: string;
  email: string;
  branchId: string;
};

export function updateStaff(data: StaffUpdateRequest) {
  console.log("To update staff", data);
  return db.user.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      email: data.email,
      branchId: data.branchId,
    },
  });
}

export async function changePassword(email: string, newPassword: string) {
  var hashedPassword = await hash(newPassword, 10);

  db.user.update({
    where: {
      email,
    },
    data: {
      hashedPassword: hashedPassword,
    },
  });
}
