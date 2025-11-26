"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { request, requestWithResponse } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ApplyCoupon } from "@/services/coupon/updateCoupon";

interface VoucherProps {
  onApplyVoucher: (code: string) => Promise<boolean>;
}

const onApplyVoucher = async (code: string, orderId: string) => {
  console.log("Applying voucher code", code);
  var result = await requestWithResponse("/api/coupons/apply", "POST", {
    code: code,
    orderId: orderId,
  } as ApplyCoupon);

  console.log("Voucher result", result);

  var isSuccess = result.isSuccess;
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(isSuccess);
    }, 1000);
  });
};

export function Voucher({
  orderId,
  couponCode,
}: {
  orderId: string;
  couponCode: string | null;
}) {
  const router = useRouter();
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedCode, setAppliedCode] = useState(couponCode ?? "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyVoucher = async () => {
    if (!voucherCode) return;

    setIsLoading(true);
    setError("");

    try {
      const isValid = await onApplyVoucher(voucherCode, orderId);
      if (isValid) {
        setAppliedCode(voucherCode);
        setVoucherCode("");

        toast({
          title: "Voucher applied successfully",
        });

        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else {
        setError("Invalid voucher code");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while applying the voucher");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveVoucher = async () => {
    await request("/api/coupons/cancel", "POST", { orderId: orderId });
    setAppliedCode("");
    toast({
      title: "Voucher removed",
    });

    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voucher</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appliedCode ? (
            <div className="flex items-center justify-between bg-muted p-2 rounded-md">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">{appliedCode}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveVoucher}
                aria-label="Remove voucher"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  id="voucher-code"
                  placeholder="Enter voucher code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <Button
                  className="bg-first hover:bg-first-darker"
                  onClick={handleApplyVoucher}
                  disabled={isLoading}
                >
                  {isLoading ? "Applying..." : "Apply"}
                </Button>
              </div>
              {error && (
                <div className="flex items-center space-x-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
