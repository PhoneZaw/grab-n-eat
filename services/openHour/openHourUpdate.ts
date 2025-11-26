import db from "@/lib/db";
import { da } from "@faker-js/faker";
import { DayOfWeek } from "@prisma/client";

export type OpenHourUpdateRequest = {
  id: string;
  day: DayOfWeek;
  startTime: Date;
  endTime: Date;
  isOpen: boolean;
  branchId: string;
};

export async function updateOpenHour(data: OpenHourUpdateRequest[]) {
  console.log("To update open hours", data, "Lengh: ", data.length);
  for (let i = 0; i < data.length; i++) {
    const o = data[i];
    console.log("Updating open hour : ", o);
    var result = await db.openingHour.update({
      where: {
        id: o.id,
      },
      data: {
        day: o.day,
        startTime: o.startTime,
        endTime: o.endTime,
        isOpen: o.isOpen,
        branchId: o.branchId,
      },
    });

    console.log("Updated open hour: ", result);
  }
}
