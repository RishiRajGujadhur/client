import { Invoice } from "../../models/invoice/invoice";

export function createInvoice(data: Invoice) {
    // Generate the invoice data
    const invoiceData = {
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
