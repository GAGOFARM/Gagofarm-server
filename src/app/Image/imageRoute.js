//const { response } = require('express');
const baseResponse = require('../../../config/baseResponseStatus');
const imageUploader = require('../../../config/imageUploader');
const { response } = require('../../../config/response');
const { errResponse } = require('../../../config/response');

module.exports = function(app){

    // 4. 이미지 저장 API
    app.post('/app/image/upload', imageUploader.single('image'), function(req, res){
        
        const img = req.file;
        if(!img) {
            res.send(errResponse(baseResponse.UPLOAD_IMG_EMTPY));
        } else {
            res.send(response(baseResponse.SUCCESS_UPLOAD_IMG, {'imgUrl' : img.location}));
        }
    });//image.postImages);
    
};
