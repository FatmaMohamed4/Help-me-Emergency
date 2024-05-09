import nodemailer from 'nodemailer';


export const sendToEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: 'mail1project1@gmail.com', 
            pass: 'dedbgjcvpeimmrwl'
        }
    });

    // Email content
    const mailOptions = {
        from: '"Help me EMERGENCY !!" <mail1project1@gmail.com>', // Sender name and email address
        to: email, 
        subject: 'Your Reset Code (OTP)', 
        text: `Your Reset Passcode is: ${otp}` 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    console.log(mailOptions)
}
export default sendToEmail