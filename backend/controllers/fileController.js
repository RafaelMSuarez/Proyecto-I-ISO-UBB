const file = require("../models/file")

const uploadNewFile = (req,res) => {
    const {files} = req
    let aux = files.map((file) => {
        const newFile = new file({
            url:file.path,
            name:file.originalname,
            mimeTye:file.mimeType
        })
        newFile.save((err,fileSaved) => {
            if(err){
                return res.status(400).send({message:"Error al guardar archivo"})
            }
        })
        return newFile
    })
    return res.status(201).send(aux)
}

const getFiles = (req,res)=>{
    file.find({},(err,file)=>{
        if(err){
            return res.status(400).send({message:"No se pueden obtener los archivos"})
        }else{
            return res.status(200).send(file)
        }
    })
}

const getSpecificFile = (req,res)=>{
    const {id} = req.params
    fileModel.findbyId(id,(err,file)=>{
        if(err){
            return res.status(400).send({message:"No se pueden obtener los archivos"})
        }
        if(!file){
            return res.status(404).send({message:"No existe archivo"})
        }
        return res.download('./'+file.url)
    })
}


module.exports = {
    uploadNewFile,
    getFiles,
    getSpecificFile
}