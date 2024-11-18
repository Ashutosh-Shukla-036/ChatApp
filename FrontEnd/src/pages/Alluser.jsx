import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState, currentUserState } from "../Atom/atoms";
import axios from "axios";
import { Chat } from "../component/Chat";

export const AllUsers = () => {
    const setUsers = useSetRecoilState(usersState);
    const users = useRecoilValue(usersState);
    const currentUser = useRecoilValue(currentUserState);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5003/api/getusers");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [setUsers]);

    const noUsersMessage = users.length === 1 ? (
        <p className="text-center text-gray-500">No users available to chat</p>
    ) : null;

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="w-1/2 p-6 bg-white shadow-md border-r border-gray-300">
                <h2 className="text-2xl font-semibold mb-6 text-center">All Users</h2>

                {noUsersMessage}

                <div className="space-y-4">
                    {users
                        .filter(user => user.username !== currentUser.username)
                        .map((user, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedUser(user)}
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                            >
                                Chat with {user.username}
                            </button>
                        ))}
                </div>
            </div>

            <div className="w-1/2 p-6 bg-white shadow-md">
                {selectedUser ? (
                    <Chat recipient={selectedUser} />
                ) : (
                    <div className="text-center text-gray-400">Select a user to start chatting</div>
                )}
            </div>
        </div>
    );
};
