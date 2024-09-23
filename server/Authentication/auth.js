const Secured='TIllybohlthepubli342q@@'

const auth=function auth(req,res,next){
    const token=req.headers.token;
    if(!token){
        return res.json({message:"Invalid credentials"})
    }
    const decoded=jwt.verify({token},Secured)
     if(decoded){
        req.decode=decoded.id;
     }

    next();
}
module.exports = auth;