import React from "react";

export const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to the Chat App</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Connect with your friends and chat in real time!
                </p>
                <a
                    href="/signup"
                    className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Get Started
                </a>
            </div>
        </div>
    );
};
