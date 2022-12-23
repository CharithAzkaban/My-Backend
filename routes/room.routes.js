const express = require("express");
const {
  getRoom,
  deleteRoom,
  getAllRooms,
  createRoom,
  updateRoom,
} = require("../controllers/Room");
const { verifyAdmin } = require("../utils/verify");

const router = express.Router();

router.delete("/deleteRoom/:id/:hotelId", verifyAdmin, deleteRoom);

router.get("/getRoom/:id", verifyAdmin, getRoom);
router.get("/getAllRooms", verifyAdmin, getAllRooms);

router.post("/createRoom/:hotelId", createRoom);

router.put("/updateRoom/:id", updateRoom);

module.exports = router;

