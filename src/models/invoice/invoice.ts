export interface Invoice {
    // customer: {
    //     name: string;
    //     address: string;
    //     city: string;
    //     country: string;
    //     postalCode: string;
    // };
    information: {
        number: string;
        date: string;
        dueDate: string;
    };
    products: {
        quantity: string;
        description: string;
        taxRate: number;
        price: number;
    }[];
    bottomNotice: string;
    settings: {
        currency: string;
        locale?: string;
        taxNotation?: string;
        marginTop?: number;
        marginRight?: number;
        marginLeft?: number;
        marginBottom?: number;
        format?: string;
        height?: string;
        width?: string;
        orientation?: string;
    };
    translate?: {
        invoice?: string;
        number?: string;
        date?: string;
        dueDate?: string;
        subtotal?: string;
        products?: string;
        quantity?: string;
        price?: string;
        productTotal?: string;
        total?: string;
    };
    customize?: {
        template?: string;
    };
    client: {
        company: string;
        address: string;
        zip: string;
        city: string;
        country: string;
    };
    sender: {
        company: string;
        address: string;
        zip: string;
        city: string;
        country: string;
    };
    images: {
        logo: string;
    };
}
