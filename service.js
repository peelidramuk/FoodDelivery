const Price = require('../db/Price');

async function calculatePrice(organizationId, itemId, zone, totalDistance) {
    try {
        const pricingData = await Price.findOne({
            organization_id: organizationId,
            item_id: itemId,
            zone: zone
        });

        if (!pricingData) {
            throw new Error('Pricing data not found');
        }

        const { base_distance_in_km, km_price, fixed_price } = pricingData;
        let distancePrice = fixed_price;
        if (totalDistance > base_distance_in_km) {
            distancePrice += (totalDistance - base_distance_in_km) * km_price;
        }

        return distancePrice;
    } catch (error) {
        console.error('Error calculating price:', error);
        throw error;
    }
}
module.exports = {
    calculatePrice
};
