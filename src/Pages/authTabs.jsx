import { useState } from 'react';
import SignupForm from "./signUp/signUp.jsx"
import SignInForm from "./signIn/signIn.jsx"

const AuthTabs = () => {
    const [activeTab, setActiveTab] = useState('signIn');

    return (
        <div className="max-w-md max-h-full mx-auto bg-cyan-200 m-3 p-3">
            <div className="flex border-b">
                <button
                    className={`py-2 px-4 text-2xl font-medium ${activeTab === 'signIn' ? 'border-b-2 border-cyan-900 text-violet-950' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('signIn')}
                >
                    Sign In
                </button>
                <button
                    className={`py-2 px-4 text-2xl font-medium ${activeTab === 'signUp' ? 'border-b-2 border-cyan-900 text-violet-950' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('signUp')}
                >
                    Sign Up
                </button>
            </div>

            <div className="mt-4">
                {activeTab === 'signIn' ? (
                    <SignInForm />
                ) : (
                    < SignupForm />
                )}
            </div>
        </div>
    );
};
export default AuthTabs;

