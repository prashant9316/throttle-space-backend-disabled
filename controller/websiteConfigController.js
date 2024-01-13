const { setData, getData } = require('../webconfigService/webconfig');
const WebsiteConfig = require('./../models/WebsiteConfig')

module.exports = {
    getConfig: async(req, res) => {
        try {
            const config = await WebsiteConfig.findOne();
            if(!config){
                return res.status(404).json({
                    error: "Config not Found!"
                })
            } else {
                return res.status(200).json({
                    config
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Internal Serrver Error'})
        }
    },
    getStaticConfig: (req, res) => {
        return res.json({
            config: getData()
        })
    },
    updateConfig: async(req, res)=>{
        try {
            const config = await WebsiteConfig.findOne();
            if(!config){
                const newConfig = new WebsiteConfig(req.body);
                const savedConfig = await newConfig.save();
                return res.status(200).json({
                    config: savedConfig,
                    message: "Created Config"
                })
            } else {
                const newConfig = req.body
                const updatedConfig = await WebsiteConfig.findOneAndUpdate(
                    {},
                    newConfig,
                    {new: true}
                );
                return res.status(200).json({
                    config: updatedConfig,
                    message: "Updated Config"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Internal Serrver Error'})
        }
    },
    deleteConfig: async() => {
        return {
            error: "Action not allowed!"
        }
    },
    syncConfig: async() => {
        try {
            const data = await setData();
            console.log(data)
            return res.status(200).json({
                data: getData()
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Internal Serrver Error'})
        }
        
    }
}