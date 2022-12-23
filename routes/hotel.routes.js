const express = require("express");
const {
  getHotel,
  deleteHotel,
  getAllHotels,
  createHotel,
  updateHotel,
  countByCity,
  countByType,
} = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/verify");

const router = express.Router();

router.delete("/deleteHotel/:id", verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/getHotel/:id", getHotel);
router.get("/getAllHotels", getAllHotels);

router.post("/createHotel", createHotel);

router.put("/updateHotel/:id", updateHotel);

module.exports = router;
