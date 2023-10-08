const nodeMailer = require("nodemailer")
const asyncHandler = require("express-async-handler")

const sendMail = asyncHandler(async(data, req, res) => {
    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Hey👻" <abc@gmail.com>', 
        to: data.to, 
        subject: data.subject,
        text: data.text,
        html: data.html,
      });
    
      console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
})

module.exports = sendMail;