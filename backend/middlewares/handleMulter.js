const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        const route = '/upload/'+req.params.archivo
        if (!fs.existsSync(route)){
            fs.mkdirSync(route,{recursive:true})
        }
        cb(null,route)
    },
    filename:function(req,file,cb){
        let fecha = new Date();
        fecha = fecha.getFullYear()+'-'+(fecha.getDay()+1)+'/'+ fecha.getMonth()+'/'+fecha.getYear()
        const nameFile = fecha+'-'+file.originalname
        cb(null,nameFile)
    }
})

const upload = multer({
    storage: storage,
    fileFilter:function(req,file,cb){
        if(file.mimeType == '/image.png'){
            console.log("El archivo es una imagen")
        }else{
            console.log("El archivo no es una imagen")
        }
        cb(null,true)
    },
    //tamaño archivo
    limits:{
        fileSize:1024*1024*5
    }
})

module.exports = upload