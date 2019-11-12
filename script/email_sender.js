const nodemailer = require('nodemailer')

const sendMail = async function(obj) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const info = await transporter.sendMail({
    from: '"no-reply 👻" <gr8fruitltd@gmail.com',
    to: obj.to,
    subject: obj.subject,
    text: obj.text,
    html: obj.html
  })
  console.log('Message sent: %s', info.messageId)
}

// Example
// sendMail({
//   to: 'pawel3ala@gmail.com',
//   subject: 'Your order has been sucesfully placed',
//   text: 'Your grapefruits are on the way',
//   html: '<h1>Your grapefruits are on the way</h1>'
// })

module.exports = sendMail
