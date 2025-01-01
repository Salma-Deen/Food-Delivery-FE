/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import { getCart, deleteCartItem } from "../../apis.js";
import toast, { Toaster } from "react-hot-toast"; // Importing toast and Toaster from react-hot-toast

export default function CartPage() {
    const {
        state: { userDetails, cart: cartData },
        dispatch,
    } = useContext(AppContext);
    const [amount, setAmount] = useState(cartData.total);
    const [isProcessing, setIsProcessing] = useState(false);
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber || "");
    const [city, setCity] = useState("");

    const handlePayment = async () => {
        setIsProcessing(true); // Start loading
        try {
            const res = await fetch(`${import.meta.env.VITE_BE_URL}/api/payment/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
            });

            if (!res.ok) {
                throw new Error("Failed to create order");
            }

            const data = await res.json();
            console.log("Order Data:", data);

            // Proceed to verify payment
            handlePaymentVerify(data.data);
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Failed to initiate payment. Please try again.");
        } finally {
            setIsProcessing(false); // End loading
        }
    };

    const handlePaymentVerify = (data, address, phoneNumber, city) => {
        if (typeof window.Razorpay === "undefined") {
            toast.error("Razorpay script not loaded. Please try again.");
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "FoodieCart",
            description: "Order Payment",
            order_id: data.id,
            prefill: {
                name: userDetails.name,
                email: userDetails.email,
                contact: phoneNumber,
                address: address,
                city: city,
            },
            handler: async (response) => {
                console.log("Payment Response:", response);
                try {
                    const res = await fetch(`${import.meta.env.VITE_BE_URL}/api/payment/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            address,
                            phoneNumber,
                            city,
                        }),
                    });

                    const verifyData = await res.json();
                    console.log("Verification Response:", verifyData);

                    if (verifyData.message) {
                        toast.success(verifyData.message);
                        // Clear the cart on successful payment
                        dispatch({ type: "load_cart", payload: null });
                    }
                } catch (error) {
                    console.error("Verification Error:", error);
                    toast.error("Failed to verify payment. Please contact support.");
                }
            },
            theme: {
                color: "#4CAF50",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", (response) => {
            console.error("Payment Failed:", response.error);
            toast.error("Payment failed. Please try again.");
        });

        rzp1.open();
    };

    // Delete Item from Cart
    const handleDeleteItem = async (itemId) => {
        try {
            const updatedCart = await deleteCartItem(itemId);

            if (updatedCart) {
                dispatch({ type: "load_cart", payload: updatedCart });
                toast.success("Item deleted successfully.");
            } else {
                const refreshedCart = await getCart(userDetails?.phoneNumber);
                dispatch({ type: "load_cart", payload: refreshedCart });
                toast.success("Item deleted and cart refreshed.");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error(error.message || "Failed to delete item.");
        }
    };

    // Load Cart Data
    useEffect(() => {
        const loadCart = async () => {
            try {
                const cart = await getCart(userDetails?.phoneNumber);
                dispatch({ type: "load_cart", payload: cart });
            } catch (error) {
                console.error("Error loading cart:", error);
                toast.error(error.message || "Failed to load cart.");
            }
        };

        if (userDetails?.phoneNumber) {
            loadCart();
        }
    }, [dispatch, userDetails?.phoneNumber]);

    if (!cartData || cartData?.items?.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h5 className="text-2xl text-gray-700">Your cart is empty.</h5>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-6 p-4">
            <h4 className="text-3xl font-bold mb-6">Shopping Cart</h4>
            <p className="mb-4">
                <strong>Phone Number:</strong> {cartData.phoneNumber}
            </p>

            <h5 className="text-2xl font-semibold mb-4">Cart Items</h5>

            <div className="flex flex-wrap p-3 gap-4">
                {cartData?.items.map((item) => (
                    <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <span
                            onClick={() => handleDeleteItem(item._id)}
                            className="hover:text-red-700 cursor-pointer"
                        >
                            <i className="fa-solid fa-trash"></i>
                        </span>

                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-56 h-48 object-cover"
                        />
                        <h6 className="text-lg mb-3 m-2 font-semibold">{item.name}</h6>
                        <p className="text-red-700 m-2">
                            <strong>Price:</strong> ₹{item.price}
                        </p>
                        <p className="text-gray-700 m-2">
                            <strong>Quantity:</strong> {item.qty}
                        </p>
                        <p className="text-gray-700 m-2">
                            <strong>Restaurant ID:</strong> {item.restrauntId}
                        </p>
                    </div>
                ))}
            </div>

            <h5 className="text-2xl font-bold mt-6">
                Total: ₹{cartData.total.toFixed(2)}
            </h5>

            {/* Address, Phone Number, and City Inputs */}
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-4 w-full"
                />
                <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-4 w-full"
                />
                <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-4 w-full"
                />
            </div>

            <button
                onClick={handlePayment}
                className="w-full mt-6 bg-cyan-600 text-white p-2 rounded-md"
                disabled={isProcessing}
            >
                {isProcessing ? "Processing..." : "Place Order"}
            </button>

            <Toaster />
        </div>
    );
};

