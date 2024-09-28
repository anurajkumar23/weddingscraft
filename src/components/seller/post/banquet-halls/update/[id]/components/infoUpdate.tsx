"use client";
import { useState, useRef } from "react";
import axios from "axios";
import Image from 'next/image';
import { postBanquet as FormValues } from "@/interfaces/banquet";
import toast from "react-hot-toast";

const InfoUpdate = ({ banquet,id }:{banquet:FormValues,id:string}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Refs to store form field values
  const nameRef = useRef(banquet.name);
  const cityRef = useRef(banquet.location.city);
  const pincodeRef = useRef(banquet.location.pincode);
  const areaRef = useRef(banquet.location.area);
  const descriptionRef = useRef(banquet.description);
  const priceRef = useRef(banquet.price);
  const capacityRef = useRef(banquet.capacity);
  const yearOfEstdRef = useRef(banquet.yearOfEstd);
  const openHoursRef = useRef(banquet.openHours);
  const operatingDaysRef = useRef(banquet.operatingDays);
  const typeRef = useRef(banquet.type);
  const billboardRef = useRef(banquet.billboard);

  const servicesRef = useRef(banquet.services);
  const specialFeatureRef = useRef(banquet.specialFeature);
  const availabilityRef = useRef(banquet.availability);

  const handleFileChange = (event:any) => {
    const file = event.target.files?.[0] || null;
    billboardRef.current = file;
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    // Create formData and append fields
    const formData = new FormData();
    formData.append("name", nameRef.current);
    formData.append("location", JSON.stringify({
      city: cityRef.current,
      pincode: pincodeRef.current,
      area: areaRef.current,
    }));
    formData.append("description", descriptionRef.current);
    formData.append("price", priceRef.current);
    formData.append("capacity", capacityRef.current);
    formData.append("yearOfEstd", yearOfEstdRef.current);
    formData.append("openHours", openHoursRef.current);
    formData.append("operatingDays", operatingDaysRef.current);
    formData.append("type", typeRef.current);
    formData.append("services", JSON.stringify(servicesRef.current));
    formData.append("specialFeature", JSON.stringify(specialFeatureRef.current));
    formData.append("availability", JSON.stringify(availabilityRef.current));

    if (billboardRef.current) {
      formData.append("billboard", billboardRef.current);
    }

    // Set up headers with JWT token
    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      
      const response = await axios.patch(
        `http://localhost:3000/api/banquet/${id}`,
        formData,
        config
      );
      console.log("🤩🤩🤩🤩🤩🤩🤩", response.status);
      if(response.status===200){
        toast.success("Updated Successfully")
      }
      // Handle success (if needed)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (if needed)
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Step 1 */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="RadhaKrishna Banquet"
                defaultValue={nameRef.current}
                onChange={(e) => (nameRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                City: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="City"
                defaultValue={cityRef.current}
                onChange={(e) => (cityRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Pincode: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Pincode"
                defaultValue={pincodeRef.current}
                onChange={(e) => (pincodeRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Area: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Area"
                defaultValue={areaRef.current}
                onChange={(e) => (areaRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Description: <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Description"
                defaultValue={descriptionRef.current}
                onChange={(e) => (descriptionRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Cover Photo: <span className="text-red-500">*</span>
                {billboardRef.current && (
                  <Image
                    src={`/images/banquet/${billboardRef.current}`}
                    width={500}
                    height={500}
                    alt="Cover Photo"
                  />
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {/* Step 2 */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Additional Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Price: <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="50000"
                defaultValue={priceRef.current}
                onChange={(e) => (priceRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Capacity: <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="200"
                defaultValue={capacityRef.current}
                onChange={(e) => (capacityRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Year Established: <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="2000"
                defaultValue={yearOfEstdRef.current}
                onChange={(e) => (yearOfEstdRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Open Hours: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="9 AM - 10 PM"
                defaultValue={openHoursRef.current}
                onChange={(e) => (openHoursRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Operating Days: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Mon-Sun"
                defaultValue={operatingDaysRef.current}
                onChange={(e) => (operatingDaysRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Type: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Banquet Hall"
                defaultValue={typeRef.current}
                onChange={(e) => (typeRef.current = e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {/* Step 3 */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Additional Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Services:
              </label>
              <input
                type="text"
                placeholder="Service 1, Service 2"
                defaultValue={servicesRef.current.join(', ')}
                onChange={(e) => (servicesRef.current = e.target.value.split(',').map(s => s.trim()))}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Special Features:
              </label>
              <input
                type="text"
                placeholder="Feature 1, Feature 2"
                defaultValue={specialFeatureRef.current.join(', ')}
                onChange={(e) => (specialFeatureRef.current = e.target.value.split(',').map(s => s.trim()))}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Availability:
              </label>
              <input
                type="text"
                placeholder="Available, Not Available"
                defaultValue={availabilityRef.current.join(', ')}
                onChange={(e) => (availabilityRef.current = e.target.value.split(',').map(s => s.trim()))}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 bg-gray-700 text-white"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default InfoUpdate;
