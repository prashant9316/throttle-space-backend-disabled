const express = require('express');
const { getPickupAddresses } = require('../utils/shiprocketapi');
const router = express.Router();

router.get('/pickup-addresses', async(req, res) => {
    try {
        const addresses = getPickupAddresses();
        return res.status(200).json({
            addresses
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

module.exports = router;