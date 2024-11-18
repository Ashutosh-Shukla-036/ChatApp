import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRecoilState } from "recoil";
import { messagesState } from "../Atom/atoms";


const SocketContext = createContext();

// Custom hook to use the socket context
export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useRecoilState(messagesState);
    const user = JSON.parse(sessionStorage.getItem("user"));

    // Initialize the socket connection
    useEffect(() => {
        const newSocket = io("http://localhost:5003");
        setSocket(newSocket);

        // Register the user when socket connects
        if (user?.username) {
            newSocket.emit("register", user.username);
        }

        // Listen for incoming messages
        newSocket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        // Clean up socket connection when the component unmounts
        return () => newSocket.disconnect();
    }, [setMessages, user?.username]);

    // Function to send messages
    const sendMessage = (message) => {
        if (socket && socket.connected) {
            socket.emit("sendPrivateMessage", message);  // Sending private message
        } else {
            console.error("Socket is not connected.");
        }
    };

    // Function to connect the socket (for manual reconnection if needed)
    const connectSocket = () => {
        if (socket && !socket.connected) {
            socket.connect();  // Manually trigger socket connection on reload
        }
    };

    return (
        <SocketContext.Provider value={{ socket, sendMessage, connectSocket }}>
            {children}
        </SocketContext.Provider>
    );
};
