import patientModel from '../model/patientModel.js';
import  Jwt  from 'jsonwebtoken';
import {promisify} from 'util'
import catchError from '../utilites/catchError.js';
import AppError from '../utilites/AppError.js';
import { sendToEmail } from './../utilites/Emails.js';


class authController {
    static registerPatient =catchError( async (req, res,next) => {
        
         const newData =  await patientModel.create(req.body)
         if (!newData){
            return next(new AppError('Error in adding Patient' ,500))
         }
           res.status(201).json({
            status:true,
            message:"Sign up Successfully",
           })
           }  
          
    )


    static LogInPatient = catchError(async (req, res,next) => {
    
        const { email, password } = req.body;
        const patient = await patientModel.findOne({ email: email });
        //
            if (!patient || !await patient.correctPassword(password, patient.password)) {
                return next(new AppError('Invalid email or password',401))
            } 
            let token = Jwt.sign({ userId: patient._id }, 'project1',{expiresIn:"90d"});  
           
            res.status(200).json({
                status: true,
                message: "Log in Successfully",
                token: token,
            });
})

    static forgotPassword = catchError(async (req, res,next) => {   
            const user = await patientModel.findOne({ email: req.body.email });
            if (!user) {
                return next(new AppError('Invalid email or password',401))
            }
    
            const otp = await user.generateOtp();
            await user.save({ validateBeforeSave: false });
            sendToEmail(req.body.email, otp);
    
            res.status(200).json({
                status: true,
                message: "OTP generated and sent to your email"
            }); 
    })

    static verifyOTP=catchError(async(req,res,next)=>{
        
            const otp=crypto.createHash('sha256').update(req.body.otp).digest('hex');;
            const user = await patientModel.findOne({otp:otp,otpExpires:{ $gt: Date.now() },})
            if(!user){
                return next(new AppError('Patient not found',404))
            }
            const token = Jwt.sign({ userId: user._id }, 'project1',{expiresIn:"90d"});  
            res.status(200).json({
                status:true,
                messge:"Comfirmed OTP",
                token
            })
        
    })
    
    static resetPassword = catchError(async (req, res,next) => {
          const user =req.user;
          user.password=req.body.password
          user.confirmPassword=req.body.confirmPassword
          user.otp=undefined,
          user.otpExpires=undefined
          user.save({validateBeforeSave:true})
          res.status(200).json({
            status:true,
            user
          })
        
      })

   
      static protect= async(req,res,next) =>{
        //for specific user
        //token from user 
        let token ;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
            token=req.headers.authorization.split(" ")[1]
        }
        console.log(token)
        if(!token){
            return next(new AppError('Please Login and Try again',401))
        }
        
        
        //verfiy token with secret key
        const decodedToken = await promisify (Jwt.verify)(token,'project1') //return id
        console.log(decodedToken)
        //check user (of token) is exist
        const currentUser =await patientModel.findById(decodedToken.userId)
        
        
          if(!currentUser){
            return res.status(404).json({
                message : "Sesstion is expired"
            })
          }
        
        
          req.user=currentUser
        next()
        }
        
    
    static restrictTo=()=>{ 
        return (req,res,next)=>{
            if(!req.user.isAdmin){
                return next(new AppError('Can not do this,It is for admins only ,Forbidden',403))
            }
            next();
        }
    
    }

}

export default authController