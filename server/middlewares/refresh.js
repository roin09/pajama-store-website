const jwt = require("../utils/jwt");
const User = require("../models/User");

const refresh = async (req, res) => {
  //accesstoken 검증  {ok : boolean, ok === true? id : message}
  //user에서 token 있는 경우에만 refresh함수 요청=> true 면 AT 만료X, false면 AT 만료
  const authResult = await jwt.verify(req.authToken);
  //accesstoken decoding 에서 id 값 가져옴
  // const decoded = jwt.decode(req.authToken);
  const decoded = authResult.id;
  const user = await User.findOne({ userId: decoded });
  const refreshResult = await jwt.refreshVerify({
    token: req.refreshToken,
    userId: decoded,
  });
  //AT 만료
  if (authResult.ok === false && authResult.message === "jwt expired") {
    //AT 만료, RT 만료
    if (refreshResult.ok === false) {
      return {
        ok: false,
        message: "No authorized",
      };
    }
    //AT 만료,  RT 만료X
    else {
      const newAccessToken = jwt.sign(user);
      user.accessToken = newAccessToken;
      await user.save();
      return {
        ok: true,
        data: {
          accessToken: newAccessToken,
          refreshToken: refreshToken,
        },
      };
    }
  }
  //AT 만료X
  return {
    ok: false,
    message: "Access token not expired",
  };
};

module.exports.refresh;
