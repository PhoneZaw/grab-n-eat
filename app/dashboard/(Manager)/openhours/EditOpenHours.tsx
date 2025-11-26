"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OpenHourListResponse } from "@/services/openHour/openHourList";
import {
  parseDateToTimeString,
  parseTimeStringToDate,
  toTitleCase,
} from "@/lib/utils";
import { request } from "@/lib/request";
import Switch from "react-switch";
import { BranchListResponse } from "@/services/branch/branchList";
import { toast } from "@/components/ui/use-toast";
import { DayOfWeek } from "@prisma/client";

export default function EditOpenHours({
  setEditOpenHours,
  branch,
}: {
  setEditOpenHours: (editOpenHours: boolean) => void;
  branch: BranchListResponse;
}) {
  const dayOrder = Object.values(DayOfWeek).reduce((acc, day, index) => {
    acc[day] = index;
    return acc;
  }, {} as Record<DayOfWeek, number>);

  const [openHours, setOpenHours] = useState<OpenHourListResponse[]>(
    branch.openHours.sort((a, b) => dayOrder[a.day] - dayOrder[b.day])
  );

  const handleTimeChange = (id: string, field: string, value: Date) => {
    console.log("handleTimeChange: ", id, field, value);
    setOpenHours((prev) =>
      prev.map((openHour) =>
        openHour.id === id ? { ...openHour, [field]: value } : openHour
      )
    );
  };

  const handleSwitchChange = (id: string, value: boolean) => {
    console.log("handleSwitch", id, value);
    setOpenHours((prev) =>
      prev.map((openHour) =>
        openHour.id === id ? { ...openHour, isOpen: value } : openHour
      )
    );

    console.log(openHours);
  };

  const handleSaveChanges = async () => {
    const response = await request(
      `/api/openhours/${branch.id}`,
      "PUT",
      openHours
    );

    setEditOpenHours(false);

    toast({
      title: "Open hours updated successfully",
    });

    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const router = useRouter();
  return (
    <div>
      <div>
        <div className="flex gap-2">
          <Button onClick={() => setEditOpenHours(false)}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </div>
      <div className="max-w-[640px] mt-10">
        {openHours &&
          openHours.map((openHour) => (
            <div key={openHour.id}>
              <div className="flex items-center gap-4 justify-between">
                <div className="flex gap-4">
                  <Switch
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={20}
                    width={50}
                    onChange={(isChecked) =>
                      handleSwitchChange(openHour.id, isChecked)
                    }
                    checked={openHour.isOpen}
                  />
                  <p>{toTitleCase(openHour.day)}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p>Start Time</p>
                    <input
                      type="time"
                      id={`start-${openHour.id}`}
                      name="startTime"
                      value={parseDateToTimeString(openHour.startTime, true)}
                      onChange={(e) =>
                        handleTimeChange(
                          openHour.id,
                          "startTime",
                          parseTimeStringToDate(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <p>EndTime</p>
                    <input
                      type="time"
                      id={`end-${openHour.id}`}
                      name="endTime"
                      value={parseDateToTimeString(openHour.endTime, true)}
                      onChange={(e) =>
                        handleTimeChange(
                          openHour.id,
                          "endTime",
                          parseTimeStringToDate(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <hr className="m-4" />
            </div>
          ))}
      </div>
    </div>
  );
}
