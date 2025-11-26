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
import {
  FancyMultiSelect,
  SelectItem,
} from "../../../../components/multiSelect";
import { CategoryListResponse } from "@/services/category/categoryList";
import { X } from "lucide-react";
import { UploadDropzone } from "@/utils/uploadthing";
import { ScrollArea } from "@/components/ui/scroll-area";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  categories: z.array(z.string()),
  imageUrl: z.string(),
  price: z.string().min(1, "Price is required"),
  restaurantId: z.string().min(1, "Restaurant is required"),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      categories: [],
      imageUrl: "",
      price: "",
      restaurantId: restaurantId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imageFile) {
      setImgError("Please upload an image");
      return;
    }
    values.imageUrl = imageFile.url;

    values.categories = value.map((item) => item.value);

    await request(`/api/menus/${values.restaurantId}`, "POST", values);

    form.reset();
    setImageFile(undefined);
    setValue([]);
    setOpen(false);

    toast({
      title: "Menu created successfully",
    });

    setTimeout(() => {
      router.refresh();
    }, 1000);
  }

  const [categories, setCategories] = useState<SelectItem[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await requestWithResponse("/api/categories", "GET");
      setCategories(
        response.map((category: CategoryListResponse) => ({
          label: category.name,
          value: category.id,
        }))
      );
    }
    fetchCategories();
  }, []);

  const [value, setValue] = useState<SelectItem[]>([]);

  const [imageFile, setImageFile] = useState<ImageFile | undefined>();

  const [imgError, setImgError] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[calc(100vh-6rem)]">
        <DialogHeader>
          <DialogTitle>Create Menu</DialogTitle>
        </DialogHeader>

        <ScrollArea className="p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mx-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
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

              <div className="space-y-2">
                <FormLabel>Categories *</FormLabel>
                <FancyMultiSelect
                  data={categories}
                  value={value}
                  setValue={setValue}
                />
              </div>

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Price" {...field} />
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
                <Button type="submit">Create</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
