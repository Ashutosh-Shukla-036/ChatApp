import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // Unique username
    password: { type: String, required: true },  // Required password
});

const User = mongoose.model('UserTable', userSchema);
export default User;
