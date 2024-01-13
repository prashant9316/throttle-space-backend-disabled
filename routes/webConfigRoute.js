const router = require('express').Router();
const configController = require('./../controller/websiteConfigController')

router.get('/', configController.getConfig);
router.get('/config', configController.getStaticConfig);
router.post('/', configController.updateConfig);
router.delete('/', configController.deleteConfig);
router.post('/sync', configController.syncConfig);

module.exports = router;
