export interface Receipt {
    information: {
        number: string;
        date: string;
        paymentDate: string; 
        paymentMethod: string; 
    };
    products: {
        quantity: string;
        description: string;
        taxRate: number;
        price: number;
    }[]; 
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
        Receipt?: string;
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
        name: string;
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
