const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      phoneNumber: user.phoneNumber,
      _id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "999999d",
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(process.env.ENVIRONMENT = 'develop'){
    req.user = {isAdmin: true, phoneNumber: '09123456789' , _id: 1}
    next()
  }

  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    try {
      const decodes = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodes;
      next();
    } catch (err) {
      console.log(`error: ${err}`);
      res.status(401).send({ message: "کاربر معتبر نیست" });
    }
  } else {
    res.status(401).send({ message: "کاربر ناشناس است" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "شما به این صفحه دسترسی ندارید" });
  }
};

module.exports = { generateToken, isAuth, isAdmin };
