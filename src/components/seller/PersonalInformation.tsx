"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/app/authContext";
import { toast } from "react-toastify";

const formSchema = z.object({
    firstName: z.string()
      .min(2, { message: "Please enter a valid first name" })
      .max(25, { message: "First name must be at most 25 characters" }),
    middleName: z.string().optional(),
    lastName: z.string()
      .min(2, { message: "Please enter a valid last name" })
      .max(25, { message: "Last name must be at most 25 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phoneNumber: z.string().length(10, { message: "Phone number must be exactly 10 digits" }),
    address: z.string().min(5, { message: "Please enter a valid address" }),
    whatsappNumber: z.string().length(10, { message: "WhatsApp number must be exactly 10 digits" }),
    pincode: z.string().length(6, { message: "Pincode must be exactly 6 digits" }),
    city: z.string().min(2, { message: "Please enter a valid city" }),
    state: z.string().min(2, { message: "Please enter a valid state" }),
  });
  
  

type PersonalInformationProps = {
    onComplete: () => void;
  };

const PersonalInformation = ({ onComplete }:PersonalInformationProps ) => {
    const {user} =useAuth()
  
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            whatsappNumber: "",
            pincode: "",
            city: "",
            state: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    
        console.log(user._id,"hehehehehhehe")
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user._id}/sellerdraft?draft=personalInfo`,
                values
            );
    
            console.log(response.data, "personal info response");
    
            // Optionally display a success message
            toast.success("Information submitted successfully!");
            
            // Call the onComplete callback to proceed with the next step
            onComplete();
        } catch (error) {
            console.error("Error submitting personal info", error);
            
            // Show error notification
            toast.error("Failed to submit, please try again later.");
            
            // Re-throw the error if further handling is needed
            throw error;
        }
    };
    

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="middleName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your middle name (optional)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
  <FormField
                                control={form.control}
                                name="pincode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pincode</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your pincode" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your city" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your state" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="whatsappNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WhatsApp Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your WhatsApp number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full mt-4 bg-blue-600 text-white rounded-md">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default PersonalInformation;
