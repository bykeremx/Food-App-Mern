import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
        type: [String],
        required: true
    },
    isActive: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    role: {
        type: String,
        enum: ['admin', 'user', 'mutfak', 'kurye'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

export default User;