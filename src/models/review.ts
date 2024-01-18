export interface Review {
    id: number;
    author: string;
    rating: number; // Out of 5 stars
    date: string; // Formatted date string
    text: string;
    image?: string; // Optional image URL
}