const Reservation = require('../models/reservation.model');

exports.createReservation = async (req, res) => {
  try {
    const { user, room, date, startTime, endTime } = req.body;

    if (!user || !room || !date || !startTime || !endTime) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    const reservation = new Reservation({ user, room, date, startTime, endTime });
    const saved = await reservation.save();

    res.status(201).json({ status: 'success', data: saved });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getAllReservations = async (_req, res) => {
  try {
    const reservations = await Reservation.find().populate('user').populate('room');
    res.status(200).json({ status: 'success', data: reservations });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user').populate('room');
    if (!reservation) return res.status(404).json({ status: 'error', message: 'Reservation not found' });

    res.status(200).json({ status: 'success', data: reservation });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: 'error', message: 'Reservation not found' });

    res.status(200).json({ status: 'success', data: updated });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Reservation not found' });

    res.status(200).json({ status: 'success', message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
