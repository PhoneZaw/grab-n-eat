import DropDown from "@/components/dropdown";
import { BranchListResponse } from "@/services/branch/branchList";

export default function BranchDropdown({
  selectedBranch,
  branches,
}: {
  selectedBranch: BranchListResponse;
  branches: BranchListResponse[];
}) {
  return (
    <div>
      <DropDown
        chosenValue={selectedBranch.name}
        values={branches.map((b) => {
          return { id: b.id, name: b.name };
        })}
      />
    </div>
  );
}
