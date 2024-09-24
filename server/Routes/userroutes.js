const { Router } = require("express");
const { UserModel, PurchaseModel } = require("../Schema");
const { userSchema } = require("../Validation/validation");
const userRouter = Router();
const auth = require("../Authentication/auth");
const jwt = require("jsonwebtoken");
const Secured = "TIllybohlthepubli342q@@";

userRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const validation = userSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid format",
      errors: validation.error.errors.map((err) => err.message), // Return detailed errors
    });
  }
  console.log(req.body);
  try {
    await UserModel.create({
      firstname,
      lastname,
      email,
      password,
    });
    res.json({
      message: "User successfully signed up",
    });
  } catch (err) {
    res.status(400).json({ message: err.message, t: "not good" });
  }
});

userRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ email: email, password: password });
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }
    if (password !== user.password) {
      return res.json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, Secured);
    res.json({
      message: "User successfully logged in",
      token: token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.use(auth);

userRouter.get("/mycourses", async (req, res) => {
         const userid=req.decode;
         const mycourses=await PurchaseModel.find({userId: userid});
         res.json({
             mycourses: mycourses
         })
});
module.exports = {
  userRouter: userRouter,
};
