export interface PhotographerDocument {
    _id: string;
    name: string;
    rating: number;
    adminRating?: number; // Optionally hidden in the API
    location: {
      city: string;
      pincode: string;
      area?: string;
    } | null; // Allow location to be null if necessary
    locationUrl?: string;
    description?: string; // Could be either outer or inner description depending on use
    feature: string[];
    price: number[];
    like: string[]; // Reference to user IDs who liked this
    contactUs: number;
    yearOfEstd?: number;
    services: string[];
    reviews: {
      user: string; // User ID reference or actual user data
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
  