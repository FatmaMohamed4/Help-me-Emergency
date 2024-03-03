
import Jwt from 'jsonwebtoken';


class authController {
      //Auth card
     static auth = (req,res,next) =>{
        let token = req.header('token');
        console.log("token :" ,token)
        Jwt.verify(token,'project1',async (err,decoded)=>{
              if(err) return res.json({msg:"err",err})
        next()
     })
    }
}


export default authController