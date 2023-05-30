import { useState, useEffect } from 'react'
import ActionHeader from '../compo/ActionHeader';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Common from '../../Common';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function AddNewProd() {

    const { nodeurl } = Common();
    const navigate = useNavigate();

    const [addProduct, setaddProduct] = useState({
        name: '',
        slug: '',
        metatitle: '',
        metadiscrip: '',
        metakeyword: '',
        category: '',
        parentcategory: '',
        model: '',
        shortdiscrip: '',
        buylink: '',
        discription: '',
        productimg: '',
        mainproductimg: '',
    });

    const [cateName, setcateName] = useState();
    const [cateSlug, setcateSlug] = useState();
    const [parentcategory, setparentcategory] = useState(null);

    const [discription, setdiscription] = useState();

    const [formValues, setFormValues] = useState([{ index: "", link: "" }]);
    const [fvproductimg, setfvproductimg] = useState([{ index: "", link: "" }])
    const [cateList, setcateList] = useState();

    const [selectpCat, setselectpCat] = useState();

    useEffect(() => {

        const allCategoryList = async () => {
            await fetch(nodeurl + 'product/category/list', {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setcateList(res.response);
                    }
                    else {
                        alert(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        allCategoryList();

    }, [])

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    const hcprodImg = (i, e) => {
        let newFormValues = [...fvproductimg];
        newFormValues[i][e.target.name] = e.target.value;
        setfvproductimg(newFormValues);
    }

    const addFormFields = () => {
        setFormValues([...formValues, { index: "", link: "" }])
    }

    const addprodImg = () => {
        setfvproductimg([...fvproductimg, { index: "", link: "" }])
    }

    const removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const removeprodImg = (i) => {
        let newFormValues = [...fvproductimg];
        newFormValues.splice(i, 1);
        setfvproductimg(newFormValues)
    }

    const inputHandler = (e) => {
        setaddProduct({ ...addProduct, [e.target.name]: e.target.value });
    }

    const inputCateHandler = (e) => {

        const value = e.target.value;


        const data = cateList.filter(function (item) {
            return item.name && item.childcate === value;
        });


    }

    const addProdHandle = async (e) => {
        e.preventDefault();

        const data = {
            'name': addProduct.name,
            'slug': addProduct.slug,
            'category': addProduct.category,
            'parentcategory': addProduct.parentcategory,
            'model': addProduct.model,
            'shortdiscrip': addProduct.shortdiscrip,
            'buylink': addProduct.buylink,
            'metakeyword': addProduct.metakeyword,
            'metatitle': addProduct.metatitle,
            'metadiscrip': addProduct.metadiscrip,
            'discription': discription,
            'productrpd': formValues,
            'productimg': fvproductimg,
            'mainproductimg': addProduct.mainproductimg,
        }
        console.log(data)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        await fetch(nodeurl + 'product/add', requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    Swal.fire(
                        'Saved',
                        `${res.message}`,
                        'success'
                    ).then(function () {
                        window.location.reload();
                    });

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.message,
                    })
                }

            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <>
            <section>
                <div className="container">
                    <div className="col-lg-10 mx-auto">
                        <div className="action-header-part dashboard-bg-light rounded-3 p-4">

                            <ActionHeader actiontext={'Add New Product'} actionlinktext={'Back'} actionlink={'/admin/product'} />

                            <div>
                                <form onSubmit={addProdHandle} >
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Product Name</label>
                                        <input type="text" className="form-control" id="name" name="name"
                                            onChange={inputHandler} value={addProduct.name || ''} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="slug" className="form-label">Product Slug</label>
                                        <input type="text" className="form-control" id="slug" name="slug"
                                            onChange={inputHandler} value={addProduct.slug || ''} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="metatitle" className="form-label">Product Meta Title</label>
                                        <input type="text" className="form-control" id="metatitle" name="metatitle"
                                            onChange={inputHandler} value={addProduct.metatitle || ''} />
                                        <div id="metatitlehepler" className="form-text">Keep the Page Meta Title up to 50-60 characters long.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="metadiscrip" className="form-label">Product Meta Discription</label>
                                        <input type="text" className="form-control" id="metadiscrip" name="metadiscrip"
                                            onChange={inputHandler} value={addProduct.metadiscrip || ''} />
                                        <div id="metatitlehepler" className="form-text">Keep the Page Meta Description max out around 150-160 characters (including spaces).</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="metakeyword" className="form-label">Product Meta Keywords</label>
                                        <input type="text" className="form-control" id="metakeyword" name="metakeyword"
                                            onChange={inputHandler} value={addProduct.metakeyword || ''} />
                                    </div>

                                    <div className="mb-3 d-flex gap-3">

                                        <div>
                                            <label htmlFor="parentcategory" className="form-label">Select Product Category</label>
                                            <select className="form-select" name='parentcategory' id="parentcategory" defaultValue={'DEFAULT'} value={addProduct.parentcategory || ''}
                                                onChange={(e) => {
                                                    inputHandler(e);
                                                    setselectpCat(e.target.value);
                                                }}>
                                                <option value="DEFAULT" >Open this select menu</option>
                                                {
                                                    cateList && cateList.map((item, index) => {
                                                        if (item.parentcate === false) {
                                                            return <option key={index} id={item._id} value={item.value}>{item.name}</option>
                                                        }

                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            {
                                                selectpCat ?
                                                    <>
                                                        <label htmlFor="category" className="form-label">Select Child Category</label>
                                                        <select className="form-select" name='category' id="category" defaultValue={'DEFAULT'} onChange={(e) => inputHandler(e)} value={addProduct.category || ''}  >
                                                            <option value="DEFAULT" >Open this select menu</option>
                                                            {
                                                                cateList && cateList.map((item, index) => {
                                                                    if (item.name && item.childcate === selectpCat) {
                                                                        return <option key={index} id={item._id} value={item.value}>{item.name}</option>
                                                                    }

                                                                })
                                                            }
                                                        </select>
                                                    </>
                                                    : null

                                            }
                                        </div>

                                    </div>
                                    <div className="mb-3">


                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="model" className="form-label">Product Model</label>
                                        <input type="text" className="form-control" id="model" name="model"
                                            onChange={inputHandler} value={addProduct.model || ''} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="shortdiscrip" className="form-label">Short Discription</label>
                                        <input type="text" className="form-control" id="shortdiscrip" name="shortdiscrip"
                                            onChange={inputHandler} value={addProduct.shortdiscrip || ''} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="buylink" className="form-label">Buy Link</label>
                                        <input type="text" className="form-control" id="buylink" name="buylink"
                                            onChange={inputHandler} value={addProduct.buylink || ''} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="discription" className="form-label">Discription</label>
                                        <CKEditor editor={Editor} data="<p>Hello</p>" id="discription" name="discription"
                                            onReady={(editor) => {
                                                // console.log('editor is readt', editor);
                                            }}
                                            onChange={(e, editor) => {
                                                const data = editor.getData();
                                                setdiscription(data);
                                                // console.log({ e, editor, data });
                                            }}
                                            onBlur={(e, editor) => {
                                                // console.log('blur', editor);
                                            }}
                                            onFocus={(e, editor) => {
                                                // console.log('Focus', editor);
                                            }} />
                                    </div>

                                    <hr className='mt-4' />

                                    <div className="mb-3">
                                        <label htmlFor="mainproductimg" className="form-label">Product Main Image</label>
                                        <input type="text" className="form-control" id="mainproductimg" name="mainproductimg"
                                            onChange={inputHandler} value={addProduct.mainproductimg || ''} />
                                    </div>

                                    <div>
                                        <label htmlFor="link" className="form-label">Product Image</label>
                                        <div className='border rounded-3 p-3 mb-4'>


                                            {fvproductimg.map((element, index) => (
                                                <div className="form-inline" key={index}>
                                                    <div className="row mb-3">

                                                        <div className="col-2">
                                                            <label className='form-label'>Order / Index</label>
                                                            <input className="form-control" placeholder='Order' type="number" name="index" value={element.index || ""} onChange={e => hcprodImg(index, e)} />

                                                        </div>
                                                        <div className="col-7">
                                                            <label className='form-label'>Product Image Link</label>
                                                            <input className="form-control" type="text" placeholder='Image Link' name="link" value={element.link || ""} onChange={e => hcprodImg(index, e)} />

                                                        </div>
                                                        {
                                                            index ?
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <button type="button" className="btn btn-danger remove mt-3" onClick={() => removeprodImg(index)}>Remove</button>
                                                                </div>
                                                                : null
                                                        }
                                                    </div>

                                                </div>
                                            ))}
                                            <div className="button-section">
                                                {
                                                    fvproductimg.length !== 15 ?
                                                        <button className="btn btn-light fw-semibold" type="button" onClick={() => addprodImg()}>Add</button>
                                                        : null
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="link" className="form-label">Product RPD Image</label>
                                        <div className='border rounded-3 p-3 mb-4'>


                                            {formValues.map((element, index) => (
                                                <div className="form-inline" key={index}>
                                                    <div className="row mb-3">

                                                        <div className="col-2">
                                                            <label className='form-label'>Order / Index</label>
                                                            <input className="form-control" placeholder='Order' type="number" name="index" value={element.index || ""} onChange={e => handleChange(index, e)} />

                                                        </div>
                                                        <div className="col-7">
                                                            <label className='form-label'>Product RPD Image Link</label>
                                                            <input className="form-control" type="text" placeholder='Image Link' name="link" value={element.link || ""} onChange={e => handleChange(index, e)} />

                                                        </div>
                                                        {
                                                            index ?
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <button type="button" className="btn btn-danger remove mt-3" onClick={() => removeFormFields(index)}>Remove</button>
                                                                </div>
                                                                : null
                                                        }
                                                    </div>

                                                </div>
                                            ))}
                                            <div className="button-section">
                                                {
                                                    formValues.length !== 15 ?
                                                        <button className="btn btn-light fw-semibold" type="button" onClick={() => addFormFields()}>Add</button>
                                                        : null
                                                }

                                            </div>
                                        </div>
                                    </div>


                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
