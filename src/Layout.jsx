import { Outlet, Link } from "react-router-dom"; // Importing Outlet for nested routing
import { useContext, useState } from "react"; // Importing useState for managing component state
import AuthTabs from "./Pages/authTabs.jsx"
import AppContext from "./AppContext.js";

const Layout = () => {
    const { state, dispatch } = useContext(AppContext);

    // State to manage the visibility of the address and sign-in panels

    const [signOpen, setSignOpen] = useState(false);


    // Function to toggle the sign-in panel
    const handleSignForm = () => {
        if (signOpen) {
            setSignOpen(false);
        } else {
            setSignOpen(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch({ type: "user_logout" });
    };


    return (
        <>
            {/* Header section with buttons to open address and sign-in panels */}
            <header className="flex sticky justify-start items-center p-7 z-20 bg-orange-300 shadow-2xl top-0 ">

                <button onClick={state.isAuthenticated ? handleLogout : handleSignForm} className="m-3 p-2 hover:bg-orange-500 text-xl" >
                    {state.isAuthenticated ? "Logout" : "Sign In"}
                </button>
                <Link to="/cart" className="m-3 p-2 hover:bg-orange-500 text-xl" >
                    Cart
                </Link>
            </header>


            {/* Sign-in panel */}

            <aside className="fixed top-0 h-screen z-30 overflow-auto bg-slate-50 right-0 animate-from-right" style={{
                width: signOpen ? "400px" : "0px",
            }}>
                {signOpen && (
                    <>
                        <button onClick={handleSignForm} aria-label="Close sign-in panel">

                            <i className="fa-solid fa-xmark fa-2x m-4"></i>
                        </button>
                        < AuthTabs />
                    </>
                )}
            </aside>
            {signOpen && (
                <div className="fixed top-0 left-0 z-10 w-full h-screen bg-black opacity-50"></div>
            )}

            {/* Main content area for nested routes */}
            <main>
                <Outlet /> {/* Renders the matched child route */}
            </main>
            <footer className="bg-gray-300 h-36">
                <div className="justify-center flex p-10 ">
                    <i className="fa-brands fa-facebook fa-2x p-2"></i>
                    <i className="fa-brands fa-instagram fa-2x p-2"></i>
                    <i className="fa-brands fa-x-twitter fa-2x p-2"></i>
                    <i className="fa-brands fa-youtube fa-2x p-2"></i>
                    <h6 className="text-xl text-zinc-950 p-2">Copyright@ 2024 Designed By Impal@co.in</h6>
                </div>
            </footer>
        </>
    );
};

export default Layout;