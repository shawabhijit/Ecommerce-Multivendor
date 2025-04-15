import { Button } from '../../../../Components/ui/button'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { useCart } from './Context/CartContext'

const Cart = ({ containerVariants, itemVariants }: any) => {

    // Propogating 
    const { cartItems, updateQuantity, removeItem } = useCart();

    const navigate = useNavigate();

    return (
        <motion.div
            key="cart"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            {cartItems.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <ShoppingBag className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Your bag is empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added anything to your bag yet</p>
                    <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
                </motion.div>
            ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                        <h2 className="font-medium text-lg">
                            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                        </h2>
                    </div>

                    <AnimatePresence>
                        {cartItems.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                exit="exit"
                                layout
                                className="flex border rounded-lg p-4"
                            >
                                <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-24 h-32 object-cover rounded"
                                />
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">{item.brand}</p>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-gray-500 text-sm">
                                                Size: {item.size} | Color: {item.color}
                                            </p>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 text-gray-500"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="px-4 py-1">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 text-gray-500"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <span className="font-semibold">₹{item.price * item.quantity}</span>
                                                <span className="text-gray-500 line-through text-sm ml-2">
                                                    ₹{item.originalPrice * item.quantity}
                                                </span>
                                                <span className="text-orange-500 text-sm ml-2">{item.discount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </motion.div>
    )
}

export default Cart