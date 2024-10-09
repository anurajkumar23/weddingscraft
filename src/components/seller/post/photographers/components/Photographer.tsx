"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/model/alert-model";

import { PhotographerDocument } from "@/customTypes/PhotographerDocument";

const formSchema = z.object({
  name: z.string().min(2, "Name is required").max(40),
  description: z.string().optional(),
  location: z.object({
    city: z.string().min(1, "City is required"),
    pincode: z.string().min(1, "Pincode is required"),
    area: z.string().optional(),
  }),
  price: z.array(z.number().positive("Price must be positive")).nonempty("At least one price is required"),
  contactUs: z.number().int().min(10, "Contact number must be at least 10 digits"),
  yearOfEstd: z.number().int().min(1800, "Year must be 1800 or later").max(new Date().getFullYear(), "Year cannot be in the future").optional(),
  services: z.array(z.string()).min(1, "At least one service is required"),
  occasion: z.string().min(2, "Occasion is required"),
});

type PhotographerFormValues = z.infer<typeof formSchema>;

interface PhotographerFormProps {
  initialData: PhotographerDocument;
}

export default function PhotographerForm({ initialData }: PhotographerFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Photographer" : "Create Photographer";
  const description = initialData ? "Edit an existing photographer." : "Add a new photographer";
  const toastMessage = initialData ? "Photographer updated." : "Photographer created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<PhotographerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      location: {
        city: "",
        pincode: "",
        area: "",
      },
      price: [],
      contactUs: undefined,
      yearOfEstd: undefined,
      services: [],
      occasion: "",
    },
  });

  const onSubmit = async (data: PhotographerFormValues) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      if (initialData) {
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/photographer/${initialData._id}`, data, config);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/photographer`, data, config);
      }

      router.refresh();
      router.push(`/seller/post/photographer?refreshId=${new Date().getTime()}`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/photographer/${initialData._id}/Photographer`,config);
      router.refresh();
      router.push(`/seller/post/photographer?refreshId=${new Date().getTime()}`);
      toast.success("Photographer deleted.");
    } catch (error) {
      toast.error("Error deleting photographer.");
      console.error("Error deleting photographer:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
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
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Photographer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occasion</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="e.g., Wedding, Birthday" {...field} />
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
                    <Textarea 
                      disabled={loading} 
                      placeholder="Describe your photography services" 
                      {...field} 
                    />
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
                  <FormLabel>Year Established</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      disabled={loading} 
                      placeholder="e.g., 2010" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="location.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
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
                    <FormLabel>Pincode</FormLabel>
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
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>


          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prices</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {field.value.map((price, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={price}
                          onChange={(e) => {
                            const newPrices = [...field.value];
                            newPrices[index] = Number(e.target.value);
                            field.onChange(newPrices);
                          }}
                          placeholder="Price"
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newPrices = field.value.filter((_, i) => i !== index);
                            field.onChange(newPrices);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => field.onChange([...field.value, 0])}
                    >
                      Add Price
                    </Button>
                  </div>
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
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    disabled={loading} 
                    placeholder="Contact number" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {field.value.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={service}
                          onChange={(e) => {
                            const newServices = [...field.value];
                            newServices[index] = e.target.value;
                            field.onChange(newServices);
                          }}
                          placeholder="Service"
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newServices = field.value.filter((_, i) => i !== index);
                            field.onChange(newServices);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => field.onChange([...field.value, ""])}
                    >
                      Add Service
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}