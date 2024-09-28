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
  // Add other fields that you want to display
  contactUs: number;
  specialFeature: string[];
  availability: string[];
  operatingDays: string;
  openHours: string;
  createdAt: Date;
}