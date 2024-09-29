export interface CatererDocument {
    _id: string;
    name: string;
    description?: string;
    rating: number;
    adminRating?: number;
    reviews: {
      user: string;  
      comment: string;
      rating: number;
      date: Date;
    }[];
    like: string[]; 
    contactUs: number;
    yearOfEstd?: number;
    billboard?: string;
    photos: string[];
    basic: SectionDocument;     
    standard: SectionDocument;
    deluxe: SectionDocument;
  }
  
  export interface SectionDocument {
    veg: {
      starter: string[];
      maincourse: string[];
      desert: string[];
      welcomedrink: string[];
      breads: string[];
      rice: string[];
    };
    nonveg: {
      starter: string[];
      maincourse: string[];
      desert: string[];
      welcomedrink: string[];
      breads: string[];
      rice: string[];
    };
    addon: {
      starter: { name: string; price: string }[];
      maincourse: { name: string; price: string }[];
      desert: { name: string; price: string }[];
      welcomedrink: { name: string; price: string }[];
      breads: { name: string; price: string }[];
      rice: { name: string; price: string }[];
    };
    price: number[];
  }
  