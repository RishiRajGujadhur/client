import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
 
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
 
import NotFound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import RequireAuth from './RequireAuth';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import Homepage from '../../features/home/Homepage';

export const router = createBrowserRouter(([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                { path: '/checkout', element: <CheckoutPage /> }
            ]},
            { path: '', element: <Homepage /> },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> }, 
            { path: '/not-found', element: <NotFound /> },
            { path: '/basket', element: <BasketPage /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
]))