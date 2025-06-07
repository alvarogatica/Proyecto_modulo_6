const mongoose = require('mongoose');
const purseSchema = mongoose.Schema(
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

const Purse = mongoose.model('Purse', purseSchema);

module.exports = Purse;