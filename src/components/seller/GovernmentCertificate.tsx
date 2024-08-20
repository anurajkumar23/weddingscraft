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
import { useAuth } from "@/app/authContext";
import axios from "axios";
import { toast } from "react-toastify";

// Form validation schema
const formSchema = z.object({
  pancard: z.string()
    .length(10, { message: "PAN card number must be exactly 10 characters" })
    .toUpperCase(),

  documentImages: z.array(z.instanceof(File))
    .min(1, { message: "Please upload a document" })
    .max(1, { message: "Only one file is allowed" }),
});

type FormValues = z.infer<typeof formSchema>;

type ImportantInformationProps = {
  onComplete: () => void;
};

const GovernmentCertificate = ({ onComplete }: ImportantInformationProps) => {
  const { user } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pancard: "",
      documentImages:[],
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values)
    const formData = new FormData();
    formData.append("pancard", values.pancard);
    formData.append("document", values.documentImages[0]); // Append the file to FormData

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user._id}/sellerdraft?draft=governmentInfo`,
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data, "Government certificate response");

      toast.success("Information submitted successfully!");
      onComplete();
    } catch (error) {
      console.error("Error submitting government certificate", error);
      toast.error("Failed to submit, please try again later.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      form.setValue("documentImages", [file]); // Store the File object directly
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Government Certificate Verification
      </h2>
      <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
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
                name="documentImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Upload Document (PDF only)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf" // Only accept PDF files
                        onChange={handleFileChange}
                        aria-invalid={!!form.formState.errors.documentImages}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GovernmentCertificate;
