const router = require("express").Router();

const { isAdmin } = require("../config/auth");
const {
  addGlobalSetting,
  getGlobalSetting,
  updateGlobalSetting,
} = require("../controller/settingController");

//add a global setting
router.post("/global/add", isAdmin, addGlobalSetting);

//get global setting
router.get("/global/all", getGlobalSetting);

// get specifically for me
router.get("/global/me", isAdmin, getGlobalSetting);

//update global setting
router.put("/global/update", isAdmin, updateGlobalSetting);

module.exports = router;
