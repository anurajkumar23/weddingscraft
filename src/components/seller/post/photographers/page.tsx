import { PhotographerColumn } from "./components/columns"; 
import { PhotographerClient } from "./components/client";
import { PhotographerDocument } from "@/customTypes/PhotographerDocument";
import getPhotographer from "@/utils/Photographer/GetPhotographer";

const PhotographerPage = async () => {

  const photographers: PhotographerDocument[] = await getPhotographer();

  const formattedPhotographers: PhotographerColumn[] = photographers.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    rating: item.rating,
    location: item.location
      ? `${item.location.city || 'N/A'}, ${item.location.area || 'N/A'}, ${item.location.pincode || 'N/A'}`
      : 'Location not specified',
    locationUrl: item.locationUrl || 'N/A',
    description: item.description || 'No description',
    price: item.price.length ? item.price.join(", ") : 'No prices listed',
    contactUs: item.contactUs || 'N/A',
    yearOfEstd: item.yearOfEstd || 'N/A',
    services: item.services.length ? item.services.join(", ") : 'No services listed',
    occasion: item.occasion || 'N/A',
    gallery: item.gallery.length 
      ? item.gallery.map(galleryItem => `${galleryItem.name}: ${galleryItem.photos.join(", ")}`).join(" | ") 
      : 'No gallery available',
    photos: item.photos.length ? item.photos.join(", ") : 'No photos',
    createdAt: item.createdAt ? item.createdAt.toISOString().split('T')[0] : "N/A",
  }));

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PhotographerClient data={formattedPhotographers} />
      </div>
    </div>
  );
};

export default PhotographerPage;
