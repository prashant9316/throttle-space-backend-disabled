const express = require('express')
const router = express.Router();

const {
    fetchCart,
    addToCart,
    updateCart,
    emptyCart
} = require('../controller/cartController');


router.get('/cart', fetchCart)

router.post('/add-to-cart', addToCart);
router.post('/upadte-cart/:productId', updateCart);
router.post('/empty-cart', emptyCart)


module.exports = router;