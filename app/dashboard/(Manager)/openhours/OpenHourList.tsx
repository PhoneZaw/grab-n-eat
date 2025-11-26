"use client";

import { OpenHourListResponse } from "@/services/openHour/openHourList";
import { parseDateToDayTimeString, toTitleCase } from "@/lib/utils";

export default function OpenHoursList({
  setEditOpenHours,
  openHours,
}: {
  setEditOpenHours: (editOpenHours: boolean) => void;
  openHours: OpenHourListResponse[];
}) {
  return (
    <div className="max-w-[640px] mt-4">
      {openHours ? (
        openHours.map((openHour) => (
          <div key={openHour.id}>
            <div className="flex justify-between items-center p-2">
              <h2>{toTitleCase(openHour.day)}</h2>
              <p>
                {parseDateToDayTimeString(openHour.startTime)} -{" "}
                {parseDateToDayTimeString(openHour.endTime)}
              </p>
            </div>
            <hr className="m-4" />
          </div>
        ))
      ) : (
        <p>
          No open hours,{" "}
          <button onClick={() => setEditOpenHours(true)}>Edit</button>
        </p>
      )}
    </div>
  );
}
