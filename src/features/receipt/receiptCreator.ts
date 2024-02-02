import { Receipt } from "../../models/receipt/receipt";

 
export function createReceipt(data: Receipt) {
    // Generate the Receipt data
    const ReceiptData = {
        customer: {
            name: data.customer.company,
            address: data.customer.address,
            city: data.customer.city,
            country: data.customer.country,
            postalCode: data.customer.zip,
        },
        information: {
            number: data.information.number,
            date: data.information.date,
            paymentDate: data.information.paymentDate,
        },
        products: data.products.map((product) => ({
            quantity: product.quantity,
            description: product.description,
            taxRate: product.taxRate,
            price: product.price,
        })), 
        settings: data.settings,
        translate: data.translate,
        customize: data.customize, 
        sender: {
            company: data.sender.company,
            address: data.sender.address,
            zip: data.sender.zip,
            city: data.sender.city,
            country: data.sender.country,
        },
        images: data.images,
    };
 
    console.log("Receipt created");
}
