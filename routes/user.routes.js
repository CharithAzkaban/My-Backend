const express = require("express");
const {
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
//   checkAuthentication,
//   checkUser,
//   checkAdmin,
} = require("../controllers/user");
const { /*verifyToken*/ verifyAdmin, verifyUser } = require("../utils/verify");

const router = express.Router();

router.delete("/deleteUser/:id", verifyUser, deleteUser);
 
// router.get("/checkAdmin/:id", verifyAdmin, checkAdmin);
// router.get("/checkAuthentication", verifyToken, checkAuthentication);
// router.get("/checkUser/:id", verifyUser, checkUser);
router.get("/getAllUsers", verifyAdmin, getAllUsers);
router.get("/getUser/:id", verifyUser, getUser);

router.put("/updateUser/:id", verifyUser, updateUser);

module.exports = router;
