import Message from "../models/messageModel.js";

export const getMessage = async (req, res) => {
    const { sender, recipient } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender, recipient },
                { sender: recipient, recipient: sender },
            ],
        }).sort({ timestamp: 1 });

        return res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to fetch messages" });
    }
};