import Banquet from '@/components/seller/post/Banquet';
import Carterer from '@/components/seller/post/Carterer';
import Decorator from '@/components/seller/post/Decorator';
import Photographer from '@/components/seller/post/photographer';
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
      ContentComponent = Banquet;
      break;
    case 'caterer':
      ContentComponent = Carterer;
      break;
    case 'decorator':
      ContentComponent = Decorator;
      break;
    case 'photographer':
      ContentComponent = Photographer;
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
