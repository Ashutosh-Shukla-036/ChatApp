import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.post("http://localhost:5003/api/signup", { username, password });
            alert("User created successfully");
            navigate("/login"); 
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error signing up";
            alert(errorMessage);
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 mb-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={handleSignUp}
                    className="w-full py-2 mt-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};
