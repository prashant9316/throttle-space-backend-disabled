var axios = require('axios');

const token = process.env.SHIPROCKETTOKEN

const getShiprocketAPIToken = async() => {
    try {
        axios(config)
        .then(function (response) {
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        return error
    }
}

const getPickupAddresses = async() => {
    const config = {
        method: 'get',
      maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/settings/company/pickup',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const data = await axios(config)
        .then(function (response) {
          return JSON.stringify(response.data);
        })
        .catch(function (error) {
          return error
        });
        console.log(data)
        return data;
      } catch (error) {
        
      }
}

module.exports = {
    getShiprocketAPIToken,
    getPickupAddresses
} ;

