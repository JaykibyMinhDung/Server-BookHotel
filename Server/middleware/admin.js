const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.json({
      statusCode: 401,
      message: "Tài khoản chưa đăng nhập, vui lòng thử lại",
    });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "websitebookhotelsadmin");
    if (!decodedToken) {
      return res.json({
        statusCode: 401,
        message:
          "Xác thực thất bại, tài khoản của bạn không tồn tại, vui lòng liên hệ kĩ thuật để khắc phục",
      });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
