import { Suspense } from "react";
import { ProtoFooter, ProtoNav } from "../components/shell";
import CheckoutForm from "./checkout";

export default function CheckoutPage() {
  return (
    <>
      <ProtoNav />
      <main>
        <Suspense fallback={<p className="px-5 py-10 text-sm">Preparing checkout…</p>}>
          <CheckoutForm />
        </Suspense>
      </main>
      <ProtoFooter />
    </>
  );
}
