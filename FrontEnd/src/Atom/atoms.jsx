import { atom } from "recoil";

export const currentUserState = atom({
    key: "currentUserState",
    default: null,
    effects: [
        ({ setSelf, onSet }) => {
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setSelf(parsedUser); 
                } catch (error) {
                    console.error("Error parsing user data:", error);
                    setSelf(null);  
                }
            }
            onSet(newUser => {
                if (newUser) {
                    sessionStorage.setItem('user', JSON.stringify(newUser));
                } else {
                    sessionStorage.removeItem('user');
                }
            });
        }
    ]
});

export const usersState = atom({
    key: "usersState",
    default: [],
});

export const messagesState = atom({
    key: "messagesState",
    default: [],
});
