const Room = require('../models/room.model');

exports.createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const saved = await newRoom.save();
    res.status(201).json({ status: 'success', data: saved });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.getAllRooms = async (_req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ status: 'success', data: rooms });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ status: 'error', message: 'Room not found' });
    res.status(200).json({ status: 'success', data: room });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const updated = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: 'error', message: 'Room not found' });
    res.status(200).json({ status: 'success', data: updated });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Room not found' });
    res.status(200).json({ status: 'success', message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
