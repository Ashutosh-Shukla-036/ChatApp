import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState } from "../Atom/atoms"; 

export const Navbar = () => {
    const currentUser = useRecoilValue(currentUserState); 
    const setCurrentUser = useSetRecoilState(currentUserState); 
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        setCurrentUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-indigo-500 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Chat App</h1>
                <div className="flex space-x-4">
                
                    {!currentUser?.username && (
                        <>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                            <Link to="/signup" className="hover:underline">
                                Sign Up
                            </Link>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                        </>
                    )}

                    {currentUser?.username && (
                        <>
                            <Link to="/allusers" className="hover:underline">
                                All Users
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="hover:underline"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
