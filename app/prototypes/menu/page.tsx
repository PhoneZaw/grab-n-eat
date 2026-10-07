import { Suspense } from "react";
import Harness from "./harness";

export default function MenuPrototypePage() {
  return (
    <Suspense fallback={null}>
      <Harness />
    </Suspense>
  );
}
