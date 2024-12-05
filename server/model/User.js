import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;  // Export the model
