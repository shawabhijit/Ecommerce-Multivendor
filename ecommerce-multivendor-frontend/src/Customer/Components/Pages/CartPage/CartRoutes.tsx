import { Routes, Route } from "react-router-dom"
import Cart from "./Cart"
import UserAddress from "./UserAddress"
import UserOrderPayment from "./UserOrderPayment"
import Confirmation from "./Confirmation"

export default function CartRoutes({ cartItems, updateQuantity, removeItem, containerVariants, itemVariants }) {
    return (
        <Routes>
            <Route path="cart" element={
                <Cart
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                    cartItems={cartItems}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                />}
            />
            <Route path="address" element={<UserAddress />} />
            <Route path="payment" element={<UserOrderPayment />} />
            <Route path="confirmation" element={<Confirmation />} />
        </Routes>
    )
}
