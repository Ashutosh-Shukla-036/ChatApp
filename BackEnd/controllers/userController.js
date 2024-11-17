import User from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();

export const SignUp = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({ message: "Invalid credentials"});
    }
    try {
        const exitingUser = await User.findOne({ username: username});
        if (exitingUser) {
            return res.status(400).json({ message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({ message: "Invalid credentials"});
    }

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_KEY, { expiresIn: "1h" });
        return res.status(200).json({ token, username: user.username });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in" });
    }
}