import { createContext, useContext } from "react";
import { Products } from "../../../../../types/ProductTupe";


interface CartItem {
    id: number;
    mrpPrice: number;
    sellingPrice: number;
    product: Products;
    quantity: number;
    size: string;
    userId: number;
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