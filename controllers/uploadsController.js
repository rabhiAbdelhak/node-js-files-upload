const path = require('path');
const {BadRequestError} = require('../errors')
const {StatusCodes} = require('http-status-codes')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (req, res) => {
    if(!req.files){
        throw new BadRequestError('There is no file uploaded !')
    }
    const productImage = req.files.image;

    if(!productImage.mimetype.startsWith('image')){
        throw new BadRequestError('The File you uploaded is not an image !');
    }

    const maxsize = 1024 * 1024;
    if(productImage.size > maxsize){
        throw new BadRequestError('The image uploaded must be less then 1mo')
    }
    console.log(productImage);
    const imagePath = path.join(__dirname, '../public/uploads/'+productImage.name );
    await productImage.mv(imagePath);
    res.status(200).json({image : {src: 'uploads/'+productImage.name}});
}

const uploadImageCloud = async (req, res) => {
    if(!req.files){
        throw new BadRequestError('There is no file uploaded !')
    }
    const productImage = req.files.image;

    if(!productImage.mimetype.startsWith('image')){
        throw new BadRequestError('The File you uploaded is not an image !');
    }

    const maxsize = 1024 * 1024;
    if(productImage.size > maxsize){
        throw new BadRequestError('The image uploaded must be less then 1mo')
    }
    const imagePath = productImage.tempFilePath;
    
    const result = await cloudinary.uploader.upload(imagePath , {
        use_filename: true,
        folder : 'upload_files_course_nodjs'
    })
    fs.unlinkSync(imagePath);
    res.status(StatusCodes.OK).json({image : {src : result.secure_url}})
}


module.exports = {uploadImage, uploadImageCloud};