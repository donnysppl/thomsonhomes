const Contact = require("../models/contact");

const contactAdd = async (req,res) =>{
    if(!req.body.name || !req.body.email || !req.body.number || !req.body.message){
        res.status(400).json({ status : 400,'message': 'Data Not Found'});
    }
    else{
        const {name, email, number, message} = req.body;
        let data = await Contact.contact({name, email, number, message});
        let response = await data.save();
        res.status(200).json({ status : 200,'message': 'Submit Successfully', 'response': response });
    }
}

const contactList = async (req, res) => {
    let data = await Contact.contact.find();
    if(!data){
        res.status(400).json({ status : 400,'message': 'Data Not Found'});
    }
    else{
        res.status(200).json({ status : 200,'message': 'ok', 'response': data });
    }
}

const contactFrontAdd = async (req,res) =>{
    if(!req.body.pagecontent || !req.body.metatitle || !req.body.metadiscrip || !req.body.metakeyword){
        res.status(400).json({ status : 400,'message': 'Data Not Found'});
    }
    else{
        const {pagecontent, metatitle, metadiscrip, metakeyword} = req.body;
        let data = await Contact.contactfront({pagecontent, metatitle, metadiscrip, metakeyword});
        let response = await data.save();
        res.status(200).json({ status : 200,'message': 'Submit Successfully', 'response': response });
    }
}

const contactFrontEdit = async (req,res) =>{
    const id = req.params.id;
    let data = await Contact.contactfront.findById(id);

    if(!data){
        res.status(400).json({ status: 400, 'message': 'data not found' });
    }
    else{
        var updatepageRec = {
            pagecontent: req.body.pagecontent,
            metatitle: req.body.metatitle,
            metadiscrip: req.body.metadiscrip,
            metakeyword: req.body.metakeyword,
        }
    
        Contact.contactfront.findByIdAndUpdate(req.params.id, {
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

const contactFrontList = async (req, res) => {
    const id = req.params.id;
    let data = await Contact.contactfront.findById(id);
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

module.exports = {
    contactAdd, contactList, contactFrontAdd ,contactFrontEdit, contactFrontList
}