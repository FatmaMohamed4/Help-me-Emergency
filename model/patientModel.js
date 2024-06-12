import { Schema, model, mongoose } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import generateOTP from 'otp-generator';

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name is too short"],
        maxlength: [25, "Name is too long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [15, 'Email is too short'],
        validate: [validator.isEmail, "This is not a valid Email"],
        unique: [true, "This Email used Before"],
    },
    password: {
        type: String,
        required: [true, "Enter password please"],
        maxlength: [25, 'Password must be between 8 to 25 characters'],
        minlength: [8, 'Password must be between 8 to 25 characters']
    },
    confirmPassword: {
        type: String,
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same',
        },
        required: [true, "Enter confirm password please"]
    },
    gender: [{
        type: String,
        enum: ['male', 'female'] ,
        default :'female'
    }] , 
    phone: {
        type: String,
        required: [true, "Enter your phone number"],
        unique: [true, "Enter valid phone number"]
    },
    // location: {
    //     type: String,
    //     required: true
    // },
    qr: {
        type: String,
        //  required : true
    },
    photo: {
        type: String ,
        default: function() {
            return this.gender === 'female' ? 'https://images.app.goo.gl/yzzhFFH6QL35HEu59' : 'https://images.app.goo.gl/yzzhFFH6QL35HEu59';
        }
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    } ,
    isAdmin : {
      type :Boolean  ,
      default :false
    }
}, { timestamps: true });

patientSchema.pre('save', async function (next) { //middleware
    //only run if password modified
    if (!this.isModified('password')) {
        return next();
    }
    //hash password
    this.password = await bcryptjs.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();
});


patientSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcryptjs.compare(candidatePassword, userPassword);
};

patientSchema.methods.generateOtp = async function () {
  const OTP_LENGTH=6
  const OTP = generateOTP.generate(process.env.OTP_LENGTH || OTP_LENGTH, {
    upperCaseAlphabets: true,
    specialChars: false,
  });
  this.otp = crypto.createHash('sha256').update(OTP).digest('hex');
  console.log("here")
  this.otpExpires = Date.now() + 10 * 60 * 1000; // valid 10 min
  return OTP;
};



// create model
const patientModel = model('patient', patientSchema);

export default patientModel;
