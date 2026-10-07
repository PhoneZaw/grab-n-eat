import { Suspense } from "react";
import Harness from "./harness";

export default function LandingPrototypePage() {
  return (
    <Suspense fallback={null}>
      <Harness />
    </Suspense>
  );
}
