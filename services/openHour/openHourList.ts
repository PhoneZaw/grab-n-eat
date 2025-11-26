import { DayOfWeek } from "@prisma/client";
import db from "../../lib/db";

export type OpenHourListResponse = {
  id: string;
  day: DayOfWeek;
  startTime: Date;
  endTime: Date;
  isOpen: boolean;
  branchId: string;
};

export async function getOpenHourListByBranchId(
  branchId: string
): Promise<OpenHourListResponse[]> {
  if (!branchId) {
    throw new Error("Branch id is required");
  }

  var openHours = await db.openingHour.findMany({
    where: {
      branchId: branchId,
    },
  });

  // Create map of enum values to their index
  const dayOrder = Object.values(DayOfWeek).reduce((acc, day, index) => {
    acc[day] = index;
    return acc;
  }, {} as Record<DayOfWeek, number>);

  var data = openHours
    .map((c) => {
      return {
        id: c.id,
        day: c.day,
        startTime: c.startTime,
        endTime: c.endTime,
        isOpen: c.isOpen,
        branchId: c.branchId,
      };
    })
    .sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);

  console.log("Open hours", data);

  return data;
}
