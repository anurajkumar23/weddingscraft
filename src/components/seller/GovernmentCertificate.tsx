"use client";

import { useState } from "react";
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
import Image from "next/image";

// Form validation schema
const formSchema = z.object({
  pancard: z.string().min(5, { message: "Please enter a valid PAN card number" }),
  GSTNO: z.string().min(15, { message: "Please enter a valid GST number" }),
  documentImages: z
    .array(z.string()) // Adjusted to handle image URLs
    .min(2, "Please upload both front and back images"),
});

type FormValues = z.infer<typeof formSchema>;

type ImportantInformationProps = {
  onComplete: () => void;
};

const GovernmentCertificate = ({ onComplete }: ImportantInformationProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      form.setValue("documentImages", [...form.getValues("documentImages"), ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
    form.setValue("documentImages", updatedPreviews);  // Update the form value as well
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Government Certificate Verification</h2>
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
                    <FormLabel>Upload Front and Back of Document (e.g., Aadhar Card, Driving License)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          handleImageChange(e);
                          field.onChange([...form.getValues("documentImages"), ...imagePreviews]); // Update the field value
                        }}
                        aria-invalid={!!form.formState.errors.documentImages}
                      />
                    </FormControl>
                    {imagePreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <Image
                              width={500}
                              height={500}
                              src={preview}
                              alt={`Document Preview ${index + 1}`}
                              className="w-full h-auto rounded-md shadow-md"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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

export default GovernmentCertificate;
