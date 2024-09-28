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
import { MultiSelect } from "@/components/ui/multi-select"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.object({
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),
    pincode: z.string().min(1, "Pincode is required"),
  }),
  services: z.array(z.string()).optional(),
  description: z.string().min(1, "Description is required"),
  price: z.string().optional(),
  capacity: z.string().optional(),
  specialFeature: z.array(z.string()).optional(),
  yearOfEstd: z.string().optional(),
  availability: z.array(z.string()).optional(),
  openHours: z.string().optional(),
  operatingDays: z.string().optional(),
  type: z.string().optional(),
  billboard: z.string().optional(),
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
      price: '',
      capacity: '',
      specialFeature: [],
      yearOfEstd: '',
      availability: [],
      openHours: '',
      operatingDays: '',
      type: '',
      billboard: '',
    },
  });

  const onSubmit = async (data: BanquetFormValues) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const payload = {
        ...data,
        price: parseFloat(data.price),
        capacity: parseInt(data.capacity),
        yearOfEstd: parseInt(data.yearOfEstd),
      };

      if (initialData) {
        await axios.patch(`http://localhost:8000/api/banquet/${params.id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        await axios.post(`http://localhost:8000/api/banquet`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
      router.refresh();
      router.push(`/banquet`);
      toast.success(toastMessage);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      await axios.delete(`http://localhost:8000/api/banquet/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      router.refresh();
      router.push(`/banquet`);
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
                    <MultiSelect
                     options={[
                      { value: 'Catering', label: 'Catering' },
                      { value: 'Decorations', label: 'Decorations' },
                      { value: 'DJ', label: 'DJ' },
                      { value: 'Photography', label: 'Photography' },
                    ]}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select services"
                    />
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
                    <Input type="number" disabled={loading} placeholder="Price" {...field} />
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
                    <Input type="number" disabled={loading} placeholder="Capacity" {...field} />
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
                  <FormLabel>Special Features</FormLabel>
                  <FormControl>
                    <MultiSelect
                      // disabled={loading}
                      placeholder="Select special features"
                      options={[
                        { value: 'Valet Parking', label: 'Valet Parking' },
                        { value: 'Private Garden', label: 'Private Garden' },
                      ]}
                      selected={field.value}
                      onChange={field.onChange}
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
                  <FormLabel>Year of Establishment</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="Year of Establishment" {...field} />
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
                    <MultiSelect
                      // disabled={loading}
                      placeholder="Select availability"
                      options={[
                        { value: 'Weekdays', label: 'Weekdays' },
                        { value: 'Weekends', label: 'Weekends' },
                      ]}
                      selected={field.value}
                      onChange={field.onChange}
                    />
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
                    <Input disabled={loading} placeholder="e.g., Monday to Sunday" {...field} />
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