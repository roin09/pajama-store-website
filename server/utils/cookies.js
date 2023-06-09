const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("./jwt");
const redis = require("../utils/redis");
const dotenv = require("dotenv");
app.use(cookieParser());
dotenv.config();
module.exports = {
  // AT, RT 요청 -> header AT 검증 mw : ok or next()->[req.data = userid전달] RT검증 mw : OK or not=> AT 재발급 or redirect
  // 1. RT 재발급(login시) 2. RT 가져오기

  setCookie: async (req, res) => {
    await res.cookie("Token", req.refresh_token, {
      maxAge: 86400000,
      httpOnly: true,
      path: "/",
    });
    await res.cookie("userId", req.user_id, {
      maxAge: 86400000,
      httpOnly: true,
      path: "/",
    });
    res.status(200).send({
      ok: true,
      data: {
        accessToken: req.access_token,
        id: req.user_id,
      },
    });
  },
  getCookie: async (req, res, next) => {
    const userCookie = req.cookies.Token;
    const userId = req.cookies.userId;

    if (userCookie) {
      req.refresh_cookie = userCookie;
      req.userId = userId;
      next();
    } else {
      res.status(400).send({
        ok: false,
        message: "Refresh token are needed",
      });
    }
  },
};
