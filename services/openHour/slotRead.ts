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
  // get open hours of the branch
  var maxOrderCountPerSlot = 10;

  var openHours = await db.openingHour.findMany({
    where: {
      branchId: branchId,
    },
  });

  // create three days of slots
  var today = new Date();

  // create slots for each day
  var slots: SlotResponse[] = [];
  for (let i = 0; i < 3; i++) {
    var date = add(today, {
      days: i,
    });

    var day = getDayOfWeek(date);
    var orderHourForDay = openHours.find((oh) => oh.day == day);

    if (!orderHourForDay) {
      continue;
    }
    // TODO: Check start time should be greater than current time
    var slotStartTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      orderHourForDay.startTime.getHours(),
      orderHourForDay.startTime.getMinutes()
    );

    console.log("slotStartTime", slotStartTime);

    var slotEndTime = add(slotStartTime, {
      hours: 1,
    });

    while (slotEndTime.getHours() <= orderHourForDay.endTime.getHours()) {
      // create slots for the day based on the open hours, for eg 9:00 - 10:00, 10:00 - 11:00
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

  // get slot from db
  var existingSlots = await db.pickUpSlot.findMany({
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

  // check if the slot is available
  var availableSlots = slots.filter((slot) => {
    var existingSlot = existingSlots.find(
      (es) =>
        es.date == slot.date &&
        es.slotStartTime == slot.slotStartTime &&
        es.slotEndTime == slot.slotEndTime
    );
    return !existingSlot;
  });

  // return the available slots
  availableSlots = availableSlots.filter((slot) => {
    return slot.slotStartTime.valueOf() > new Date().valueOf();
  });

  return availableSlots;
}
