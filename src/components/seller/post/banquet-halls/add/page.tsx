"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { getValidationSchema } from "./components/formvalidate";
// import { AddbanquetSchema } from "./components/formvalidate";
import { postBanquet as FormValues } from "@/interfaces/banquet";
import axios from "axios";
import { connectToDB } from "@/utils/database";
connectToDB()


const initialValues: FormValues = {
  name: "",
  location: {
    city: "",
    pincode: "",
    area: "",
  },
  services: [""],
  description: "",
  price: "",
  capacity: "",
  specialFeature: [""],
  
  yearOfEstd: "",
  availability: [""],
  openHours: "",
  operatingDays: "",
  type: "AC",
  billboard: "",
};


export default function Page() {
  
  const searchParams = useSearchParams();



  const [currentStep, setCurrentStep] = useState(1);

  async function postBanquet(values: FormValues) {
    console.log("formData Entered")
      const formData = new FormData();
  
      // Append simple fields to formData
      formData.append('name', values.name);
      formData.append('location', JSON.stringify(values.location));
      formData.append('description', values.description);
      formData.append('price',values.price);
      formData.append('capacity', values.capacity);
      
      formData.append('yearOfEstd', values.yearOfEstd);
      formData.append('openHours', values.openHours);
      formData.append('operatingDays', values.operatingDays);
      formData.append('type', values.type);
      formData.append('services',JSON.stringify(values.services))
      formData.append('specialFeature',JSON.stringify(values.specialFeature))
      formData.append('availability',JSON.stringify(values.availability))
  
      // Append file field (if there's a file to be uploaded)
      if (values.billboard && values.billboard) {
          formData.append('billboard', values.billboard);
      }
  
      // Set up headers with JWT token
      const token = localStorage.getItem('jwt_token');
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
          },
      };
  
      try {
          // Send the POST request
          const response = await axios.post('http://localhost:3000/api/banquet', formData, config);
          console.log('Response:', response.data);
          // Handle success (if needed)
      } catch (error) {
          console.error('Error:', error);
          // Handle error (if needed)
      }
  }
  

  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(currentStep),
    onSubmit:  (values, action) => {
      console.log("values",values);
      const response =  postBanquet(values)
      // console.log("🚀 ~ onSubmit: ~ response:", response);

      // console.log("Form Data Submitted: ", values);
      // After submission, navigate to another page or show a success message
      // router.push("/somepage");
    },
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddField = (fieldName: string) => {
    formik.setFieldValue(fieldName, [...formik.values[fieldName], ""]);
  };

  const handleRemoveField = (fieldName: keyof FormValues, index: number) => {
    formik.setFieldValue(
      fieldName,
      formik.values[fieldName].filter((_, i) => i !== index)
    );
  };

  const handleFieldChange = (
    fieldName: string,
    index: number,
    value: string
  ) => {
    const updatedFields = formik.values[fieldName].map((item: any, i: number) =>
      i === index ? value : item
    );

    formik.setFieldValue(fieldName, updatedFields);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    console.log("File selected: ", file);
    formik.setFieldValue("billboard", file);
  };
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Add New Banquet 
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {/* //Step 1 */}
        {
          <div className={`${currentStep === 1 ? "block" : "hidden"}`}>
            <h2 className={`text-xl font-semibold text-gray-200 mb-4 `}>
              Basic Information
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="RadhaKrishna Banquet"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.name && formik.touched.name
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="font-semibold text-[#b40e0e]">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                Location - City: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Lucknow"
                name="location.city"
                value={formik.values.location.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.location?.city && formik.touched.location?.city
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.location?.city &&
                formik.touched.location?.city && (
                  <p className="font-semibold text-[#b40e0e]">
                    {formik.errors.location.city}
                  </p>
                )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Location - Pincode: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="210431"
                name="location.pincode"
                value={formik.values.location.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.location?.pincode &&
                  formik.touched.location?.pincode
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.location?.pincode &&
                formik.touched.location?.pincode && (
                  <p className="font-semibold text-[#b40e0e]">
                    {formik.errors.location.pincode}
                  </p>
                )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Location - Area: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="NewTown"
                name="location.area"
                value={formik.values.location.area}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.location?.area && formik.touched.location?.area
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.location?.area &&
                formik.touched.location?.area && (
                  <p className="font-semibold text-[#b40e0e]">
                    {formik.errors.location.area}
                  </p>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                Description: <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Write About your Banquet"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.description && formik.touched.description
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.description && formik.touched.description && (
                <p className="font-semibold text-[#b40e0e]">
                  {formik.errors.description}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Operating Days: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Mon - Wed"
                name="operatingDays"
                value={formik.values.operatingDays}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.operatingDays && formik.touched.operatingDays
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.operatingDays && formik.touched.operatingDays && (
                <p className="font-semibold text-[#b40e0e]">
                  {formik.errors.operatingDays}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Open Hours: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="10:00 AM to 6:00 PM"
                name="openHours"
                value={formik.values.openHours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.openHours && formik.touched.openHours
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.openHours && formik.touched.openHours && (
                <p className="font-semibold text-[#b40e0e]">
                  {formik.errors.openHours}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Type: <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.type && formik.touched.type
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              >
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
              {formik.errors.type && formik.touched.type && (
                <p className="font-semibold text-[#b40e0e]">
                  {formik.errors.type}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Cover Photo: <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="billboard"
                accept="image/*"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm `}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        }
        {/* //step 2 */}
        {
          <div className={`${currentStep === 2 ? "block" : "hidden"}`}>
            <h2
              className={`text-xl font-semibold text-gray-200 mb-4 ${
                currentStep === 2 ? "block" : "hidden"
              }`}
            >
              Services Provided
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Price: <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="50000"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.price && formik.touched.price
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.price && formik.touched.price && (
                <p className="font-semibold text-[#b40e0e]">
                  {formik.errors.price}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                People Handling Capacity:{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="capacity"
                placeholder="500"
                value={formik.values.capacity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.capacity && formik.touched.capacity
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.capacity && formik.touched.capacity && (
                <p className="font-semibold text-[#b40e0e]">
                  {formik.errors.capacity}
                </p>
              )}
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Year of Establishment: <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="yearOfEstd"
                placeholder="2008"
                value={formik.values.yearOfEstd}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  formik.errors.yearOfEstd && formik.touched.yearOfEstd
                    ? "border-[#b40e0e] bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-700 text-white"
                }`}
              />
              {formik.errors.yearOfEstd && formik.touched.yearOfEstd && (
                <p className="font-semibold text-[#b40e0e]">
                  {formik.errors.yearOfEstd}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        }
        {/* //Step 3 */}
        {
          <div className={`${currentStep === 3 ? "block" : "hidden"}`}>
            <h2
              className={`text-xl font-semibold text-gray-200 mb-4 ${
                currentStep === 3 ? "block" : "hidden"
              }`}
            >
              Additional Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Services: <span className="text-red-500">*</span>
              </label>
              {formik.values.services.map((service, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    required
                    value={service}
                    name={`services[${index}]`}
                    placeholder="Free-Wifi"
                    onChange={(e) =>
                      handleFieldChange("services", index, e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    key={index}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                      formik.errors.services && formik.touched.services
                        ? "border-[#b40e0e] bg-gray-700 text-white"
                        : "border-gray-300 bg-gray-700 text-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField("services", index)}
                    className="ml-2 py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("services")}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Service
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                Special Features:
              </label>
              {formik.values.specialFeature.map((feature, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    name={`specialFeature[${index}]`}
                    placeholder="car-parking / complimentary drinks"
                    value={feature}
                    onChange={(e) =>
                      handleFieldChange("specialFeature", index, e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                      formik.errors.specialFeature &&
                      formik.touched.specialFeature
                        ? "border-[#b40e0e] bg-gray-700 text-white"
                        : "border-gray-300 bg-gray-700 text-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField("specialFeature", index)}
                    className="ml-2 py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("specialFeature")}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Special Feature
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                Function Availability: <span className="text-red-500">*</span>
              </label>
              {formik.values.availability.map((avail, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    required
                    value={avail}
                    name={`availability[${index}]`}
                    placeholder="haldi / Marriage / Engagement"
                    onChange={(e) =>
                      handleFieldChange("availability", index, e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                      formik.errors.availability && formik.touched.availability
                        ? "border-[#b40e0e] bg-gray-700 text-white"
                        : "border-gray-300 bg-gray-700 text-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField("availability", index)}
                    className="ml-2 py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("availability")}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Availability
              </button>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  //   onClick={()=>console.log(formik.values)}

                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        }
      </form>
    </div>
  );
}
