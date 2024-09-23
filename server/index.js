const express=require('express')
const jwt=require('jsonwebtoken')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const {userRouter}=require('./Routes/userroutes')
const {courseRouter}=require('./Routes/courseroutes')
const adminRouter=require('./Routes/adminroutes')




app.use(cors());
app.use(express.json()); 
// app.use(function auth(req,res,next){
//     const token=req.headers.token;
//     if(!token){
//         return res.json({message:"Invalid credentials"})
//     }
//     const decoded=jwt.verify({token},Secured)
//      if(decoded){
//         req.decode=decoded.id;
//      }

//     next();
// })

app.use('/api/v1/user',userRouter)

app.use('/api/v1/course',courseRouter)

app.use('/api/v1/admin',adminRouter) 


async function  main(){

await mongoose.connect('mongodb+srv://kesagoniyashwanth:0atPuraPgu9cpZyr@cluster0.0a3g4.mongodb.net/CourseSelling')
.then(()=>{
    console.log('Connected to Database Successfully')
}) 

app.listen(3001,()=>{
    console.log("listening on 3001")
})

}
main();

// app.post('/user/signup',async(req,res)=>{
//     const email=req.body.email;
//     const password=req.body.password;
//     const username=req.body.username;
   
    
// const validation=userSchema.safeParse(req.body)

// if (!validation.success) {
//     return res.status(400).json({
//       message: "Invalid format",
//       errors: validation.error.errors.map(err => err.message) // Return detailed errors
//     });
//   }
// console.log(req.body)
// try{
//    await UserModel.create({
//            username,
//            email,
//            password,
//            mycourses:[]
//      })
//      res.json({
//         message:"User successfully signed up",
//     })
//     }
//    catch(err){
//      res.status(400).json({message:err.message})
//    }
     
// })

// app.post('/user/signin',async(req,res)=>{

//       const email=req.body.email;
//       const password=req.body.password;

//       const validation=userSchema.safeParse(req.body)

//       if (!validation.success) {
//           return res.status(400).json({
//             message: "Invalid format",
//             errors: validation.error.errors.map(err => err.message) // Return detailed errors
//           });
//         }

//       try{
//     const user=await  UserModel.findOne({email:email,password:password})
//     if(!user){
//        return  res.json({message:"Invalid credentials"})
//     }
//     if(password!==user.password){
//        return  res.json({message:"Invalid credentials"})
//     }
//    const token=jwt.sign({id:user._id},Secured)
//     res.json({
//         message:"User successfully logged in",
//         token:token
//     })
// }
// catch(err){
//     res.status(400).json({message:err.message})
// }

// })

// app.use(function auth(req,res,next){
//     const token=req.headers.token;
//     if(!token){
//         return res.json({message:"Invalid credentials"})
//     }
//     const decoded=jwt.verify({token},Secured)
//      if(decoded){
//         req.decode=decoded.id;
//      }

//     next();
// })