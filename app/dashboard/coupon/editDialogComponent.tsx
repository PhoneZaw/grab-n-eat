"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { request } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CouponResponse } from "@/services/coupon/readCoupon";

export const formSchema = z.object({
  code: z.string(),
  discountPercentage: z.number(),
  branchId: z.string(),
  expiryDate: z.date(),
});

export function EditDialogComponent({
  open,
  setOpen,
  values,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  values: CouponResponse;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discountPercentage: 0,
      branchId: "",
      expiryDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await request("/api/coupons", "PUT", values);

    setOpen(false);

    toast({
      title: "Coupon updated successfully",
    });

    setTimeout(() => {
      router.refresh();
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Coupon</DialogTitle>
        </DialogHeader>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Coupon Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Type</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Coupon Type" />
                    </SelectTrigger>

                    <FormControl>
                      <SelectContent>
                        {(
                          Object.keys(CouponType) as Array<
                            keyof typeof CouponType
                          >
                        ).map((key: string) => {
                          return (
                            <SelectItem key={key} value={key}>
                              {key}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </FormControl>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
}
