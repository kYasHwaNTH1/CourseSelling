const { Router } = require("express");
const adminRouter = Router();
const adminauth = require("../Authentication/adminauth");
const jwt = require("jsonwebtoken");
const AdminSecured='hfqwoiy9873204'
const { AdminModel, CourseModel } = require("../Schema");
const { userSchema } = require("../Validation/validation");

adminRouter.post("/signup", async (req, res) => {
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
    await AdminModel.create({
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
adminRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await AdminModel.findOne({ email: email, password: password });
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }
    if (password !== user.password) {
      return res.json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, AdminSecured);
    res.json({
      message: "User successfully logged in",
      token: token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
adminRouter.use(adminauth)
adminRouter.post("/course", async (req, res) => {
    //to post a course by admin
    const {title,description,price,imageUrl}=req.body;
    const adminid=req.decode;
   const course= await CourseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId:adminid
    })
res.json({
    msg:"Course created successfully",
    courseid:course._id
})

});
adminRouter.put("/course", async (req, res) => {
    const adminid=req.decode;
    const {title,description,price,imageUrl,courseid}=req.body;

    const course=await CourseModel.updateOne({
        _id:courseid,
        creatorId:adminid
},{
    title:title,description:description,price:price,imageUrl:imageUrl
    })
    
    if(!course){
        return res.status(404).json({message:"Course not found"})
    }
    res.json({
        msg:"Course updated successfully",
        courseid:courseid
    })

});

adminRouter.get("/course/bulk", async (req, res) => {
    const adminid=req.decode;
    const courses=await CourseModel.find({createId:adminid})
    res.json({
        courses
    })
});
module.exports = adminRouter;
