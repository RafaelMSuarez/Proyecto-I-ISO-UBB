// const Post = require("../models/post.js");
// const User = require("../models/user.js");

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendmail = (req, res) => {
    const { message } = req.body
    const token =process.env.PW
    const mail = 'respondern.t@gmail.com'
    if(!token){
        return res.status(400).send({message: "contraseña no entregada"})
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user: 'respondern.t@gmail.com',
            pass:token
        }
    })
    let sendDirectory = [
        'johan.rodriguez1901@alumnos.ubiobio.cl'
    ]
    const mailOptions = {
        from: `ADMIN <Reporte${mail}>`,
        to: sendDirectory,
        subject: 'Usuario eportado',
        text: `El reporte ${message}, ha sido enviado correctamente`
    }
    transporter.sendmail(mailOptions,(err, info)=>{
        if(err){
            return res.status(400).send({message: 'Error Syntaxis al enviar el correo'})
        }
        return res.status(200).send({message: 'Mensaje correctamente enviado'})
    })
    transporter.verify().then(()=>{
        console.log('Server de correos habilitado')
    }).catch(err=>{
        console.log('Error al utilizar server de correos')
    })
}

module.exports = sendmail