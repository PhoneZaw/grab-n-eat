"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { request } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
import { ImageFile } from "../../category/createDialogComponent";
import { X } from "lucide-react";

export const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  contactNumber: z.string(),
  description: z.string(),
  address: z.string(),
  latitude: z.string(),
  longitude: z.string(),
});

export function EditDialogComponent({
  open,
  setOpen,
  values,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  values: {
    id: string;
    name: string;
    contactNumber: string;
    description: string;
    address: string;
    latitude: string;
    longitude: string;
  };
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: values.id,
      name: values.name,
      contactNumber: values.contactNumber,
      description: values.description,
      address: values.address,
      latitude: values.latitude,
      longitude: values.longitude,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("on submit");
    await request("/api/branches", "PUT", values);

    setOpen(false);

    toast({
      title: "Branch updated",
    });

    setTimeout(() => {
      router.refresh();
    }, 1000);
  }

  const [imageFile, setImageFile] = useState<ImageFile | undefined>();

  const [imgError, setImgError] = useState("");

  console.log(form.formState.errors, "errors");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Branch</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mx-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Branch Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number *</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      placeholder="Contact Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Image *</FormLabel>
              {imageFile ? (
                <div className="text-sm w-full border p-2 my-2 rounded flex justify-between items-center">
                  <p>{imageFile.name}</p>

                  <Button
                    variant={"ghost"}
                    className="p-0 w-6 h-6 border-gray-800"
                    onClick={() => {
                      setImageFile(undefined);
                    }}
                  >
                    <X className="w-4 h-4 stroke- fill-black" />
                  </Button>
                </div>
              ) : (
                <>
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageFile(res[0]);
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                  <FormMessage>
                    {imgError ? (
                      <div className="text-red-500">{imgError}</div>
                    ) : null}
                  </FormMessage>
                </>
              )}
            </div>
            <div className="flex w-full justify-end">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
