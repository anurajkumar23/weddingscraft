"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/model/alert-model";
import { DecoratorDocument } from "@/customTypes/DecoratorDocument";


type DecoratorFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(2, "Name is required").max(40),
  description: z.string().optional(),
  location: z.object({
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),
    pincode: z.string().min(1, "Pincode is required"),
  }).optional(),
  price: z.array(z.number()).nonempty("At least one price is required"),
  contactUs: z.coerce.number().min(0, "Fill your contact details"),
  yearOfEstd: z.string().min(1, "Year of ESTD. is required").transform((val) => Number(val)).refine(val => !isNaN(val), {
    message: "Year of ESTD> must be a number",
  }),

});

interface DecoratorsFormProps {
  initialData: DecoratorDocument;
}

const DecoratorForm: React.FC<DecoratorsFormProps> = ({
  initialData
}) => {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  const title = initialData ? "Edit Decorator" : "Create Decorator";
  const description = initialData ? "Edit an existing decorator." : "Add a new decorator";
  const toastMessage = initialData ? "Decorator updated." : "Decorator created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<DecoratorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: '',
      location: { city: '', area: '', pincode: '' },
      price: [],
      contactUs: "",
      yearOfEstd: '',
    },
  });

  const onSubmit = async (data: DecoratorFormValues) => {
    console.log(data, "decorators");
    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/decor/${initialData._id}`, data, config);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/decor`, data, config);
      }
      router.refresh();
      router.push(`/seller/post/decorator`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


  const onDelete = async () => {
    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/decor/${initialData._id}`, config);
      router.refresh();
      router.push(`/seller/post/decorator`);
      toast.success("Decorator deleted.");
    } catch (error: any) {
      toast.error("Make sure to remove all related data first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };


  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className=" flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="mb-4 my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid-cols-10 grid gap-4 container">

            <div className="md:grid md:col-span-6 container flex-1 bg-slate-100 shadow-sm p-5 rounded-lg font-bold  h-max gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Decorator Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Name" {...field} />
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
                    <FormLabel > Description</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearOfEstd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Year Of ESTD.</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="2020" {...field} />
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
                    <FormLabel >Price (Array)</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {(field.value || []).map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              disabled={loading}
                              placeholder="Price"
                              value={item.toString()}  // Convert number to string for input
                              onChange={(e) => {
                                const updatedValue = [...(field.value || [])];
                                const newValue = parseFloat(e.target.value);  // Convert string to number

                                if (!isNaN(newValue)) {  // Check if the new value is a valid number
                                  updatedValue[index] = newValue;
                                  field.onChange(updatedValue);
                                }
                              }}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                const updatedValue = (field.value || []).filter((_, i) => i !== index);
                                field.onChange(updatedValue);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => {
                            const updatedValue = [...(field.value || []), 0];  // Add a new number (e.g., 0)
                            field.onChange(updatedValue);
                          }}
                        >
                          Add New
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </div>

          <div className="my-4 container p-5 space-y-4 rounded-lg bg-slate-100 shadow-sm font-bold ">
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >City</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Pincode</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Pincode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Area</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactUs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="1234567890" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button disabled={loading} type="submit"  >
              {action}
            </Button>

          </div>
        </form>
      </Form>
    </>
  );
};

export default DecoratorForm;
