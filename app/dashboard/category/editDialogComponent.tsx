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
import { CategoryType } from "@prisma/client";
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
import { useState } from "react";
import { ImageFile } from "./createDialogComponent";
import { UploadDropzone } from "@/utils/uploadthing";
import { X } from "lucide-react";

export const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string(),
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
    type: string;
  };
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: values.id,
      name: values.name,
      type: values.type,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await request("/api/categories", "PUT", values);

    setOpen(false);

    toast({
      title: "Category updated successfully",
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
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
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
                  <FormLabel>Category Type *</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category Type" />
                    </SelectTrigger>

                    <FormControl>
                      <SelectContent>
                        {(
                          Object.keys(CategoryType) as Array<
                            keyof typeof CategoryType
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
