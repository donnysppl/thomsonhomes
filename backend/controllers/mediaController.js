const Media = require("../models/media");

const mediaAdd = async (req,res) =>{
    if(!req.body.title || !req.body.discription || !req.body.link || !req.body.date || !req.body.owner){
        res.status(400).json({ status : 400,'message': 'Data Not Found'});
    }
    else{
        const {title,discription,link,date,owner} = req.body;
        let data = await Media({title,discription,link,date,owner});
        let response = await data.save();
        res.status(200).json({ status : 200,'message': 'ok', 'response': response });
    }
}

const mediaList = async (req, res) => {
    let data = await Media.find();
    if(!data){
        res.status(400).json({ status : 400,'message': 'Data Not Found'});
    }
    else{
        res.status(200).json({ status : 200,'message': 'ok', 'response': data });
    }
}
const mediaListId = async (req, res) => {
    const id = req.params.id;
    let data = await Media.findById(id);
    if(!data){
        res.status(400).json({ status : 400,'message': 'Data Not Found'});
    }
    else{
        res.status(200).json({ status : 200,'message': 'Data Deleted', response:data });
    }
}
const mediaDelete = async (req, res) => {
    const id = req.params.id;
    let data = await Media.findByIdAndDelete(id);
    if(!data){
        res.status(400).json({ status : 400,'message': 'Data Not Found'});
    }
    else{
        res.status(200).json({ status : 200,'message': 'Data Deleted' });
    }
}

const mediaEdit = async (req, res) => {
    const id = req.params.id;
    let data = await Media.findById(id);

    if(!data){
        res.status(400).json({ status: 400, 'message': 'data not found' });
    }
    else{
        var updatepageRec = {
            title: req.body.title,
            discription: req.body.discription,
            link: req.body.link,
            date: req.body.date,
            owner: req.body.owner,
        }
        Media.findByIdAndUpdate(req.params.id, {
            $set: updatepageRec
        }, { new: true }, function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).json({ status: 400, 'message': err });
            }
            else {
                res.status(200).json({ status: 200, 'message': 'data change', result });
            }
        });
    }
}

module.exports = {
    mediaAdd, mediaList, mediaDelete, mediaEdit, mediaListId
}