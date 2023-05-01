const Pages = require("../models/pages");

const pagesAdd = async (req, res) => {
    if(!req.body.name || !req.body.slug || !req.body.bodydata || !req.body.metatitle || !req.body.metadesciption || !res.body.metakeyword){
        res.status(400).json({ status: 400, 'message': 'Please Enter Data Properly'});
    }
    else{
        let pagesCheck = await Pages.findOne({ slug: req.body.slug });
        if(pagesCheck){
            res.status(400).json({ status: 400, 'message': 'Page Already Exist'});
        }
        else{
            const { name, slug, bodydata, metatitle, metadesciption, metakeyword } = req.body;
            const data = await Pages({ name, slug, bodydata, metatitle, metadesciption, metakeyword });
            let response = await data.save();
            res.status(200).json({ status: 200, 'message': 'ok', 'response': response });
        }
    }
}

const pagesListperid = async (req, res) => {
    const page_id = req.params.id;
    let data = await Pages.findById(page_id);
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const pagesListperslug = async (req, res) => {
    const page_slug = req.params.slug;
    let data = await Pages.findOne({slug : page_slug});
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const pagesList = async (req, res) => {
    let data = await Pages.find();
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const pagesDelete = async (req, res) => {
    const page_id = req.params.id;
    let data = await Pages.findById(page_id);

    if (!data) {
        res.status(400).json({ status: 400, 'message': 'Data Not Found'});
    }
    else {
        Pages.findByIdAndDelete(page_id, (err, result) => {
            if (err) {
                res.status(400).json({ status: 400, 'message': err });
            }
            else {
                res.status(200).json({ status: 200, 'message': 'Pages Data Delete' });
            }}
        ); 
    }
}

const pageEdit = async (req, res) => {
    const page_id = req.params.id;
    let data = await Pages.findById(page_id);

    if(!data){
        res.status(400).json({ status: 400, 'message': 'data not found' });
    }
    else{
        var updatepageRec = {
            name: req.body.name,
            slug: req.body.slug,
            bodydata: req.body.bodydata,
            metatitle: req.body.metatitle,
            metadesciption: req.body.metadesciption,
            metakeyword: res.body.metakeyword,
        }
    
        Pages.findByIdAndUpdate(req.params.id, {
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
    pagesAdd, pagesListperid, pagesList, pagesDelete, pageEdit, pagesListperslug
}