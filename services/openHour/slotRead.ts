import db from "@/lib/db";
import { getDayOfWeek } from "@/lib/utils";
import { add } from "date-fns";

export type SlotResponse = {
  slotStartTime: Date;
  slotEndTime: Date;
  date: Date;
};

export async function getAvailableSlot(
  branchId: string
): Promise<SlotResponse[]> {
  const maxOrderCountPerSlot = 10;

  const openHours = await db.openingHour.findMany({
    where: {
      branchId: branchId,
    },
  });

  const today = new Date();
  const slots: SlotResponse[] = [];

  for (let i = 0; i < 3; i++) {
    const date = add(today, {
      days: i,
    });

    const day = getDayOfWeek(date);
    const orderHourForDay = openHours.find((oh) => oh.day == day);

    if (!orderHourForDay) {
      continue;
    }

    let slotStartTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      orderHourForDay.startTime.getHours(),
      orderHourForDay.startTime.getMinutes()
    );

    let slotEndTime = add(slotStartTime, {
      hours: 1,
    });

    while (slotEndTime.getHours() <= orderHourForDay.endTime.getHours()) {
      slots.push({
        slotStartTime: slotStartTime,
        slotEndTime: slotEndTime,
        date: date,
      });

      slotStartTime = slotEndTime;
      slotEndTime = add(slotEndTime, {
        hours: 1,
      });
    }
  }

  const existingSlots = await db.pickUpSlot.findMany({
    where: {
      branchId: branchId,
      date: {
        in: slots.map((s) => s.date),
      },
      orderCount: {
        lte: maxOrderCountPerSlot,
      },
    },
  });

  let availableSlots = slots.filter((slot) => {
    const existingSlot = existingSlots.find(
      (es) =>
        es.date === slot.date &&
        es.slotStartTime === slot.slotStartTime &&
        es.slotEndTime === slot.slotEndTime
    );
    return !existingSlot;
  });

  availableSlots = availableSlots.filter((slot) => {
    return slot.slotStartTime.valueOf() > new Date().valueOf();
  });

  return availableSlots;
}
