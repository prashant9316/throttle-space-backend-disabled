const mongoose = require('mongoose');
const shortid = require('shortid');

const WebsiteConfigSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true,
            default: shortid.generate
        },
        active: {
            type: Boolean,
            required: true,
            default: false
        },
        topBarSection: {
            backgroundColor: {
                type: String,
                required: true,
                default: '#FFE583'
            },
            textColor: {
                type: String,
                required: true,
                default: '#000'
            },
            Content: {
                type: String,
                required: true,
                default: 'Free shipping on all orders. {" "}'
            },
            linkContent: {
                type: String,
                required: false,
                default: "Shop Now",
            },
            link: {
                type: String,
                required: false,
                default: '/collection/sale'
            }
        },
        footer: {
            social: {
                instagram: String,
                twitter: String,
                facebook: String,
                youtube: String
            },
            contact: {
                primaryEmail: String,
                secondaryEmail: String,
                primaryContact: String,
                secondaryContact: String,
                primaryAddress: String,
                secondaryAddress: String,
            },
        },
        sections: {
            newArrivals: {
                type: Boolean,
                default: true
            },
            topSelling: {
                type: Boolean,
                default: true,
            },
            offerZone: {
                type: Boolean,
                default: true
            },
            offerBanner: {
                type: Boolean,
                default: true
            },
            flashSale: {
                type: Boolean,
                default: true
            },
            recentlyViewed: {
                type: Boolean,
                default: true
            },
            smallBiz: {
                type: Boolean,
                default: true
            },
            foundersPick: {
                type: Boolean,
                default: true
            },
            blogs: {
                type: Boolean,
                default: true
            },
            features: {
                type: Boolean,
                default: true
            },
            newsletter: {
                type: Boolean,
                default: true
            },
        }
    }
)

const WebsiteConfig = mongoose.model('WebsiteConfig', WebsiteConfigSchema)
module.exports = WebsiteConfig