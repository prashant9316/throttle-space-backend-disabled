const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        productDetails: {
            originalPrice: Number,
            price: Number,
            discount: Number,
            variant: String,
            store: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Admin",
                required: true
            },
        },
        productImageRef: {
            type: String,
        },
        
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;