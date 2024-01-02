const users = require("../models/users");
exports.getUser = async (req, res) => {
  const { meid } = req;
  const filters = { _id: meid };
  const chehc = await users.findOne(filters);
  if (!chehc) {
    return res.send({ success: "false", msg: "information invalide" });
  }
  const user = await users.find();
  //console.log(filters);
  res.send({ success: true, data: user });
};

exports.getUserMe = async (req, res) => {
  const { meid } = req;
  const filters = { _id: meid };
  const user = await users.findOne(filters);
  if (!user) {
    return res.send({ success: "false", msg: "informations invalid" });
  }
  res.send({ "success ": "true", data: user });
};

exports.putUserMe = async (req, res) => {
  const { meid } = req;
  const { firstName, lastName } = req.body;
  const update = { firstName: firstName, lastName: lastName };
  const filters = { _id: meid };
  const use = await users.findOne(filters);
  if (!use) {
    return res.send({ success: "false", msg: "informations invalid" });
  }
  await users.updateOne(filters, update);
  res.send({ "success ": "true" });
};

exports.deleteUserMe = async (req, res) => {
  const { meid } = req;
  const filters = { _id: meid };
  const use = await users.findOne(filters);
  if (!use) {
    return res.send({ success: "false", msg: "informations invalid" });
  }
  await users.deleteOne(filters);
  res.send({ "success ": "true" });
};

exports.putUserMeResrtStats = async (req, res) => {
  const { meid } = req;
  const filters = { _id: meid };
  const use = await users.findOne(filters);
  if (!use) {
    return res.send({ success: "false", msg: "informations invalid" });
  }
  const restarme = { " wins": 0, losts: 0 };
  await users.updateOne(filters, restarme);
  res.send({ success: "true" });
};
