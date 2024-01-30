import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Basket } from '../../models/basket';

interface StoreContextValue {
    removeItem: (productId: number, quantity: number) => void; // Function to remove an item from the basket
    setBasket: (basket: Basket) => void; // Function to set the basket
    basket: Basket | null; // Current basket
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Oops - we are not inside the app.tsx so we do not have access to the context');
    }

    return context;
}

export function StoreProvider({children}: PropsWithChildren<unknown>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!basket) return;
        const items = [...basket.items]; // Create a new array of items
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1); // Remove item if quantity becomes 0
            setBasket(prevState => {
                return {...prevState!, items} // Update the basket with the modified items
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}