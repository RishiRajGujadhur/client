export interface Invoice { 
    number: string;
    issueDate: string;
    dueDate: string; 
    logo: string;
    sender: {
        company: string;
        address: string;
        zip: string;
        city: string;
        country: string;
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
    customer: {
        name: string; 
        address: string;
        zip: string;
        city: string;
        country: string;
    };
}
