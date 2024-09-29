
import BanquetPageData from '@/components/seller/post/banquet/page';
import CatererPage from '@/components/seller/post/caterers/page';
import DecoratorPage from '@/components/seller/post/decorator/page';
import PhotographerPage from '@/components/seller/post/photographers/page';
import React from 'react';

interface Props {
  params: {
    category: string;
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const { category } = params;

  let ContentComponent;

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
      // eslint-disable-next-line react/display-name
      ContentComponent = () => <p>No content available for this category.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Category: {category}</h1>
      <p className="mt-2">
        You are viewing posts related to <strong>{category}</strong>.
      </p>
      <ContentComponent />
    </div>
  );
};

export default Page;
