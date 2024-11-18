import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { currentUserState } from "../Atom/atoms";
import { useSocket } from "../component/SocketContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const setCurrentUser = useSetRecoilState(currentUserState);
    const { socket, connectSocket } = useSocket();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:5003/api/login", {
                username,
                password,
            });

            sessionStorage.setItem("username", response.data.username);
            sessionStorage.setItem("token", response.data.token);

            setCurrentUser({ username: response.data.username, token: response.data.token });

            connectSocket();  
            if (socket) {
                socket.emit("register", response.data.username); 
            }

            navigate('/allusers');  
        } catch (error) {
            console.error(error);
            alert("Error logging in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="w-full px-4 py-2 mb-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-full px-4 py-2 mb-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 mt-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};
