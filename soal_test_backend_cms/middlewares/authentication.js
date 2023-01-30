const { verifyToken } = require("../helpers/jwt");
const ModelUser = require("../models/user");
async function Authentication(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      res.send("please Login");
    }
    let payload = verifyToken(access_token);
    ModelUser.searchUserByUsername(payload.username, (err, user) => {
      if (err) {
        res.send("please Login");
      } else {
        req.user = {
          id: user.id,
          username: user.username,
        };
        next();
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = Authentication;
