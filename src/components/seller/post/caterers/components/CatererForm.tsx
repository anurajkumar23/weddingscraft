"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
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

const formSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  contactUs:z.coerce.number().min(0, "Fill your contact details"),
  basic: z.object({
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
  }),
})

type CatererFormValues = z.infer<typeof formSchema>

interface CatererFormProps {
  initialData: CatererFormValues | null
}

export default function CatererForm({ initialData }: CatererFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit Caterer" : "Create Caterer"
  const description = initialData ? "Edit a caterer." : "Add a new caterer"
  const toastMessage = initialData ? "Caterer updated." : "Caterer created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<CatererFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      contactUs:undefined,
      basic: {
        veg: {
          starter: [],
          maincourse: [],
          desert: [],
          welcomedrink: [],
          breads: [],
          rice: [],
        },
        nonveg: {
          starter: [],
          maincourse: [],
          desert: [],
          welcomedrink: [],
          breads: [],
          rice: [],
        },
        addon: {
          starter: [],
          maincourse: [],
          desert: [],
          welcomedrink: [],
          breads: [],
          rice: [],
        },
      },
    },
  })

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
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      if (initialData) {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/caterer/${initialData._id}`, config)
        router.refresh()
        router.push(`/seller/post/caterer`)
        toast.success("Caterer deleted.")
      }
    } catch (error: any) {
      toast.error("Make sure to remove all related data first.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const renderMenuSection = (section: "veg" | "nonveg", title: string) => (
    <div className="container bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1]">
      <Heading title={title} description={`${title} Menu Items`} />
      <Separator className="mt-2 mb-2" />
      <div className="md:grid md:grid-cols-2 gap-8">
        {(["starter", "maincourse", "desert", "welcomedrink", "breads", "rice"] as const).map((item) => (
          <FormField
            key={item}
            control={form.control}
            name={`basic.${section}.${item}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.charAt(0).toUpperCase() + item.slice(1)}</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {field.value.map((value: string, index: number) => (
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
                        const updatedValue = [...field.value, '']
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

  const renderAddonSection = () => (
    <div className="container bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1]">
      <Heading title="Add-on Items" description="Add-on Menu Items" />
      <Separator className="mt-2 mb-2" />
      <div className="md:grid md:grid-cols-2 gap-8">
        {(["starter", "maincourse", "desert", "welcomedrink", "breads", "rice"] as const).map((item) => (
          <FormField
            key={item}
            control={form.control}
            name={`basic.addon.${item}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`${item.charAt(0).toUpperCase() + item.slice(1)} Add-ons`}</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {field.value.map((addon: z.infer<typeof addonItemSchema>, index: number) => (
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
                        const updatedValue = [...field.value, { name: '', price: '' }]
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

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)} 
        onConfirm={onDelete} 
        loading={loading} 
      />
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
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="my-4 md:grid md:grid-cols-2 gap-8 container bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1]">
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
              name="price"
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
          </div>
          {renderMenuSection("veg", "Veg Items")}
          {renderMenuSection("nonveg", "Non-Veg Items")}
          {renderAddonSection()}
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
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      
      </Form>
    </>
  )
}