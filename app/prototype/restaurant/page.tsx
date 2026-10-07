import { Suspense } from "react";
import { ProtoFooter, ProtoNav } from "../components/shell";
import MenuExperience from "./menu";

export default function RestaurantPage() {
  return (
    <>
      <ProtoNav />
      <main>
        <Suspense fallback={<p className="px-5 py-10 text-sm">Opening the menu…</p>}>
          <MenuExperience />
        </Suspense>
      </main>
      <ProtoFooter />
    </>
  );
}
