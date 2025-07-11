const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['lu', 'non_lu'],
        default: 'non_lu'
    },
    type: {
        type: String,
        enum: ['info', 'alerte', 'reservation'],
        default: 'info'
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
