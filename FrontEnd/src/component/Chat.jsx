import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messagesState, currentUserState } from "../Atom/atoms";
import { useSocket } from "../component/SocketContext";

export const Chat = ({ recipient }) => {
    const [message, setMessage] = useState("");
    const setMessages = useSetRecoilState(messagesState);
    const messages = useRecoilValue(messagesState);
    const currentUser = useRecoilValue(currentUserState);
    const { socket } = useSocket();

    useEffect(() => {
        // Fetch chat history from backend
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5003/api/v1/messages/${currentUser.username}/${recipient.username}`
                );
                setMessages(response.data);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();
    }, [currentUser.username, recipient.username, setMessages]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        socket.emit("sendPrivateMessage", {
            recipient: recipient.username,
            message,
        });

        setMessage("");
    };

    useEffect(() => {
        const chatBox = document.querySelector(".overflow-y-auto");
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="m-6 p-4 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Chat with {recipient.username}</h2>
            <div className="space-y-3 h-64 overflow-y-auto p-2 bg-gray-50 rounded-lg mb-4">
                {messages.map((msg, index) => {
                    const isSender = msg.sender === currentUser.username && msg.recipient === recipient.username;
                    const isReceiver = msg.sender === recipient.username && msg.recipient === currentUser.username;

                    if (isSender || isReceiver) {
                        return (
                            <div
                                key={index}
                                className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}
                            >
                                <span
                                    className={`px-4 py-2 rounded-lg ${
                                        isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                                    }`}
                                >
                                    {msg.message}
                                </span>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Enter message"
                    value={message}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md"
                >
                    Send
                </button>
            </div>
        </div>
    );
};
