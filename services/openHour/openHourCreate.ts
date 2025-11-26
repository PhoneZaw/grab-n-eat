import { DayOfWeekString } from "@/data/data";
import db from "@/lib/db";
import { DayOfWeek } from "@prisma/client";

export type OpenHourCreateRequest = {
  day: DayOfWeek;
  startTime: Date;
  endTime: Date;
  isOpen: boolean;
};

const defaultOpenHours = DayOfWeekString.map((day) => {
  return {
    day: day,
    startTime: new Date(0, 0, 0, 8, 0, 0),
    endTime: new Date(0, 0, 0, 20, 0, 0),
    isOpen: true,
  };
});

export async function createDefaultOpenHours(branchId: string) {
  return await db.openingHour.createMany({
    data: defaultOpenHours.map((openHour) => {
      return {
        day: openHour.day as DayOfWeek,
        startTime: openHour.startTime,
        endTime: openHour.endTime,
        branchId: branchId,
        isOpen: openHour.isOpen,
      };
    }),
  });
}
