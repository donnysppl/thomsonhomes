const Seo = require("../models/seo");

const seoAdd = async (req, res) => {
    if(!req.body.name || !req.body.slug || !req.body.metatitle || !req.body.metadesciption || !req.body.metakeyword){
        res.status(400).json({ status: 400, 'message': 'Please Enter Data Properly'});
    }
    else{
        let pagesCheck = await Seo.findOne({ slug: req.body.slug });
        if(pagesCheck){
            res.status(400).json({ status: 400, 'message': 'Seo Already Exist'});
        }
        else{
            const { name, slug, metatitle, metadesciption, metakeyword } = req.body;
            const data = await Seo({ name, slug, metatitle, metadesciption, metakeyword });
            let response = await data.save();
            res.status(200).json({ status: 200, 'message': 'ok', 'response': response });
        }
    }
}

const seoList = async (req, res) => {
    let data = await Seo.find();
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}
const seoListperid = async (req, res) => {
    const page_id = req.params.id;
    let data = await Seo.findById(page_id);
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const seoListperslug = async (req, res) => {
    console.log(req.params);
    const page_slug = req.params.slug;
    let data = await Seo.findOne({slug : page_slug});
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const seoDelete = async (req, res) => {
    const id = req.params.id;
    let data = await Seo.findById(id);

    if (!data) {
        res.status(400).json({ status: 400, 'message': 'Data Not Found'});
    }
    else {
        Seo.findByIdAndDelete(id, (err, result) => {
            if (err) {
                res.status(400).json({ status: 400, 'message': err });
            }
            else {
                res.status(200).json({ status: 200, 'message': 'SEO Pages Data Delete' });
            }}
        ); 
    }
}

const seoEdit = async (req, res) => {
    const id = req.params.id;
    let data = await Seo.findById(id);

    if(!data){
        res.status(400).json({ status: 400, 'message': 'data not found' });
    }
    else{
        var updatepageRec = {
            name: req.body.name,
            slug: req.body.slug,
            metatitle: req.body.metatitle,
            metadesciption: req.body.metadesciption,
            metakeyword: req.body.metakeyword,
        }
    
        Seo.findByIdAndUpdate(req.params.id, {
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
    seoAdd, seoListperid, seoListperslug ,seoList, seoDelete,seoEdit
}