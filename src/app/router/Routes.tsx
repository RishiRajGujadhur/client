import { createBrowserRouter } from "react-router-dom";
import Homepage from "../../features/home/Homepage";
import App from "../layout/App";
import Catalog from "../../features/catalogue/Catalogue";
import ProductDetails from "../../features/catalogue/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";

export const router = createBrowserRouter([ {
    path: '/',
    element: <App />,
    children: [
        {path: '', element: <Homepage/>},
        {path: 'catalog', element: <Catalog/>},
        {path: 'catalog/:id', element: <ProductDetails/>},
        {path: 'about', element: <AboutPage/>},
        {path: 'contact', element: <ContactPage/>}
    ]
}])