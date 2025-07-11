const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    type: { type: String, required: false },
    reserved: { type: Boolean, default: false },
    floor: { type: Number, default: null }
});

module.exports = mongoose.model('Room', roomSchema);