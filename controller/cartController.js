const Customer = require('../models/Customer');
const Cart = require('../models/Cart')
const {tokenForVerify} = require('../config/auth')
const {sendEmail} = require('../lib/email-sender/sender')


const fetchCartByCustomer = async(customerId) => {
    const cartItems = await Cart.find({ customer: customerId})
    return cartItems;
}


const fetchCart = async(req, res) => {
    try {
        const cart = await fetchCartByCustomer(req.user._id);
        return res.status(200).json({
            cart: cart,
        })
    } catch (error) {
        res.status(500).send({
            message: "Server Error!",
            error
        });
    }
} 

const addToCart = async(req, res) => {
    try {
        const cartData = req.body;
        const user = req.user;
        const productDetails = req.body.productDetails
        const cartInstance = await Cart.find({ customer: user._id, product: productDetails._id })
        if(cartInstance){
            const updateCart = await Cart.findOneAndUpdate(
                {customer: req.user._id, product: cartData.productId},
                {
                    quantity: cartData.quantity,
                    productDetails: cartData.productDetails,
                }
            )
        } else {
            const newCartItem = new Cart({
                customer: req.user._id,
                productDetails: cartData.productDetails,
                quantity: cartData.quantity
            })
            await newCartItem.save();
        }
        const updatedCart = await fetchCartByCustomer(user._id)
        return res.status(200).json({
            cart: updatedCart,
            message: "added!"
        })
    } catch (error) {
        res.status(500).send({
            message: "Server Error!",
            error
        });
    }
}

const updateCart = async(req, res) => {
    try {
        const {productId} = req.params
        const cartItem = await Cart.findOneAndUpdate(
            { _id: cartItemId, customer: userId }, // Ensure the cart item belongs to the authenticated user
            { quantity },
            { new: true }
        );
        const updatedCart = await fetchCartByCustomer(user._id)
        return res.status(200).json({
            cart: updatedCart,
            message: "Updated!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error!",
            error
        })
    }
}

const emptyCart = async(req, res) => {
    try {
        const customer = req.user._id;
        await Cart.delete({customer});
        return res.status(200).json({
            message: "Cart is emptied!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

module.exports = {
    addToCart,
    updateCart,
    emptyCart
}