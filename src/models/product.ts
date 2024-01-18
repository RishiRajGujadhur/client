export interface Product {
    id: number;
    name: string,
    price: number,
    pictureUrl:string,
    type?: string;
    brand: string;
    quantityInStock?: number;
    discountPercentage: number;
}