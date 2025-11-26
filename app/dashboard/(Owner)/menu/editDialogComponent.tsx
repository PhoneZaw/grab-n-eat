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
import { request } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageFile } from "../../category/createDialogComponent";
import { UploadDropzone } from "@/utils/uploadthing";
import { X } from "lucide-react";

export const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  imageUrl: z.string(),
  price: z.string(),
  restaurantId: z.string(),
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
    description: string;
    imageUrl: string;
    price: string;
    restaurantId: string;
  };
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: values.id,
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      price: values.price,
      restaurantId: values.restaurantId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await request(`/api/menus/${values.restaurantId}`, "PUT", values);

    setOpen(false);

    toast({
      title: "Menu updated successfully",
    });

    setTimeout(() => {
      router.refresh();
    }, 1000);
  }

  const [imageFile, setImageFile] = useState<ImageFile | undefined>();

  const [imgError, setImgError] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Menu Name" {...field} />
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Image</FormLabel>
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
