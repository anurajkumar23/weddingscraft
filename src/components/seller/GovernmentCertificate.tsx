"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select"; // Import react-select
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Form validation schema
const formSchema = z.object({
  pancard: z
    .string()
    .length(10, { message: "PAN card number must be exactly 10 characters" })
    .toUpperCase(),
  documentImages: z
    .array(z.instanceof(File))
    .min(1, { message: "Please upload a document" })
    .max(1, { message: "Only one file is allowed" }),
  categories: z
    .array(z.string())
    .min(1, { message: "Select at least one category" })
    .max(4, { message: "Select up to four categories" }), // Validate multi-select
});

type FormValues = z.infer<typeof formSchema>;

type ImportantInformationProps = {
  onComplete: () => void;
};

const GovernmentCertificate = ({ onComplete }: ImportantInformationProps) => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [existingDocument, setExistingDocument] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pancard: user.draft?.governmentInfo?.pancard || "",
      documentImages: [],
      categories: user.draft?.governmentInfo?.allowed || [],
    },
  });

  const categoryOptions = [
    { value: "Banquet", label: "Banquet" },
    { value: "Caterer", label: "Caterer" },
    { value: "Photographer", label: "Photographer" },
    { value: "Decorator", label: "Decorator" },
  ];

  useEffect(() => {
    if (user.draft?.governmentInfo?.document) {
      setExistingDocument(user.draft.governmentInfo.document);
    }
  }, [user]);

  const onSubmit = async (values: FormValues) => {
    console.log(values);
    // const formData = new FormData();
    // formData.append("pancard", values.pancard);
    // formData.append("document", values.documentImages[0]); // Append the file to FormData
    // formData.append("categories", JSON.stringify(values.categories)); // Append categories


    try {
      const content = "application/pdf";
      const token = localStorage.getItem("jwt_token");
     

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${user._id}/sellerdraft?draft=governmentInfo`,
        {pancard:values.pancard,allowed:values.categories},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.data, "Government certificate response");

       const responsePresigned = await axios.post(
        "http://localhost:8000/api/user/uploadDocs",
        { id: user._id, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(responsePresigned,"presigned")
      if (responsePresigned.status === 200) {
        const presignedPUTURL = responsePresigned.data.data.presignedPUTURL;
        const filename=responsePresigned.data.data.filename
        console.log(filename,user._id)
        const blob = new Blob([values.documentImages[0]]);
        await fetch(presignedPUTURL, {
          method: 'PUT',
          headers: {
            'Content-Type': content,
          },
          body: blob,
        });
        await axios.patch(
          `http://localhost:8000/api/user/${user._id}/sellerdraft/documentupdate`,
          { document: filename,draft:"governmentInfo"},
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          }
        );
      }






      toast.success("Government certificate submitted successfully!");
      setUser(response.data.data);
      // router.push(router.asPath);
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

  const handleCategoryChange = (selectedOptions: any) => {
    const categories = selectedOptions.map((option: any) => option.value);
    form.setValue("categories", categories); // Store selected categories
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
                    <FormLabel>Upload Document (PDF only)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf" // Only accept PDF files
                        onChange={handleFileChange}
                        aria-invalid={!!form.formState.errors.documentImages}
                      />
                    </FormControl>
                    <FormMessage />
                    {existingDocument && (
                      <p className="text-blue-500 mt-2">
                        <a
                          href={existingDocument}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View existing document
                        </a>
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Your Service</FormLabel>
                    <FormControl>
                      <Select
                        isMulti
                        options={categoryOptions}
                        value={categoryOptions.filter(option =>
                          field.value.includes(option.value)
                        )}
                        onChange={handleCategoryChange}
                        aria-invalid={!!form.formState.errors.categories}
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
