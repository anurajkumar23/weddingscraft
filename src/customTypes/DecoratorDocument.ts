export interface DecoratorDocument {
    _id: string;
    name: string;
    description: string;
    rating: number;
    location: {
      city: string;
      pincode: string;
      area: string;
    } | null;
    price: number[];
    like: string[];
    contactUs: number;
    yearOfEstd: number;
    reviews: any[]; 
    billboard: string;
    photos: string[];
  }