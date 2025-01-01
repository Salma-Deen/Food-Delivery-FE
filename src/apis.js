import axios from "axios";

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_BE_URL, // Corrected from baseurl to baseURL
    timeout: 10000,
});

export const signUpAPI = async (payload) => {
    const response = await apiInstance.post("/auth/sign-up", payload);
    if (response.status === 201) {
        return response.data;
    }
    const { msg } = response.data;
    throw new Error(msg);
};
export const signInAPI = async (payload) => {
    try {
        const response = await apiInstance.post("/auth/sign-in", payload);
        return response.data; // Ensure your backend sends `msg`, `userDetails`, and `token` in response
    } catch (e) {
        const { response } = e;
        const { msg } = response.data; // Extract the message from the error response
        throw new Error(msg); // Throw a new error with the extracted message
    }
};
//Get All the Restaurants
export const getAllRestaurantsAPI = async () => {
    try {
        const response = await apiInstance.get("/restaurants", {
            headers: {
                "auth-token": localStorage.getItem("token") || "",
            },
        });
        return response.data;
    } catch (e) {
        const { response } = e;
        const { msg } = response.data;
        throw new Error(msg);
    }
};
//Get All the Restaurants
export const getAllDishes = async (id) => {
    try {
        const response = await apiInstance.get(`/restaurants/${id}/dishes`, {
            headers: {
                "auth-token": localStorage.getItem("token") || "",
            },
        });
        return response.data;
    } catch (e) {
        const { response } = e;
        const { msg } = response.data;
        throw new Error(msg);
    }
};

export const getCart = async (phoneNumber) => {
    try {
        const response = await apiInstance.get(`/cart/${phoneNumber}`, {
            headers: {
                "auth-token": localStorage.getItem("token") || "",
            },
        });

        if (response.status === 200) {
            return response.data;  // Return the cart data directly if successful
        } else {
            throw new Error("Failed to fetch cart.");
        }
    } catch (e) {
        const { response } = e;
        if (response && response.data && response.data.message) {
            const { message } = response.data;
            console.error("Error fetching cart:", message);
            throw new Error(message);  // Throw error with detailed message
        } else {
            console.error("Unexpected error while fetching cart:", e);
            throw new Error("An unexpected error occurred while fetching cart.");
        }
    }
};


export const addToCart = async (phoneNumber, cartItem) => {
    try {
        const response = await apiInstance.post(`/cart/add-to-cart/${phoneNumber}`, cartItem, {
            headers: {
                "auth-token": localStorage.getItem("token") || "",
            },
        });
        return response.data;
    } catch (e) {
        const { response } = e;
        const { message } = response.data;
        throw new Error(message);
    }
};


export const placeOrder = async (cartId) => {
    try {
        const response = await apiInstance.post(
            `/order/place-order/${cartId}`,
            undefined,
            {
                headers: {
                    "auth-token": localStorage.getItem("token") || "",
                },
            }
        );
        return response.data;
    } catch (e) {
        const { response } = e;
        const { message } = response.data;
        throw new Error(message);
    }
};


export const deleteCartItem = async (itemId) => {
    try {
        const response = await apiInstance.delete(`/cart/item/${itemId}`, {
            headers: {
                "auth-token": localStorage.getItem("token") || "",
            },
        });
        return response.data; // Return updated cart or success message
    } catch (error) {
        const { response } = error;
        const message = response?.data?.message || "Failed to delete item.";
        throw new Error(message);
    }
};