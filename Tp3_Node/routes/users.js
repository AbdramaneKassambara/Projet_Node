const express = require("express");
const {
  getUser,
  getUserMe,
  putUserMe,
  deleteUserMe,
  putUserMeResrtStats,
} = require("../controllers/users");
// je ne recupere aucun information sur Params donc on pas besoin
const { private } = require("../middlewares/auth");
const router = express.Router({ mergeParams: true });
// GET /users
// GET /users/me
// PUT /users/me
//DELETE /users/me
// PUT/users/me/reset-stats
router.route("/").get(private, getUser);
router.route("/me").get(private, getUserMe);
router.route("/me").put(private, putUserMe);
router.route("/me").delete(private, deleteUserMe);
router.route("/me/reset-stats").put(private, putUserMeResrtStats);
module.exports = router;
