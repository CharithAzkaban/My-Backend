const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const hotelId = req.params.hotelId;
    console.log(hotelId);
    await Room.findByIdAndDelete(roomId);
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: roomId },
    });
    res.send("Room han been deleted.");
  } catch (error) {
    next(error);
  }
};

exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.getRoom = async (req, res, next) => {
  try {
    const rooms = await Room.findById(req.params.id);
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
