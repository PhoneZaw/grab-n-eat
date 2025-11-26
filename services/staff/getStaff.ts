import db from "@/lib/db";
import { compare, hash } from "bcrypt";

export type StaffResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
  restaurantId: string | null;
  branchId: string | null;
};

export async function getStaffDetailById(id: string): Promise<StaffResponse> {
  var staff = await db.user.findFirst({
    where: {
      id: id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!staff) {
    throw new Error("Staff not found");
  }

  return { ...staff, restaurantId: staff.restaurant?.id ?? null };
}

export async function login(
  email: string,
  password: string
): Promise<StaffResponse | null> {
  var user = await db.user.findFirst({
    where: {
      email: email,
    },
    include: {
      restaurant: true,
      branch: true,
    },
  });

  if (!user) {
    return null;
  }

  var passwordCompare = compare(password, user.hashedPassword ?? "");

  if (!passwordCompare) {
    return null;
  }

  console.log("Login Success - ", user);

  return {
    ...user,
    restaurantId: user.restaurant?.id ?? null,
    branchId: user.branch?.id ?? null,
  };
}

export async function getOwnerEmailByBranchId(
  branchId: string
): Promise<string> {
  var branch = await db.branch.findFirst({
    where: {
      id: branchId,
    },
    include: {
      restaurant: {
        include: {
          owner: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  });

  if (!branch) {
    throw new Error("Branch not found");
  }

  return branch.restaurant.owner.email;
}
