const mongoose = require('mongoose');

const dieterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    week: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Dieter = mongoose.model('Dieter', dieterSchema);

module.exports = Dieter;
