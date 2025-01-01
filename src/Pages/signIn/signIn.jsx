import { useContext, useState } from "react";
import { signInAPI } from "../../apis.js"; // Adjust the import path as needed
import AppContext from "../../AppContext.js"; // Adjust the import path as needed

const SignInForm = () => {
    const { dispatch } = useContext(AppContext);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { msg, userDetails, token } = await signInAPI({ phoneNumber });
            alert(msg);
            localStorage.setItem("user", JSON.stringify(userDetails));
            localStorage.setItem("token", token);
            dispatch({ type: "user_logged_in", userDetails });
        } catch (e) {
            console.log(e);
            alert(e.msg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignInForm;