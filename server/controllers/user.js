const User = require("../models/User");

module.exports.create = async (req, res) => {
  try {
    const { userId, password, info } = req.body;

    //새 User document 생성
    const user = new User({ userId, password, info });
    await user.save();

    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.find = async (req, res) => {
  try {
    const { userId } = req.params;
    const Id = userId.id;
    if (userId) {
      const user = await User.findOne({ userId });
      if (!user) return res.status(404).send("user not found");
      return res.send(user);
    }
    const users = await User.find({});
    return res.send(users);

    // 성공 if (Id) {
    //   const filteredUser = User.filter((user) => user.userId === Number(Id));
    //   if (!filteredUser) {
    //     return res.status(404).send("Users not found");
    //   }
    //   return res.json(filteredUser);
    // }
    // return res.send(User);

    //userId = { "id" : "1"}
    //userId.id = 1
    //실패 if (userId) {
    //   User.map((user) => {
    //     if (Number(userId) === user.userId) {
    //       return res.send(user);
    //     } else {
    //       return res.status(404).send("Users not found");
    //     }
    //   });
    // }
    // //req.params.username 없으면 모든 유저 리턴
    // return res.send(User);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { userId } = req.params;
    // userId를 가진 유저 정보를 찾는다.
    const user = await User.deleteOne({ userId });

    // userId를 가진 유저가 없으면 404를 리턴한다.
    if (!user) return res.status(404).send("user not found");

    // 유저 정보를 삭제한다.

    return res.send("user removed");
  } catch (err) {
    return res.status(500).send(err);
  }

  // 성공 for (let i = 0; i < User.length; i++) {
  //   if (User[i].userId === Number(Id)) {
  //     User.splice(i, 1);
  //     return res.send(User);
  //   }
  // }
  // return res.status(404).send("User not found");
  //실패 const filterdArr = [];
  // const filterdUsers = User.reduce((acc, cur) => {
  //   if (cur.userId !== userId) {
  //     filterdArr.push(cur);
  //   }
  //   return filterdArr;
  // }, filterdArr);
  // return res.send(filterdUsers);
};

module.exports.register = async (req, res) => {
  try {
    // Id, password 미입력
    if (!req.body.userId)
      return res.status(400).send({ message: "userId가 필요합니다" });
    if (!req.body.password)
      return res.status(400).send({ message: "password가 필요합니다" });
    //ID 중복검사
    const exUser = await User.findOne({ userId: req.body.userId });
    if (exUser)
      return res.status(409).send({ message: "이미 사용중인 아이디입니다" });
    //document 생성
    const user = new User({
      userId: req.body.userId,
      password: req.body.password,
      info: req.body.info,
    });

    //document 저장
    await user.save();
    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.login = async (req, res) => {
  try {
    //userId 일치 document 찾기
    const user = await User.findOne({ userId: req.body.userId });
    if (!user)
      return res.status(404).send({ message: "존재하지 않는 Id 입니다" });
    if (user.password != req.body.password)
      return res.status(409).send({ message: "비밀번호가 일치하지 않습니다" });
    //로그인 성공
    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.logout = async (req, res) => {
  try {
    return res.send();
  } catch (err) {
    return res.status(500).send(err);
  }
};
