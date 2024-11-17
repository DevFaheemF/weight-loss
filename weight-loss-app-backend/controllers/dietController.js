const Dieter = require('../models/Dieter');

const addWeight = async (req, res) => {
    const { name, weight, week } = req.body;

    try {
        const newDieter = new Dieter({ name, weight, week });
        await newDieter.save();
        res.status(201).json(newDieter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getProgress = async (req, res) => {
    try {
        const dieters = await Dieter.find().sort({ week: 1 });
        const groupTotalWeightLoss = dieters.reduce((total, dieter) => total + dieter.weight, 0);

        const progress = dieters.map(dieter => {
            const targetWeight = 70 - (0.5 * dieter.week);
            const weightLoss = 70 - dieter.weight;
            const percentageLoss = (weightLoss / 70) * 100;

            return {
                ...dieter.toObject(),
                targetWeight,
                weightLoss,
                percentageLoss
            };
        });

        res.status(200).json({ progress, groupTotalWeightLoss });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { addWeight, getProgress };
