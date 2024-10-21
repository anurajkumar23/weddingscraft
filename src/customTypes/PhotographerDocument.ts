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
  like: Like[];
  contactUs: number;
  yearOfEstd?: number;
  services: string[];
  reviews: ReviewData[];
  billboard?: string;
  occasion: string;
  gallery: {
    name: string;
    photos: string[];
  }[];
  photos: string[];
  createdAt: Date;
}

interface Like {
  userId: string;
  timestamp: Date;
}

interface ReviewData {
  _id: string;
  content: string;
  username: string;
  userphoto: string;
  rating: number;
  tag: string;
  userId: string;
  createdAt: string;
}