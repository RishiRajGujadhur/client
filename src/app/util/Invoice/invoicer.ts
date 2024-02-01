import { Invoice } from "../../../models/invoice/invoice";

export function createInvoice(data: Invoice) {
    // Generate the invoice data
    const invoiceData = {
        client: {
            name: data.client.company,
            address: data.client.address,
            city: data.client.city,
            country: data.client.country,
            postalCode: data.client.zip,
        },
        information: {
            number: data.information.number,
            date: data.information.date,
            dueDate: data.information.dueDate,
        },
        products: data.products.map((product) => ({
            quantity: product.quantity,
            description: product.description,
            taxRate: product.taxRate,
            price: product.price,
        })),
        bottomNotice: data.bottomNotice,
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
 
    console.log("Invoice created");
}
