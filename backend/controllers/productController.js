const Product = require("../models/product");
const fs = require('fs');
const path = require('path');

// category
const categoryAdd = async (req, res) => {
    console.log(req.body);

    if (!req.body.name || !req.body.order || !req.body.slug || !req.body.metatitle || !req.body.metadescription || !req.body.metakeywords) {
        res.status(400).json({ status: 400, message: 'Please Enter the data properly' });
    }
    else {
        let categoryCheck = await Product.category.findOne({ slug: req.body.slug });

        if (categoryCheck) {
            res.status(400).json({ status: 400, 'message': 'Data already Exist' });
        }
        else {
            const { name, order, parentcate, childcate, slug, metakeywords, metatitle, metadescription, cateimg } = req.body;
            let data = await Product.category({ name, order, parentcate, childcate, slug, cateimg, metakeywords, metatitle, metadescription });
            let response = await data.save();
            console.log(response)
            res.status(200).json({ status: 200, 'message': 'Data Saved SuccessFully', 'response': response });
        }
    }
}

const categoryListperId = async (req, res) => {
    const category_id = req.params.id;
    let data = await Product.category.findById(category_id);
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const categoryList = async (req, res) => {
    let data = await Product.category.find();
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const categoryDelete = async (req, res) => {
    const category_id = req.params.id;
    let data = await Product.category.findById(category_id);
    const fileName = data && data.cateimgfilename;
    const directoryPath = path.join(__dirname, '../public/image/category/');

    Product.category.findByIdAndDelete(category_id, (err, result) => {
        if (err) {
            res.status(400).json({ status: 400, 'message': err });
        }
        else {
            res.status(200).json({ status: 200, 'message': 'Data Deleted' });
        }
    });

}

const categoryEdit = async (req, res) => {
    const category_id = req.params.id;
    let data = await Product.category.findById(category_id);

    var updateCategoryRec = {
        name: req.body.name,
        order: req.body.order,
        link: req.body.link,
        parentcate: req.body.parentcate,
        childcate: req.body.childcate,
        slug: req.body.slug,
        metakeywords: req.body.metakeywords,
        metatitle: req.body.metatitle,
        metadescription: req.body.metadescription,
        cateimg: req.body.cateimg,
    };

    Product.category.findByIdAndUpdate(req.params.id, {
        $set: updateCategoryRec
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

// product
const productAdd = async (req, res) => {
    if (!req.body.name || !req.body.slug || !req.body.metatitle || !req.body.metadiscrip || !req.body.metakeyword || !req.body.category || !req.body.model) {
        res.status(400).json({ status: 400, 'message': 'Please Enter the data properly' });
    }
    else {
        let productCheck = await Product.product.findOne({ slug: req.body.slug });
        if (productCheck) {
            res.status(400).json({ status: 400, 'message': 'Data already Exist' });
        }
        else {
            const { name, slug, metatitle, metadiscrip, metakeyword, category, categoryslug, parentcategory, model, shortdiscrip, buylink, discription, mainproductimg, productimg, productrpd } = req.body;
            const data = await Product.product({ name, slug, metatitle, metadiscrip, metakeyword, category, categoryslug, parentcategory, model, shortdiscrip, buylink, discription, mainproductimg, productimg, productrpd });
            let response = await data.save();
            console.log(response)
            res.status(200).json({ status: 200, 'message': 'ok', 'response': response });
        }
    }
}

const productList = async (req, res) => {
    let data = await Product.product.find();
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const productPerListData = async (req, res) => {
    //     console.log(req.params)
    //     // const product_id = req.params.id;
    //     // let data = await Product.product.findById(product_id);
    //     // console.log(data)
    //     // if (data) {
    //     //     res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    //     // }
    //     // else {
    //     //     res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    //     // }
    //     let data = await Product.product.find();
    //     if (data) {
    //         res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    //     }
    //     else {
    //         res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    //     }
}

const productlistbyID = async (req, res) => {
    const product_id = req.params.id;
    let data = await Product.product.findById(product_id);
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const productlistbyCate = async (req, res) => {
    const product_category = req.params.category;
    let data = await Product.product.find({$or: [
        {parentcategory : product_category},
        {category : product_category}
    ]});
    if (data) {
        res.status(200).json({ status: 200, 'message': 'ok', 'response': data });
    }
    else {
        res.status(400).json({ status: 400, 'message': 'Data Not Found' });
    }
}

const productDelete = async (req, res) => {
    const product_id = req.params.id;
    let data = await Product.product.findById(product_id);

    Product.product.findByIdAndDelete(product_id, (err, result) => {
        if (err) {
            res.status(400).json({ status: 400, 'message': err });
        }
        else {
            res.status(200).json({ status: 200, 'message': 'Data Deleted' });
        }
    }
    );

}

const productEdit = async (req, res) => {

    const product_id = req.params.id;
    let data = await Product.product.findById(product_id);

    let updateProdRec = {
        name: req.body.name,
        category: req.body.category,
        model: req.body.model,
        shortdiscrip: req.body.shortdiscrip,
        buylink: req.body.buylink,
        discription: req.body.discription,
        slug: req.body.slug,
        productrpd: req.body.productrpd,
        productimg: req.body.productimg,
        mainproductimg: req.body.mainproductimg,
        metatitle: req.body.metatitle,
        metadiscrip: req.body.metadiscrip,
        metakeyword: req.body.metakeyword,
        parentcategory: req.body.parentcategory,
        categoryslug: req.body.categoryslug,
    }

    Product.product.findByIdAndUpdate(req.params.id, {
        $set: updateProdRec
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

// product Image
const productImgAdd = async (req, res) => {
    console.log('req.files ', req.files)
    const product_id = req.params.id;

    if (!product_id) {
        res.status(400).json({ status: 400, 'message': 'ID Not Found' });
    }
    else {
        let productData = await Product.product.findById(product_id);
        if (!productData) {
            res.status(400).json({ status: 400, 'message': 'Product Not Found' });
        }
        else {
            const { filename } = req.files.mainproductimg[0];
            const mainproductimg = `public/image/product/${product_id}/${filename}`;
            for (let i = 0; i < req.files.productimg.length; i++) {
                productData.productimg.push({
                    productimgurl: `public/image/product/${product_id}/${req.files.productimg[i].filename}`,
                    productimgfilename: req.files.productimg[i].filename
                });
            }
            productData.mainproductimg = mainproductimg;
            productData.mainproductimgfilename = filename;
            const result = await productData.save();
            res.status(200).json({ status: 200, 'message': 'Image Uploaded', result });
        }
    }

}

const prodImgDelete = async (req, res) => {
    const product_id = req.params.productid;
    const productimg_id = req.params.productimgid;

    let data = await Product.product.findById(product_id);
    let imgData = data.productimg.filter((item, index) => {
        if (item._id == productimg_id) {
            return (item)
        }
    });

    if (!imgData) {
        res.status(400).json({ status: 400, 'message': 'Image Data Not Found' });
    }
    else {
        const fileName = imgData[0].productimgfilename;
        const directoryPath = path.join(__dirname, `../public/image/product/${product_id}/`);
        fs.unlink(directoryPath + fileName, (err) => {
            if (err) {
                console.log(err);
                res.status(400).json({ status: 400, 'message': 'Image Not Deleted', });
            }
            else {
                console.log("Image Delete");
                res.status(200).json({ status: 200, 'message': 'Image Delete' });
                data.productimg.pull({ _id: productimg_id });
                data.save();
            }
        });

    }

}

const prodImgEdit = async (req, res) => {
    const product_id = req.params.id;
    let data = await Product.product.findById(product_id);
    if (!data) {
        res.status(400).json({ status: 400, 'message': 'Product Data Not Found' });
    }
    else {
        if (req.files) {
            if (req.files.mainproductimg) {
                const { filename } = req.files.mainproductimg[0];
                const mainproductimg = `public/image/product/${product_id}/${filename}`;
                data.mainproductimg = mainproductimg;
                data.mainproductimgfilename = filename;
            }
            else if (req.files.productimg) {
                for (let i = 0; i < req.files.productimg.length; i++) {
                    data.productimg.push({
                        productimgurl: `public/image/product/${product_id}/${req.files.productimg[i].filename}`,
                        productimgfilename: req.files.productimg[i].filename
                    });
                }
            }
            const result = await data.save();
            res.status(200).json({ status: 200, 'message': 'Image Uploaded', result });

        }
        else {
            res.status(200).json({ status: 200, 'message': 'Data Update Without Upload Any Image' });
        }
    }
}


module.exports = {
    categoryAdd, categoryList, categoryListperId, categoryDelete, categoryEdit,
    productAdd, productPerListData, productList, productDelete, productEdit, productImgAdd,
    prodImgDelete, prodImgEdit, productlistbyCate, productlistbyID
}