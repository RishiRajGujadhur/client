import { Product } from "./product";

export interface Supplier {
    id: number; // Unique identifier
    name: string; // Name of the supplier
    contactPerson: string; // Primary contact person's name
    email: string; // Primary email address
    phone: string; // Primary phone number
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    }; // Physical address
    website: string; // Website URL (optional)
    products: Product[]; // Products supplied by this supplier
    // Additional fields as needed, such as:
    // - notes: string; // Additional notes or information
    // - createdAt: Date; // Date and time of creation
    // - updatedAt: Date; // Date and time of last update
  }