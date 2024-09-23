"use client";
import { useAuth } from '@/app/authContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { user } = useAuth();
  const [allowedOptions, setAllowedOptions] = useState<string[]>([]);
  const router = useRouter();

  // Check if the user is allowed to post based on the sellerRequest
  useEffect(() => {
    if (user?.sellerRequest === 'accepted' && user?.draft?.governmentInfo?.allowed) {
      // Set allowed options based on user.draft.governmentInfo.allowed
      setAllowedOptions(user.draft.governmentInfo.allowed);
    }
  }, [user]);

  if (user?.sellerRequest !== 'accepted') {
    return <div className="w-full h-full">You are not allowed to post.</div>;
  }

  // Function to handle card click
  const handleCardClick = (category: string) => {
    router.push(`/seller/post/${category.toLowerCase()}`); // Navigate to the corresponding category page
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold mb-4">Post Allowed Categories</h2>
      {/* Render the allowed options inside cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allowedOptions.length > 0 ? (
          allowedOptions.map((option, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 hover:bg-blue-100 cursor-pointer transition"
              onClick={() => handleCardClick(option)} // Navigate to the selected category
            >
              <h3 className="text-xl font-semibold text-center">{option}</h3>
            </div>
          ))
        ) : (
          <p>No allowed options available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
