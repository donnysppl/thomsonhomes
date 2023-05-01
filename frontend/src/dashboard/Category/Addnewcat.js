import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import Common from '../../Common';
import ActionHeader from '../compo/ActionHeader'

export default function Addnewcat() {

    const { nodeurl } = Common();

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


    const [previewImg, setpreviewImg] = useState([]);
    const [catagimg, setcatagimg] = useState();

    const [checkboxVal, setcheckboxVal] = useState(false);

    const [cateList, setcateList] = useState();

    const [inpVal, setinpVal] = useState({
        link: '',
        name: '',
        order: '',
        slug: '',
        parentcate: '',
        childcate: '',
        metatitle: '',
        metadescription: '',
        metakeywords: '',
    });

    const imageHandle = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        setpreviewImg(window.URL.createObjectURL(file));
        setcatagimg(file)

    }

    const checkboxHandle = (e) => {
        const checkbox = document.getElementById('parentcate').checked;
        if (checkbox) {
            setcheckboxVal(true);
        }
        else {
            setcheckboxVal(false);
        }
    }

    const inputHandle = (e) => {
        setinpVal({ ...inpVal, [e.target.name]: e.target.value });
    }

    const addCategoryHandle = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('link', inpVal.link);
        formdata.append('name', inpVal.name);
        formdata.append('order', inpVal.order);
        formdata.append('slug', inpVal.slug);
        formdata.append('parentcate', checkboxVal);
        formdata.append('childcate', inpVal.childcate);
        formdata.append('cateimg', catagimg);
        formdata.append('metatitle', inpVal.metatitle);
        formdata.append('metadescription', inpVal.metadescription);
        formdata.append('metakeywords', inpVal.metakeywords);

        for (var pair of formdata.entries()) {
            console.log(pair[1]);
        }

        await fetch(nodeurl + 'product/category/add', {
            method: 'POST',
            body: formdata,
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    Swal.fire(
                        'Saved',
                        res.message,
                        'success'
                    )
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
            })
    }
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="action-header-part dashboard-bg-light rounded-3 p-4">
                                <ActionHeader actiontext={'Add New Category'} actionlinktext={'Back'} actionlink={'/admin/category'} />
                                <div className="form-part">

                                    <form onSubmit={addCategoryHandle} encType="multipart/form-data" >
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="name" name='name' onChange={inputHandle} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="slug" className="form-label">Slug</label>
                                            <input type="text" className="form-control" id="slug" name='slug' onChange={inputHandle} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="metatitle" className="form-label">meta title</label>
                                            <input type="text" className="form-control" id="metatitle" name='metatitle' onChange={inputHandle} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="metadescription" className="form-label">meta description</label>
                                            <input type="text" className="form-control" id="metadescription" name='metadescription' onChange={inputHandle} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="metakeywords" className="form-label">meta keywords</label>
                                            <input type="text" className="form-control" id="metakeywords" name='metakeywords' onChange={inputHandle} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="order" className="form-label">Order</label>
                                            <input type="number" className="form-control" id="order" name='order' onChange={inputHandle} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="link" className="form-label">Category Page Link</label>
                                            <input type="text" className="form-control" id="link" name='link' onChange={inputHandle} />
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name='parentcate' id="parentcate"
                                                    onChange={checkboxHandle} />
                                                <label className="form-check-label" htmlFor="parentcate">
                                                    Parent Category
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            checkboxVal ?
                                                <div className="mb-3">
                                                    <label htmlFor="link" className="form-label">Select Parent Category</label>
                                                    <select className="form-select" name='childcate' defaultValue={'DEFAULT'} onChange={inputHandle}>
                                                        <option value="DEFAULT" >Open this select menu</option>
                                                        {
                                                            cateList && cateList.map((item, index) => {
                                                                return (
                                                                    <option key={index} id={item._id} value={item.name}>{item.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div> : null
                                        }


                                        <div className="mb-3 position-relative">
                                            <label htmlFor="link" className="form-label">Image</label>
                                            <div className="img-input-outer text-center position-relative">
                                                <input type="file" accept="image/*" className="form-control img"
                                                    name="cateimg" onChange={imageHandle}
                                                />
                                                <div className="img-input-inner text-center">
                                                    <div className="img-input-inner-text">
                                                        <svg className="mx-auto" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <div className="text-center">
                                                            <div>
                                                                Upload a fileNo file chosen or drag and drop
                                                            </div>
                                                            <div>
                                                                PNG, JPG, GIF, WEBP (Prefer to use WEBP format)
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="img-preview">
                                                <ul className='ps-0 d-flex'>
                                                    {
                                                        previewImg ?
                                                            <li className="mt-2 w-25"><img src={previewImg} className="img-fluid" /></li>
                                                            : null
                                                    }
                                                </ul>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-light ">Submit</button>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
