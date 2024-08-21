"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/app/authContext";

// Form validation schema
const formSchema = z.object({
    GSTNO: z.string()
        .length(15, { message: "GST number must be exactly 15 characters" }),
    bank: z.object({
        name: z.string()
            .min(2, { message: "Please enter a valid bank name" }),
        account: z.string()
            .min(8, { message: "Please enter a valid account number" })
            .max(16, { message: "Account number must be at most 16 characters" }),
        reenterAccount: z.string()
            .min(8, { message: "Please re-enter your account number" })
            .max(16, { message: "Re-entered account number must be at most 16 characters" }),
        ifsc: z.string()
            .min(11, { message: "Please enter a valid IFSC code" }),
        holdername: z.string()
            .min(2, { message: "Please enter a valid account holder name" }),
    }).refine(data => data.account === data.reenterAccount, {
        path: ["reenterAccount"],
        message: "Account numbers do not match",
    }),
});

type ImportantInformationProps = {
    onComplete: () => void;
};

const ImportantInformation = ({ onComplete }: ImportantInformationProps) => {
    const { user,setUser } = useAuth();
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            GSTNO: "",
            bank: {
                name: "",
                account: "",
                reenterAccount: "",
                ifsc: "",
                holdername: "",
            },
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log(values,"values")
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user._id}/sellerdraft?draft=importantInfo`,
                values
            );

            console.log(response.data, "Important info response");

            toast.success(" Important Information submitted successfully!");
            setUser(response.data);
            onComplete();
        } catch (error) {
            console.error("Error submitting important info", error);
            toast.error("Failed to submit, please try again later.");
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Important Information</h2>
            <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="GSTNO"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GST Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your GST number"
                                                {...field}
                                                aria-invalid={!!form.formState.errors.GSTNO}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bank.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bank Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your bank name"
                                                {...field}
                                                aria-invalid={!!form.formState.errors.bank?.name}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bank.account"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your bank account number"
                                                {...field}
                                                aria-invalid={!!form.formState.errors.bank?.account}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bank.reenterAccount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Re-enter Account Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Re-enter your bank account number"
                                                {...field}
                                                aria-invalid={!!form.formState.errors.bank?.reenterAccount}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bank.ifsc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>IFSC Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your bank's IFSC code"
                                                {...field}
                                                aria-invalid={!!form.formState.errors.bank?.ifsc}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bank.holdername"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Holder Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter the account holder's name"
                                                {...field}
                                                aria-invalid={!!form.formState.errors.bank?.holdername}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ImportantInformation;
