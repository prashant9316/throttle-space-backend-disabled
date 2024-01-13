const WebsiteConfig = require('./../models/WebsiteConfig')
let globalData = {}

const setData = async() => {
    try {
        const webconfig = await WebsiteConfig.findOne();
        if(!webconfig){
            return null;
        } else {
            globalData = webconfig
        }
    } catch (error) {
        return error
    }
}

const getData = () => {
    try {
        return globalData;
    } catch (error) {
        return error
    }
}

module.exports = {
    setData,
    getData
}