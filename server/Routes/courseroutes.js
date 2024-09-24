const {Router}=require('express')
const auth = require('../Authentication/auth')
const courseRouter=Router()
const { PurchaseModel } =require('../Schema')
const { CourseModel } = require('../Schema')


courseRouter.get('/preview',async(req,res)=>{
    const allcourses=await CourseModel.find({})
    res.json({
        allcourses
    })
})


module.exports={
    courseRouter:courseRouter 
}

courseRouter.use(auth)


courseRouter.post('/purchase',async(req,res)=>{
    const userId=req.decode
    const courseId=req.body.courseId

    await PurchaseModel.create({
        userId,
        courseId
    })
    res.json({message:'Course purchased'})
})


