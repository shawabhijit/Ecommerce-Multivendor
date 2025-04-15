import { createContext, useContext } from "react";


interface CartItem {
    id: number;
    name: string;
    brand: string;
    image: string;
    price: number;
    originalPrice: number;
    discount: string;
    size: string;
    color: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    updateQuantity: (id: number, newQuantity: number) => void;
    removeItem: (id: number) => void;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    updateQuantity: () => { },
    removeItem: () => { },
});

export const useCart = () => useContext(CartContext);