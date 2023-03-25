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
        //만료시 메시지 jwt expired
      });
    }
  }
};

module.exports = authJWT;
