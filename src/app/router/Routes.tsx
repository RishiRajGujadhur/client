import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
import NotFound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import RequireAuth from './RequireAuth'; 
import Inventory from '../../features/admin/Inventory';
import CustomerCreationPage from '../../features/account/profile/CustomerCreationPage';
import CheckoutWrapper from '../../features/checkout/CheckoutWrapper';
import Orders from '../../features/orders/Orders';
import InvoiceList from '../../features/Invoice/InvoiceList'; 
import InvoiceDetailsPage from '../../features/Invoice/InvoiceDetailsPage';
import InvoiceSettingsForm from '../../features/admin/Settings/invoiceSettings/InvoiceSettingsForm';
import ManageOrders from '../../features/admin/manage_orders/ManageOrders';
import ManageUsers from '../../features/admin/manage_users/ManageUsers';
import ManageOrdersByUser from '../../features/admin/manage_orders/ManageOrdersByUser';
import InvoiceSenderProfile from '../../features/account/settings/InvoiceSenderProfile';

export const router = createBrowserRouter(([
    {
        path: '/',
        element: <App />,
        children: [ 
            {
                // authenticated routes
                element: <RequireAuth />, children: [
                    { path: '/checkout', element: <CheckoutWrapper /> },
                    { path: '/orders', element: <Orders /> },
                    { path: '/my-invoices', element: <InvoiceList /> },
                    { path: '/invoice/:id', element: <InvoiceDetailsPage /> },
                    { path: '/invoiceSenderProfile/', element: <InvoiceSenderProfile />}
                ]
            },
            {
                // admin routes
                element: <RequireAuth roles={['Admin']} />, children: [
                    { path: '/inventory', element: <Inventory /> },
                    { path: '/manageOrders', element: <ManageOrders /> },
                    { path: '/invoiceSettings/', element: <InvoiceSettingsForm />},
                    { path: '/manageUsers/', element: <ManageUsers />},
                    { path: '/manageOrdersByUser/:id', element: <ManageOrdersByUser />}
                ]
            },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> }, 
            { path: 'customer/create', element: <CustomerCreationPage /> }, // New route for customer creation
            { path: '/not-found', element: <NotFound /> },
            { path: '/basket', element: <BasketPage /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
]));
