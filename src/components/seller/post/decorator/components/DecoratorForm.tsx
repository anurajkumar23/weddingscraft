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
// import GalleryImage from "@/components/Gallery/Gallary";
// import Dropzone from "@/components/Gallery/DropZone";



// Define DecoratorFormValues type based on zod schema
type DecoratorFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(2, "Name is required").max(40),
  innerdescription: z.string().optional(),
  outerdescription: z.string().optional(),
  rating: z.preprocess((val) => parseFloat(val as string), z.number().min(1, "Rating must be at least 1").max(5).default(4.5)),
  location: z.object({
    city: z.string().optional(),
    pincode: z.string().optional(),
    area: z.string().optional(),
  }),
  price: z.array(z.number()).nonempty("At least one price is required"),
  contactUs: z.string().optional(), // Use string for phone numbers to accommodate different formats
  yearOfEstd: z.number().optional(),
 
});

const DecoratorForm = ({ initialData }: { initialData: DecoratorDocument }) => {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(initialData?.rating || 4.5);
  

  const title = initialData ? "Edit Decorator" : "Create Decorator";
  const description = initialData ? "Edit an existing decorator." : "Add a new decorator";
  const toastMessage = initialData ? "Decorator updated." : "Decorator created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<DecoratorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      innerdescription: "",
      outerdescription: "",
      // rating: 4.5,
      location: {
        city: "",
        pincode: "",
        area: "",
      },
      price: [1500],
      contactUs: "",
      yearOfEstd: undefined,
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
        await axios.patch(`http://localhost:8000/api/decor/${initialData._id}`, data, config);
      } else {
        await axios.post(`http://localhost:8000/api/decor`, data,config);
      }
      router.refresh();
      router.push(`/category/decorators`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  
  
  const onRatingSubmit = async () => {
    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  
    try {
      setLoading(true);
  
      // Ensure Decorator is defined correctly
      const response = await axios.patch(
        `http://localhost:3000/api/adminRating/${initialData._id}?name=Decorator`, // Make sure 'Decorator' is a string if it's the model name
        { adminRating: rating }, // Assuming rating is a state variable holding the new rating
        config
      );
  
      // Check if response is successful
      if (response.status === 200) {
        toast.success("Rating updated successfully.");
      } else {
        toast.error("Failed to update rating.");
      }
    } catch (error: any) {
      console.error("Error updating rating:", error); // Log error for debugging
      toast.error("Failed to update rating.");
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
      await axios.delete(`http://localhost:8000/api/decor/${initialData._id}`,config);
      router.refresh();
      router.push(`/category/decorators`);
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
            <div className="text-white flex items-center justify-between">
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
                        
                        <div className="md:grid md:col-span-6 container flex-1 bg-slate-800 p-5 rounded-lg font-bold  h-max gap-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-500">Decorator Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="outerdescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-500">Outer Description</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Outer Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="innerdescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-500">Inner Description</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-500" >Rating</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Rating" {...field}  type="number"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            <FormField
                                control={form.control}
                                name="yearOfEstd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-500">Year Of ESTD.</FormLabel>
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
                                        <FormLabel className="text-gray-500">Price (Array)</FormLabel>
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

                    <div className="my-4 container bg-slate-800 p-5 rounded-lg font-bold ">
                        <FormField
                            control={form.control}
                            name="location.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-500">City</FormLabel>
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
                                    <FormLabel className="text-gray-500">Pincode</FormLabel>
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
                                    <FormLabel className="text-gray-500">Area</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Area" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit" className="bg-gray-500">
                        {action}
                    </Button>
                </form>
            </Form>
            <div className="mt-8">
        <h2 className="text-xl font-bold text-white">Update Admin Rating (Range:1 to 5)</h2>
        <h2 className="text-xl font-bold text-white">Type 1 to Delete the Rating </h2>
        <Form {...form}>
          <form onSubmit={(e) => { e.preventDefault(); onRatingSubmit(); }} className="space-y-4">
            <FormItem>
              <FormLabel className="text-gray-500">Admin Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  disabled={loading}
                  placeholder="Enter new rating (1-5)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <Button type="submit" disabled={loading} className="bg-gray-500">
              Update Rating
            </Button>
          </form>
        </Form>
      </div>
        </>
    );
};

export default DecoratorForm;
