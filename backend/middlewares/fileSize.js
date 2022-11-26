const fileSizeError = (err,req,res,next) => {
    if(err){
        return res.status(413).send({mesagge:"Demasiado grande"})
    }else{
        next()
    }
}

module.exports = fileSizeError