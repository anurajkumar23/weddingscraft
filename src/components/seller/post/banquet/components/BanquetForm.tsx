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
// import ImageUpload from "@/components/ui/image-upload"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  name: z.string().min(1),
  rating: z.number().min(0).max(5),
  location: z.object({
    city: z.string().min(1),
    area: z.string().min(1),
    pincode: z.string().min(1),
  }),
  description: z.string().min(1),
  price: z.number().min(0),
  capacity: z.number().min(1),
  type: z.string().min(1),
  yearOfEstd: z.number().min(1800).max(new Date().getFullYear()),
  contactUs: z.string().min(1),
  specialFeature: z.array(z.string()),
  availability: z.array(z.string()),
  operatingDays: z.string().min(1),
  openHours: z.string().min(1),
  imageUrl: z.string().min(1),
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
      rating: 0,
      location: { city: '', area: '', pincode: '' },
      description: '',
      price: 0,
      capacity: 0,
      type: '',
      yearOfEstd: new Date().getFullYear(),
      contactUs: '',
      specialFeature: [],
      availability: [],
      operatingDays: '',
      openHours: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data: BanquetFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/banquets/${params.id}`, data);
      } else {
        await axios.post(`/api/banquets`, data);
      }
      router.refresh();
      router.push(`/banquets`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/banquets/${params.id}`);
      router.refresh();
      router.push(`/banquets`);
      toast.success('Banquet deleted.');
    } catch (error: any) {
      toast.error('Something went wrong.');
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
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="Rating" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
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
                    <Input type="number" disabled={loading} placeholder="Price" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
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
                    <Input type="number" disabled={loading} placeholder="Capacity" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
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
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <Input type="number" disabled={loading} placeholder="Year of Establishment" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
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
                  <FormLabel>Contact Us</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Contact information" {...field} />
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
                    <Input disabled={loading} placeholder="Special features (comma-separated)" {...field} onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))} />
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
                    <Input disabled={loading} placeholder="Availability (comma-separated)" {...field} onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))} />
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
                    <Input disabled={loading} placeholder="Operating days" {...field} />
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
                    <Input disabled={loading} placeholder="Open hours" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};