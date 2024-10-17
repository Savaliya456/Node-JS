const mailer = require('nodemailer')

const transport = mailer.createTransport({
    service : "gmail",
    auth : {
        user : "hepin3584@gmail.com",
        pass : "fuyvhsqmihxdgecv"
    }
})

module.exports.sendOtp = (to, otp)=>{
    const mailOptions = {
        from : "hepin3584@gmail.com",
        to : to,
        subject : "Verification OTP",
        text : `Your verification OTP is ${otp}`
    }

    transport.sendMail(mailOptions, (err)=>{
        console.log(err ? err : 'OTP Send Successfully');
    })
}


