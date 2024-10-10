"use client"

import * as z from "zod"
import axios from "axios"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const menuItemSchema = z.object({
  starter: z.array(z.string()).default([]),
  maincourse: z.array(z.string()).default([]),
  desert: z.array(z.string()).default([]),
  welcomedrink: z.array(z.string()).default([]),
  breads: z.array(z.string()).default([]),
  rice: z.array(z.string()).default([]),
})

const addonItemSchema = z.object({
  name: z.string(),
  price: z.string(),
})

const packageSchema = z.object({
  price: z.coerce.number().min(0, "Price must be at least 0"),
  veg: menuItemSchema,
  nonveg: menuItemSchema,
  addon: z.object({
    starter: z.array(addonItemSchema).default([]),
    maincourse: z.array(addonItemSchema).default([]),
    desert: z.array(addonItemSchema).default([]),
    welcomedrink: z.array(addonItemSchema).default([]),
    breads: z.array(addonItemSchema).default([]),
    rice: z.array(addonItemSchema).default([]),
  }),
})

const formSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  contactUs: z.string()
  .min(10, "Contact number must be exactly 10 digits")
  .max(10, "Contact number must be exactly 10 digits")
  .regex(/^\d+$/, "Contact number must contain only digits"),

  yearOfEstd: z.number().int().min(1800, "Year must be 1800 or later").max(new Date().getFullYear(), "Year cannot be in the future"),
  basic: packageSchema.optional(),
  standard: packageSchema.optional(),
  deluxe: packageSchema.optional(),
})

type CatererFormValues = z.infer<typeof formSchema>

interface CatererFormProps {
  initialData: CatererFormValues | null;
}

const defaultPackageValues = {
  price: 0,
  veg: { starter: [], maincourse: [], desert: [], welcomedrink: [], breads: [], rice: [] },
  nonveg: { starter: [], maincourse: [], desert: [], welcomedrink: [], breads: [], rice: [] },
  addon: { starter: [], maincourse: [], desert: [], welcomedrink: [], breads: [], rice: [] },
}

export default function CatererForm({ initialData }: CatererFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activePackages, setActivePackages] = useState<("basic" | "standard" | "deluxe")[]>(
    initialData ? Object.keys(initialData).filter(key => ["basic", "standard", "deluxe"].includes(key)) as ("basic" | "standard" | "deluxe")[] : ["basic"]
  )

  const title = initialData ? "Edit Caterer" : "Create Caterer"
  const description = initialData ? "Edit a caterer." : "Add a new caterer"
  const toastMessage = initialData ? "Caterer updated." : "Caterer created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<CatererFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      contactUs: undefined,
      yearOfEstd: new Date().getFullYear(),
      basic: defaultPackageValues,
    },
  })

  useEffect(() => {
    const currentValues = form.getValues()
    const updatedValues = { ...currentValues }

    activePackages.forEach(packageType => {
      if (!currentValues[packageType]) {
        updatedValues[packageType] = defaultPackageValues
      }
    })

    Object.keys(currentValues).forEach((key) => {
      if (["basic", "standard", "deluxe"].includes(key as any) && !activePackages.includes(key as "basic" | "standard" | "deluxe")) {
        delete updatedValues[key as "basic" | "standard" | "deluxe"];
      }
    });
    
    form.reset(updatedValues)
  }, [activePackages, form])

  const onSubmit = async (data: CatererFormValues) => {
    const token = localStorage.getItem("jwt_token")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    try {
      setLoading(true)
      if (initialData?._id) {
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/caterer/${initialData._id}`, data, config)
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/caterer`, data, config)
      }
      router.refresh()
      router.push(`/seller/post/caterer?refreshId=${new Date().getTime()}`)
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

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
      if (initialData?._id) {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/caterer/${initialData._id}/Caterer`, config)
        router.refresh()
        router.push(`/seller/post/caterer?refreshId=${new Date().getTime()}`)
        toast.success("Caterer deleted.")
      }
    } catch (error: any) {
      toast.error("Make sure to remove all related data first.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const renderMenuSection = (packageType: "basic" | "standard" | "deluxe", section: "veg" | "nonveg", title: string) => (
    <div className="container bg-slate-100 p-5 rounded-lg font-bold">
      <Heading title={title} description={`${title} Menu Items`} />
      <Separator className="mt-2 mb-2" />
      <div className="md:grid md:grid-cols-2 gap-8">
        {(["starter", "maincourse", "desert", "welcomedrink", "breads", "rice"] as const).map((item) => (
          <FormField
            key={item}
            control={form.control}
            name={`${packageType}.${section}.${item}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.charAt(0).toUpperCase() + item.slice(1)}</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {field.value && field.value.map((value: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          disabled={loading}
                          placeholder={item.charAt(0).toUpperCase() + item.slice(1)}
                          value={value}
                          onChange={(e) => {
                            const updatedValue = [...field.value]
                            updatedValue[index] = e.target.value
                            field.onChange(updatedValue)
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const updatedValue = field.value.filter((_, i) => i !== index)
                            field.onChange(updatedValue)
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => {
                        const updatedValue = [...(field.value || []), '']
                        field.onChange(updatedValue)
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
        ))}
      </div>
    </div>
  )

  const renderAddonSection = (packageType: "basic" | "standard" | "deluxe") => (
    <div className="container bg-slate-100 p-5 rounded-lg font-bold">
      <Heading title="Add-on Items" description="Add-on Menu Items" />
      <Separator className="mt-2 mb-2" />
      <div className="md:grid md:grid-cols-2 gap-8">
        {(["starter", "maincourse", "desert", "welcomedrink", "breads", "rice"] as const).map((item) => (
          <FormField
            key={item}
            control={form.control}
            name={`${packageType}.addon.${item}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`${item.charAt(0).toUpperCase() + item.slice(1)} Add-ons`}</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {field.value && field.value.map((addon: z.infer<typeof addonItemSchema>, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          disabled={loading}
                          placeholder="Name"
                          value={addon.name}
                          onChange={(e) => {
                            const updatedValue = [...field.value]
                            updatedValue[index] = { ...updatedValue[index], name: e.target.value }
                            field.onChange(updatedValue)
                          }}
                        />
                        <Input
                          disabled={loading}
                          placeholder="Price"
                          value={addon.price}
                          onChange={(e) => {
                            const updatedValue = [...field.value]
                            updatedValue[index] = { ...updatedValue[index], price: e.target.value }
                            field.onChange(updatedValue)
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const updatedValue = field.value.filter((_, i) => i !== index)
                            field.onChange(updatedValue)
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => {
                        const updatedValue = [...(field.value || []), { name: '', price: '' }]
                        field.onChange(updatedValue)
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
        ))}
      </div>
    </div>
  )

  const renderPackageSection = (packageType: "basic" | "standard" | "deluxe") => (
    <div key={packageType} className="space-y-8">
      <Heading title={`${packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package`} description={`${packageType.charAt(0).toUpperCase() + packageType.slice(1)} package details`} />
      <FormField
        control={form.control}
        name={`${packageType}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder="Price" {...field} type="number" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {renderMenuSection(packageType, "veg", "Veg Items")}
      {renderMenuSection(packageType, "nonveg", "Non-Veg Items")}
      {renderAddonSection(packageType)}
    </div>
  )

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="my-4 md:grid md:grid-cols-2 gap-8 container bg-slate-100 p-5 rounded-lg font-bold">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caterer Name</FormLabel>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={loading} placeholder="Describe your catering service" {...field} />
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
                    <Input disabled={loading} placeholder="1234567890" {...field} />
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
                      placeholder="2020" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <Heading title="Package Types" description="Select the package types you want to offer" />
            <div className="flex space-x-4">
              {["basic", "standard", "deluxe"].map((packageType) => (
                <div key={packageType} className="flex items-center space-x-2">
                  <Checkbox
                    id={packageType}
                    checked={activePackages.includes(packageType as "basic" | "standard" | "deluxe")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setActivePackages([...activePackages, packageType as "basic" | "standard" | "deluxe"])
                      } else {
                        setActivePackages(activePackages.filter(p => p !== packageType))
                      }
                    }}
                  />
                  <label
                    htmlFor={packageType}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {packageType.charAt(0).toUpperCase() + packageType.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {activePackages.map((packageType) => renderPackageSection(packageType))}
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}