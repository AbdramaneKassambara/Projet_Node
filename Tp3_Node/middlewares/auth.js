const jwb = require("jsonwebtoken");
exports.private = (req, res, next) => {
  const { authorization } = req.headers;
  //console.log(authorization);
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  if (!token) {
    return res.send({ success: false, msg: "Not authorisation to access" });
  }
  try {
    const decodeToken = jwb.verify(token, process.env.JWT_SECRE_KEY);
    console.log(decodeToken);
    // pour envoyer l'id qu'on recoit dans le token
    req.meid = decodeToken.id;
  } catch (error) {
    //return res.send({ 'success': false, 'msg': 'Erreur sur authorisation to access' })
  }
  next();
};
