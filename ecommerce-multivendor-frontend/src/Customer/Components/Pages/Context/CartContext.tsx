import { createContext, useContext, useEffect, useState } from "react";
import { Products } from "../../../../types/ProductTupe";

interface CartItem {
    id: number;
    mrpPrice: number;
    sellingPrice: number;
    product: Products;
    quantity: number;
    size: string;
    userId: number;
}

// Define the Address interface for export
export interface Address {
    id: number;
    pickupBusinessName: string;
    pickupAddress: string;
    pickupCity: string;
    pickupState: string;
    pinCode: string;
    pickupPhone: string;
    default: boolean;
}

interface CartContextType {
    cartItems: CartItem[];
    updateQuantity: (id: number, newQuantity: number) => void;
    removeItem: (id: number) => void;
}

interface AddressContextType {
    addresses: Address[];
    handleRemoveAddress: (id: number) => void;
    handleSetDefaultAddress: (id: number) => void;
    setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
    refetchProfile: () => void;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    updateQuantity: () => { },
    removeItem: () => { },
});

export const AddressContext = createContext<AddressContextType>({
    addresses: [],
    handleRemoveAddress: () => { },
    handleSetDefaultAddress: () => { },
    setAddresses: () => { },
    refetchProfile: () => { },
});

export const useCart = () => useContext(CartContext);
export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children, initialAddresses , refetchProfile }) => {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

    useEffect(() => {
        if (initialAddresses.length > 0) {
            setAddresses(initialAddresses);
        }
    }, [initialAddresses]);

    const handleRemoveAddress = (id: number) => {
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    const handleSetDefaultAddress = (id: number) => {
        setAddresses(
            addresses.map((address) => ({
                ...address,
                default: address.id === id,
            })),
        );
    };

    const contextValue = { addresses, handleRemoveAddress, handleSetDefaultAddress, setAddresses , refetchProfile };

    return (
        <AddressContext.Provider value={contextValue}>
            {children}
        </AddressContext.Provider>
    );
};