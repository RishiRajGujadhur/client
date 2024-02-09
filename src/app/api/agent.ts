import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { PaginatedResponse } from "../../models/pagination";
import { store } from "../store/configureStore";
import { CustomerFormData } from "../../models/customer_form_data";
import { Receipt } from "../../models/receipt/receipt";
import { Invoice } from "../../models/invoice/invoice";
import { InvoiceSettings } from "../../models/invoice/InvoiceSettings/InvoiceSettings";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = 'http://localhost:5001/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error('You are not allowed to do that!');
            break;
        case 500:
            router.navigate('/server-error', { state: { error: data } })
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.del(`basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress')
}

const Customers = {
    create: (customerData: CustomerFormData) => requests.post('customers', customerData),
};

const Like = {
    userLiked: (productId: number) => requests.get(`like/user-liked?productId=${productId}`),
    unlikeProduct: (productId: number) => requests.del(`like/unlike?productId=${productId}`),
    createLike: (productId: number) => requests.get(`like/like/?productId=${productId}`),
}

const Comment = {
    createComment: (commentData: any) => requests.post('comments', commentData),
    getComment: (commentId: number) => requests.get(`comments/${commentId}`),
    updateComment: (commentId: number, commentData: any) => requests.put(`comments/${commentId}`, commentData),
    deleteComment: (commentId: number) => requests.del(`comments/${commentId}`),
    getCommentsByProduct: (productId: number) => requests.get(`comments/${productId}`),
    list: (params: URLSearchParams) => requests.get('comments/list/', params),
}

function createFormData(item: any) {
    const formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData;
}

const Admin = {
    createProduct: (product: any) => requests.postForm('products', createFormData(product)),
    updateProduct: (product: any) => requests.putForm('products', createFormData(product)),
    deleteProduct: (id: number) => requests.del(`products/${id}`)
}


const Receipts = {
    list: () => requests.get('receipts'),
    details: (id: number) => requests.get(`receipts/${id}`),
    create: (receiptData: Receipt) => requests.post('receipts', receiptData),
    update: (id: number, receiptData: Receipt) => requests.put(`receipts/${id}`, receiptData),
    delete: (id: number) => requests.del(`receipts/${id}`),
    getMyReceiptList: (pageSize: number, pageNumber: number) => requests.get(`Invoices/getMyReceiptList?pageSize=${pageSize}&pageNumber=${pageNumber}`)
}

const Invoices = {
    list: () => requests.get('Invoice'),
    details: (id: number) => requests.get(`Invoice/${id}`),
    create: (invoiceData: Invoice) => requests.post('Invoice', invoiceData),
    update: (id: number, invoiceData: Invoice) => requests.put(`Invoice/${id}`, invoiceData),
    delete: (id: number) => requests.del(`Invoice/${id}`),
    getMyInvoiceList: (pageSize: number, pageNumber: number) => requests.get(`Invoice/getMyInvoiceList?pageSize=${pageSize}&pageNumber=${pageNumber}`)
}  
 
const InvoicesSettings = {
    details: () => requests.get('Invoice/getFirstInvoiceSettings'), 
    create: (invoiceData: InvoiceSettings) => requests.post('Invoice/saveInvoiceSettings', invoiceData),
    update: (invoiceData: InvoiceSettings) => requests.put(`updateInvoiceSettings`, invoiceData),  
}


const Payments = {
    createPaymentIntent: () => requests.post('payments', {})
}

const Orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const agent = {
    Catalog,
    Basket,
    Account,
    Admin,
    Customers,
    Like,
    Comment,
    Receipts,
    Invoices,
    Payments,
    Orders,
    InvoicesSettings,
}

export default agent;