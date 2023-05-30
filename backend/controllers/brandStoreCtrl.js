const Brandstore = require("../models/brandstore");

const brandStoreAdd = async (req, res) => {
    if (!req.body.name || !req.body.slug || !req.body.brandstoredata) {
        res.status(400).json({ status: 400, 'message': 'Please fill all inputs' });
    }
    else {
        let bsCheck = await Brandstore.findOne({ slug: req.body.slug });
        if (bsCheck) {
            res.status(400).json({ status: 400, 'message': 'Brand Store Already Exist' });
        }
        else {
            const { name, slug, brandstoredata } = req.body;
            const data = await Brandstore({ name, slug, brandstoredata });
            let response = await data.save();
            res.status(200).json({ status: 200, 'message': 'ok', 'response': response });
        }
    }
}

const bsList = async (req, res) => {
    const data = await Brandstore.find();
    if (!data) {
        res.status(400).json({ status: 400, 'message': 'Data not found' });
    }
    else {
        res.status(200).json({ status: 200, 'message': 'Data Found', 'result': data });
    }
}

const bsListID = async (req, res) => {
    const bs_id = req.params.id;
    const data = await Brandstore.findById(bs_id);
    if (!data) {
        res.status(400).json({ status: 400, 'message': 'Data not found' });
    }
    else {
        res.status(200).json({ status: 200, 'message': 'Data Found', 'result': data });
    }
}

const bsDelete = async (req, res) => {
    const bs_id = req.params.id;
    if (!bs_id) {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    } else {
        Brandstore.findByIdAndDelete(bs_id, (err, result) => {
            if (err) {
                res.status(400).json({ status: 400, 'message': err });
            }
            else {
                res.status(200).json({ status: 200, 'message': 'Data Deleted' });
            }
        }
        );
    }

}

const bsEdit = async (req, res) => {
    const bs_id = req.params.id;
    const updateDataRecord = {
        name: req.body.name,
        slug: req.body.slug,
        brandstoredata: req.body.brandstoredata,
    }

    Brandstore.findByIdAndUpdate(bs_id, {
        $set: updateDataRecord
    }, { new: true }, function (err, result) {
        if (err) {
            res.status(400).json({ status: 400, 'message': err });
        }
        else {
            res.status(200).json({ status: 200, 'message': 'data change', result });
        }

    });
}
const bsDataSlug = async (req, res) => {
    const bs_slug = req.params.slug;
    const data = await Brandstore.find({ slug: bs_slug });
    if (!data) {
        res.status(400).json({ status: 400, 'message': err });
    } else {
        res.status(200).json({ status: 200, 'message': 'Data', 'result' : data });
    }
}
module.exports = {
    brandStoreAdd, bsList, bsListID, bsDelete, bsEdit, bsDataSlug
}