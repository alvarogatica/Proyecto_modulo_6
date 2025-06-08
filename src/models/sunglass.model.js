const mongoose = require('mongoose');
const sunglassSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const Sunglass = mongoose.model('Sunglass', sunglassSchema);

module.exports = Sunglass;