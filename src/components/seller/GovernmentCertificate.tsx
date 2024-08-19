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
  pancard: z
    .string()
    .min(5, { message: "Please enter a valid PAN card number" }),
  GSTNO: z.string().min(15, { message: "Please enter a valid GST number" }),
  documentImages: z
    .array(z.object({
      name: z.string(), // Validate file name
      type: z.string().regex(/application\/pdf/, { message: "Only PDF files are allowed" }), // Validate file type
      size: z.number().max(5 * 1024 * 1024, { message: "File size must be less than 5MB" }) // Validate file size
    }))
    .min(1, { message: "Please upload a document" })
    .max(1, { message: "Only one file is allowed" })
});

type FormValues = z.infer<typeof formSchema>;

type ImportantInformationProps = {
  onComplete: () => void;
};

const GovernmentCertificate = ({ onComplete }: ImportantInformationProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pancard: "",
      GSTNO: "",
      documentImages: [],
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    onComplete();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file (only one since 'multiple' is removed)
    if (file) {
      // Update the form's documentImages field with the selected file
      form.setValue("documentImages", [{ name: file.name, type: file.type, size: file.size }]);
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
