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

// Form validation schema
const formSchema = z.object({
    pancard: z.string().min(5, { message: "Please enter a valid PAN card number" }),
    GSTNO: z.string().min(15, { message: "Please enter a valid GST number" }),
    address: z.string().min(5, { message: "Please enter a valid address" }),
    bank: z.object({
        name: z.string().min(2, { message: "Please enter a valid bank name" }),
        account: z.string().min(8, { message: "Please enter a valid account number" }),
        reenterAccount: z.string().min(8, { message: "Please re-enter your account number" }),
        ifsc: z.string().min(11, { message: "Please enter a valid IFSC code" }),
        holdername: z.string().min(2, { message: "Please enter a valid account holder name" }),
    }).refine(data => data.account === data.reenterAccount, {
        path: ["reenterAccount"],
        message: "Account numbers do not match",
    }),
});

type ImportantInformationProps = {
    onComplete: () => void;
};

const ImportantInformation = ({ onComplete }: ImportantInformationProps) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pancard: "",
            GSTNO: "",
            address: "",
            bank: {
                name: "",
                account: "",
                reenterAccount: "",
                ifsc: "",
                holdername: "",
            },
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        onComplete();
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Important Information</h2>
            <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* <FormField
                                control={form.control}
                                name="pancard"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PAN Card Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your PAN card number"
                                                {...field}
                                                aria-invalid={!!form.formState.errors.pancard}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                            /> */}

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your address"
                                                {...field}
                                                aria-invalid={!!form.formState.errors.address}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Bank Information */}
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
