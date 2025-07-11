const Invitation = require('../models/invitation.model');
const crypto = require('crypto');

exports.createInvitation = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ status: 'error', message: 'Email is required' });

        const token = crypto.randomBytes(20).toString('hex');
        const invitation = await Invitation.create({ email, token });

        res.status(201).json({ status: 'success', data: invitation });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getAllInvitations = async (req, res) => {
    try {
        const invitations = await Invitation.find();
        res.status(200).json({ status: 'success', data: invitations });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getInvitationById = async (req, res) => {
    try {
        const invitation = await Invitation.findById(req.params.id);
        if (!invitation) return res.status(404).json({ status: 'error', message: 'Invitation not found' });
        res.status(200).json({ status: 'success', data: invitation });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.deleteInvitation = async (req, res) => {
    try {
        const result = await Invitation.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ status: 'error', message: 'Invitation not found' });
        res.status(200).json({ status: 'success', message: 'Invitation deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};