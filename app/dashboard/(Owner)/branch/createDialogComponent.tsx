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
import { useEffect, useState } from "react";
import { request, requestWithResponse } from "@/lib/request";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { RestaurantListResponse } from "@/services/restaurant/restaurantList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UploadDropzone } from "@/utils/uploadthing";
import { X } from "lucide-react";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  address: z.string().min(2, {
    message: "Address is required",
  }),
  latitude: z.string().min(1, {
    message: "Latitude is required",
  }),
  longitude: z.string().min(1, {
    message: "Longitude is required",
  }),
  restaurantId: z.string().min(1, "Restaurant is required"),
  imageUrl: z.string(),
  contactNumber: z.string(),
});

type ImageFile = {
  url: string;
  name: string;
};

export function DialogComponent({
  children,
  restaurantId,
}: Readonly<{
  children: React.ReactNode;
  restaurantId: string;
}>) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [restaurants, setRestaurants] = useState<RestaurantListResponse[]>([]);

  useEffect(() => {
    async function fetchRestaurants() {
      const response = await requestWithResponse("/api/restaurants", "GET");

      setRestaurants(response);
    }

    fetchRestaurants();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      latitude: "0",
      longitude: "0",
      restaurantId: restaurantId,
      imageUrl: "",
      contactNumber: "",
    },
  });

  const [imageFile, setImageFile] = useState<ImageFile | undefined>();

  const [imgError, setImgError] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imageFile) {
      setImgError("Please upload an image");
      return;
    }
    values.imageUrl = imageFile.url;
    await request("/api/branches", "POST", values);

    form.reset();
    setImageFile(undefined);

    setOpen(false);

    toast({
      title: "Branch created",
    });

    setTimeout(() => {
      router.refresh();
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[calc(100vh-6rem)]">
        <DialogHeader>
          <DialogTitle>Create Branch</DialogTitle>
        </DialogHeader>

        <ScrollArea>
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
                <Button type="submit">Create</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
