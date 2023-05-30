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
        cateimg: '',
    });

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

        const data = {
            link: inpVal.link,
            name: inpVal.name,
            order: inpVal.order,
            slug: inpVal.slug,
            parentcate: checkboxVal,
            childcate: inpVal.childcate,
            cateimg: inpVal.catagimg,
            metatitle: inpVal.metatitle,
            metadescription: inpVal.metadescription,
            metakeywords: inpVal.metakeywords,
        }

        await fetch(nodeurl + 'product/category/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    Swal.fire(
                        'Saved',
                        res.message,
                        'success'
                    ).then(function(){
                        window.location.reload();
                    })
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
                                            <label htmlFor="cateimg" className="form-label">Category Image link</label>
                                            <input type="text" className="form-control" id="cateimg" name='cateimg' onChange={inputHandle} />
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
