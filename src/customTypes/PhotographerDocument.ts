export interface PhotographerDocument {
  _id: string;
  name: string;
  rating: number;
  adminRating?: number; 
  location: {
    city: string;
    pincode: string;
    area?: string;
  };
  locationUrl?: string;
  description?: string;
  price: number[];
  like: string[];
  contactUs: number;
  yearOfEstd?: number;
  services: string[];
  reviews: {
    user: string;
    comment: string;
    rating: number;
    date: Date;
  }[];
  billboard?: string;
  occasion: string;
  gallery: {
    name: string;
    photos: string[];
  }[];
  photos: string[];
  createdAt: Date;
}