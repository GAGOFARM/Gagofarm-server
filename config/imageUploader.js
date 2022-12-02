//import AWS from 'aws-sdk'
//import multer from 'multer'
//import multerS3 from 'multer-s3'
//import path from 'path'
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { errResponse } = require('./response');
const { response } = require("./response")
const baseResponse = require("./baseResponseStatus");

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: 'AKIA3QHG7HU6HDSKQPOF',
    secretAccessKey: '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',
});

const s3 = new AWS.S3()

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp']

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'gagofarm-bucket',
        key: (req, file, callback) => {
            if (!file) {
                return res.send(errResponse(baseResponse.UPLOAD_IMG_EMTPY))
            }
            const uploadDirectory = req.query.directory ?? 'landImgDB' // 업로드할 디렉토리 설정. 없어도 괜찮.
            const extension = path.extname(file.originalname)
            if (!allowedExtensions.includes(extension)) {
                return callback(new Error('wrong extension'))
            }
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
        },
        acl: 'public-read-write'
    }),
})

module.exports = imageUploader;