export interface postBanquet{
    name: string;
    location: {
      city: string;
      pincode: string;
      area: string;
    };
    services: string[];
    description: string;
    price: string;
    capacity:  string;
    specialFeature: string[];
    
    yearOfEstd: string;
    availability: string[];
    billboard: string;
    openHours: string;
    operatingDays: string;
    type: string;
}

export interface BanquetDocument {
  services: any;
  _id: string;
  name: string;
  rating: number;
  location: {
    city: string;
    pincode: string;
    area: string;
  } | null; // Allow location to be null
  description: string;
  price: number;
  capacity: number;
  type: string;
  yearOfEstd: number;
  contactUs: number;
  specialFeature: string[];
  availability: string[];
  operatingDays: string;
  locationUrl?: {
        coordinates: number[];
        url: string;
      };
  openHours: string;
  reviews: ReviewData[];
  like: Like[];
  gallery: {
    name: string;
    photos: string[];
    _id: string;
  }[];
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