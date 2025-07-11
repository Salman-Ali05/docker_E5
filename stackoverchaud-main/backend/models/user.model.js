const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },

    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },

    invitation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invitation',
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
