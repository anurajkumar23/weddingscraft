/* eslint-disable react/display-name */
import React from 'react';
import BanquetPageData from '@/components/seller/post/banquet/page';
import CatererPage from '@/components/seller/post/caterers/page';
import DecoratorPage from '@/components/seller/post/decorator/page';
import PhotographerPage from '@/components/seller/post/photographers/page';
import getSellerPost from "@/utils/SellerPost/SellerPost";

interface Props {
  params: {
    category: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const { category } = params;
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  let ContentComponent;
  let categoryData;
  let errorMessage = null;

  try {
    const response = await getSellerPost();
    categoryData = response.post[capitalizedCategory] || [];
  } catch (error) {
    console.error(`Error fetching ${capitalizedCategory} data:`, error);
    errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    categoryData = [];
  }

  switch (category) {
    case 'banquet':
      ContentComponent = BanquetPageData;
      break;
    case 'caterer':
      ContentComponent = CatererPage;
      break;
    case 'decorator':
      ContentComponent = DecoratorPage;
      break;
    case 'photographer':
      ContentComponent = PhotographerPage;
      break;
    default:
      ContentComponent = () => <p>No content available for this category.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Category: {capitalizedCategory}</h1>
      <p className="mt-2 mb-4">
        You are viewing posts related to <strong>{capitalizedCategory}</strong>.
      </p>
      {errorMessage ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      ) : (
        <ContentComponent data={categoryData} />
      )}
    </div>
  );
};

export default Page;