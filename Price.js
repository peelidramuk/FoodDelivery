const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    base_distance_in_km: {
        type: Number,
        required: true
    },
    km_price: {
        type: Number,
        required: true
    },
    fixed_price: {
        type: Number,
        required: true
    }
});

const Price = mongoose.model('prices', priceSchema);

module.exports = Price;
