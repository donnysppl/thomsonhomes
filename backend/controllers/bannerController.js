const Banner = require("../models/banner");
const fs = require('fs');
const path = require('path');

const bannerAdd = async (req, res) => {
    // console.log(req.body, req.files);
    if (!req.body.name || !req.body.order || !req.body.link || !req.files.bannerImg || !req.files.bannerMobImg) {
        res.status(400).json({ status: 400, message: 'Please Enter the data properly' });
    }
    else { 
        const { name, order, link, status } = req.body;
        const bannerImgfile = req.files.bannerImg[0].filename;
        const bannerImg = `public/image/banner/${bannerImgfile}`;
        const bannerImgFilename = bannerImgfile;

        const bannerMobImgfile = req.files.bannerMobImg[0].filename;
        const bannerMobImg = `public/image/banner/${bannerMobImgfile}`;
        const bannerMobImgFilename = bannerMobImgfile;

        let data = await Banner({ name, order, link ,status, bannerImg, bannerImgFilename, bannerMobImg, bannerMobImgFilename });
        let response = await data.save();
        console.log(response)
        res.status(200).json({ status : 200,'message': 'ok', 'response': response });
    }
}

const bannerEdit = async (req, res) => {
    const banner_id = req.params.id;
    let data = await Banner.findById(banner_id);
    const fileName = data && data.bannerImgFilename;
    const directoryPath = path.join(__dirname, '../public/image/banner/');

    console.log(req.files);
    var updatebannerRec = null;
    if (req.files) {
        if(req.files.bannerImg && req.files.bannerMobImg){
            updatebannerRec = {
                name: req.body.name,
                order: req.body.order,
                link: req.body.link,
                status: req.body.status,
                bannerImg: `public/image/banner/${req.files.bannerImg[0].filename}`,
                bannerImgFilename:req.files.bannerImg[0].filename,
                bannerMobImg: `public/image/banner/${req.files.bannerMobImg[0].filename}`,
                bannerMobImgFilename: req.files.bannerMobImg[0].filename,
            }
        }
        else if(req.files.bannerImg){
            updatebannerRec = {
                name: req.body.name,
                order: req.body.order,
                link: req.body.link,
                status: req.body.status,
                bannerImg: `public/image/banner/${req.files.bannerImg[0].filename}`,
                bannerImgFilename:req.files.bannerImg[0].filename,
            }
        }
        else if(req.files.bannerMobImg){
            updatebannerRec = {
                name: req.body.name,
                order: req.body.order,
                link: req.body.link,
                status: req.body.status,
                bannerMobImg: `public/image/banner/${req.files.bannerMobImg[0].filename}`,
                bannerMobImgFilename: req.files.bannerMobImg[0].filename,
            }
        }
    }
    else {
        updatebannerRec = {
            name: req.body.name,
            order: req.body.order,
            link: req.body.link,
            status: req.body.status,
        }
    }

    console.log(updatebannerRec);

    Banner.findByIdAndUpdate(req.params.id, {
        $set: updatebannerRec
    }, { new: true }, function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).json({ status: 400, 'message': err });
        }
        else {
            if(req.file){
                fs.unlink(directoryPath + fileName, (err) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ status: 400, 'message': 'Data change But the old image is not delete',});
                    }
                    else {
                        res.status(200).json({ status: 200, 'message': 'Data Changes with image', result });
                    }
                })
            }
            else{
                res.status(200).json({ status: 200, 'message': 'data change', result });
            }
        }

    });

}

const bannerDelete = async (req, res) => {
    const banner_id = req.params.id;
    let data = await Banner.findById(banner_id);
    const fileName = data && data.bannerImgFilename;
    const directoryPath = path.join(__dirname, '../public/image/banner/');

    Banner.findByIdAndDelete(banner_id, (err, result) => {
        if (err) {
            res.status(400).json({ status: 400, 'message': err });
        }
        else {
            fs.unlink(directoryPath + fileName, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ status: 400, 'message': 'data deleted but image not',});
                }
                else {
                    console.log("Banner Image Delete");
                    res.status(200).json({ status: 200, 'message': 'Data Deleted' });
                }
            })
        }}
    );

}

const bannerList = async (req, res) => {
    let data = await Banner.find();
    if(data){
        res.status(200).json({ status : 200,'message': 'ok', 'response': data });
    }
    else{
        res.status(400).json({ status : 400,'message': 'Data Not Found'});
    }
}

const bannerListid = async (req, res) => {
    const banner_id = req.params.id;
    let data = await Banner.findById(banner_id);
    if(data){
        res.status(200).json({ status : 200,'message': 'ok', 'response': data });
    }
    else{
        res.status(400).json({ status : 400,'message': 'Data Not Found'});
    }
}

module.exports = {
    bannerAdd, bannerEdit, bannerDelete, bannerList, bannerListid
}