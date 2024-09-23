const AdminSecured='hfqwoiy9873204'

const adminauth=function adminauth(req,res,next){
    const token=req.headers.token;
    if(!token){
        return res.json({message:"Invalid credentials"})
    }
    const decoded=jwt.verify({token},AdminSecured)
     if(decoded){
        req.decode=decoded.id;
     }

    next();
}
module.exports = adminauth;