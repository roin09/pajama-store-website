const { verify } = require("../utils/jwt");

const authJWT = (req, res) => {
  if (req.token) {
    const result = verify(req.token);
    if (result.ok) {
      req.id = result.id;
      return {
        ok: true,
        id: result.id,
      };
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  }
};

module.exports = authJWT;
