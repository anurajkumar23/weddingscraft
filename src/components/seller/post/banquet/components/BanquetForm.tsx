"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/model/alert-model"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(40, "Name cannot exceed 40 characters"),
  location: z.object({
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),
    pincode: z.string().min(1, "Pincode is required"),
  }),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  capacity: z.number().int().min(1, "Capacity must be a positive integer"),
  services: z.array(z.string()).min(1, "At least one service is required"),
  yearOfEstd: z.number().int().min(1800, "Year must be 1800 or later").max(new Date().getFullYear(), "Year cannot be in the future"),
  availability: z.array(z.string()).min(1, "At least one availability is required"),
  openHours: z.string().min(1, "Open hours are required"),
  operatingDays: z.string().min(1, "Operating days are required"),
  type: z.enum(['AC', 'Non-AC']),
  billboard: z.string().max(255).optional(),
  specialFeature: z.array(z.string()).optional(),
});

type BanquetFormValues = z.infer<typeof formSchema>

interface BanquetFormProps {
  initialData: BanquetFormValues | null;
}

export const BanquetForm: React.FC<BanquetFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Banquet' : 'Create Banquet';
  const description = initialData ? 'Edit a banquet.' : 'Add a new banquet';
  const toastMessage = initialData ? 'Banquet updated.' : 'Banquet created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BanquetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      location: { city: '', area: '', pincode: '' },
      services: [],
      description: '',
      price: 0,
      capacity: 0,
      specialFeature: [],
      yearOfEstd: new Date().getFullYear(),
      availability: [],
      openHours: '',
      operatingDays: '',
      type: 'AC',
      billboard: '',
    },
  });

  const onSubmit = async (data: BanquetFormValues) => {
    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      if (!token) {
        throw new Error("Authentication token not found");
      }

      if (initialData) {
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/banquet/${params.id}`, data, config);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/banquet`, data, config);
      }

      router.refresh();
      router.push(`/seller/post/banquet`);
      toast.success(toastMessage);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
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
      if (!token) {
        throw new Error("Authentication token not found");
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/banquet/${params.id}/Banquet`, config);
      router.refresh();
      router.push(`/seller/post/banquet?refreshId=${new Date().getTime()}`);
      toast.success('Banquet deleted.');
    } catch (error: any) {
      console.error("Error deleting banquet:", error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

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
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full py-6">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Banquet name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Services</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {(field.value || []).map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            disabled={loading}
                            placeholder="Services"
                            value={item}
                            onChange={(e) => {
                              const updatedValue = [...(field.value || [])];
                              updatedValue[index] = e.target.value;
                              field.onChange(updatedValue);
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
                          const updatedValue = [...(field.value || []), ''];
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={loading} placeholder="Description" {...field} />
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
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Price"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Capacity"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialFeature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Feature</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {(field.value || []).map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            disabled={loading}
                            placeholder="Special Feature"
                            value={item}
                            onChange={(e) => {
                              const updatedValue = [...(field.value || [])];
                              updatedValue[index] = e.target.value;
                              field.onChange(updatedValue);
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
                          const updatedValue = [...(field.value || []), ''];
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
            <FormField
              control={form.control}
              name="yearOfEstd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Establishment</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Year of Establishment"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {(field.value || []).map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            disabled={loading}
                            placeholder="availability"
                            value={item}
                            onChange={(e) => {
                              const updatedValue = [...(field.value || [])];
                              updatedValue[index] = e.target.value;
                              field.onChange(updatedValue);
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
                          const updatedValue = [...(field.value || []), ''];
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
            <FormField
              control={form.control}
              name="openHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Hours</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="e.g., 10:00 AM - 11:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operatingDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operating Days</FormLabel>
                  <FormControl>
                    <Input  disabled={loading} placeholder="e.g., Monday to Sunday" {...field} />
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
                  <FormLabel>Type</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="Non-AC">Non-AC</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard information" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};