const userDetails = localStorage.getItem("user");
const authState = Boolean(userDetails);

export const initialState = {
    isAuthenticated: authState,
    userDetails: authState ? JSON.parse(userDetails) : null,
    restaurants: [], // Corrected spelling from 'restraunts' to 'restaurants'
    cart: null,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "user_logged_in":
            return {
                ...state,
                isAuthenticated: true,
                userDetails: action.userDetails,
            };
        case "load_cart":
            return {
                ...state,
                cart: action.payload,
            };
        case "user_logout":
            return {
                ...state,
                isAuthenticated: false,
                userDetails: null,
            };
        default:
            return state;
    }
};