const Notification = require('../models/notification.model');

exports.createNotification = async (req, res) => {
  try {
    const { user, content, status, type } = req.body;
    if (!user || !content) {
      return res.status(400).json({ status: 'error', message: 'User and content are required' });
    }

    const notification = await Notification.create({
      user,
      content,
      status: status || 'non_lu',
      type: type || 'info'
    });

    res.status(201).json({ status: 'success', data: notification });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getAllNotifications = async (_req, res) => {
  try {
    const notifs = await Notification.find().populate('user');
    res.status(200).json({ status: 'success', data: notifs });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id).populate('user');
    if (!notif) return res.status(404).json({ status: 'error', message: 'Notification not found' });

    res.status(200).json({ status: 'success', data: notif });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Notification not found' });

    res.status(200).json({ status: 'success', message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
