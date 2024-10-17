import { DecoratorColumn } from "./components/columns";
import { DecoratorClient } from "./components/client"; 
import { DecoratorDocument } from "@/customTypes/DecoratorDocument";
import getDecorator from "@/utils/decorator/getDecorator";


interface DecoratorPageDataProps {
  data: DecoratorDocument[];
}

const DecoratorPage:React.FC<DecoratorPageDataProps> = async ({data}) => {
  try {
   
  const formattedDecorators: DecoratorColumn[] = data.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    description: item.description,
    rating: item.rating,
    location: item.location
      ? `${item.location.city || 'N/A'}, ${item.location.area || 'N/A'}, ${item.location.pincode || 'N/A'}`
      : 'Location not specified',
    price: item.price,
    contactUs: item.contactUs,
    yearOfEstd: item.yearOfEstd,
    billboard: item.billboard,
    photos: item.photos,
  }));

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DecoratorClient data={formattedDecorators} />
      </div>
    </div>
  );
} catch (error) {
  console.error("Error fetching Decorator data:", error);
  return (
    <div className="px-4 w-full max-w-screen-xl mx-auto">
      <div className="space-y-4 pt-6 ">
        <p>Error loading Decorator data. Please try again later.</p>
      </div>
    </div>
  );
}
};

export default DecoratorPage;