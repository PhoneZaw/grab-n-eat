"use client";

import { useState } from "react";
import EditOpenHours from "./EditOpenHours";
import OpenHoursList from "./OpenHourList";
import { Button } from "@/components/ui/button";
import { BranchListResponse } from "@/services/branch/branchList";
import BranchDropdown from "@/components/branchDropdown";
import { DayOfWeek } from "@prisma/client";

export default function OpenHour({
  selectedBranch,
  branches,
}: {
  selectedBranch: BranchListResponse;
  branches: BranchListResponse[] | null;
}) {
  const [editOpenHours, setEditOpenHours] = useState(false);

  const dayOrder = Object.values(DayOfWeek).reduce((acc, day, index) => {
    acc[day] = index;
    return acc;
  }, {} as Record<DayOfWeek, number>);

  const activeOpenHours = selectedBranch.openHours
    .filter((openHour) => openHour.isOpen)
    .sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2 max-w-2xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            OpenHours for {selectedBranch.name}
          </h2>
        </div>
        {branches && (
          <BranchDropdown selectedBranch={selectedBranch} branches={branches} />
        )}
      </div>
      <div>
        {editOpenHours ? (
          <EditOpenHours
            setEditOpenHours={setEditOpenHours}
            branch={selectedBranch}
          />
        ) : (
          <>
            <Button onClick={() => setEditOpenHours(true)}>
              Edit Open Hours
            </Button>
            <OpenHoursList
              setEditOpenHours={setEditOpenHours}
              openHours={activeOpenHours}
            />
          </>
        )}
      </div>
    </div>
  );
}
