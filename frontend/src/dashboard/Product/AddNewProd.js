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
        model: '',
        shortdiscrip: '',
        buylink: '',
        metakeyword: '',
        metatitle: '',
        metadiscrip: '',
    });

    const [cateName, setcateName] = useState();
    const [cateSlug, setcateSlug] = useState();
    const [parentcategory, setparentcategory] = useState(null);

    const [discription, setdiscription] = useState();

    const [formValues, setFormValues] = useState([{ index: "", link: "" }])
    const [cateList, setcateList] = useState();

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

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { index: "", link: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const inputHandler = (e) => {
        setaddProduct({ ...addProduct, [e.target.name]: e.target.value });
    }

    const inputCateHandler = async (e) => {
        const name = e.target.value;

        const data = cateList.filter(function (item) {
            return item.name === name
        });
        const dataName = data[0].name.toLowerCase();
        setcateName(dataName);
        setcateSlug(data[0].slug);
        console.log(data[0].parentcate === true,data[0].childcate)
        if(data[0].parentcate === true){
            setparentcategory(data[0].childcate);
        }
    }

    const addProdHandle = async (e) => {
        e.preventDefault();

        const data = {
            'name': addProduct.name,
            'slug': addProduct.slug,
            'category': cateName,
            'categoryslug': cateSlug,
            'model': addProduct.model,
            'shortdiscrip': addProduct.shortdiscrip,
            'buylink': addProduct.buylink,
            'metakeyword': addProduct.metakeyword,
            'metatitle': addProduct.metatitle,
            'metadiscrip': addProduct.metadiscrip,
            'discription': discription,
            'productrpd': formValues,
            'parentcategory' : parentcategory,
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
                        navigate(`/admin/product/add/img/${res.response._id}`)
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
                                            onChange={inputHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="slug" className="form-label">Product Slug</label>
                                        <input type="text" className="form-control" id="slug" name="slug"
                                            onChange={inputHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="metatitle" className="form-label">Product Meta Title</label>
                                        <input type="text" className="form-control" id="metatitle" name="metatitle"
                                            onChange={inputHandler} />
                                        <div id="metatitlehepler" className="form-text">Keep the Page Meta Title up to 50-60 characters long.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="metadiscrip" className="form-label">Product Meta Discription</label>
                                        <input type="text" className="form-control" id="metadiscrip" name="metadiscrip"
                                            onChange={inputHandler} />
                                        <div id="metatitlehepler" className="form-text">Keep the Page Meta Description max out around 150-160 characters (including spaces).</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="metakeyword" className="form-label">Product Meta Keywords</label>
                                        <input type="text" className="form-control" id="metakeyword" name="metakeyword"
                                            onChange={inputHandler} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="link" className="form-label">Select Product Category</label>
                                        <select className="form-select" name='category' id="category" defaultValue={'DEFAULT'} onChange={inputCateHandler}>
                                            <option value="DEFAULT" >Open this select menu</option>
                                            {
                                                cateList && cateList.map((item, index) => {
                                                    return (
                                                        <option key={index} id={item._id} value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="model" className="form-label">Product Model</label>
                                        <input type="text" className="form-control" id="model" name="model"
                                            onChange={inputHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="shortdiscrip" className="form-label">Short Discription</label>
                                        <input type="text" className="form-control" id="shortdiscrip" name="shortdiscrip"
                                            onChange={inputHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="buylink" className="form-label">Buy Link</label>
                                        <input type="text" className="form-control" id="buylink" name="buylink"
                                            onChange={inputHandler} />
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
