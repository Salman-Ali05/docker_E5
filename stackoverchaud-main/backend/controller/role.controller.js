const Role = require('../models/role.model');

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json({ status: 'success', data: roles });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ status: 'error', message: 'Role not found' });

        res.status(200).json({ status: 'success', data: role });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.createRole = async (req, res) => {
    try {
        const role = new Role({ name: req.body.name });
        await role.save();
        res.status(201).json({ status: 'success', data: role });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const updated = await Role.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!updated) return res.status(404).json({ status: 'error', message: 'Role not found' });

        res.status(200).json({ status: 'success', data: updated });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const deleted = await Role.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ status: 'error', message: 'Role not found' });

        res.status(200).json({ status: 'success', message: 'Role deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
