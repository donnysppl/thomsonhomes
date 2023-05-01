import { useState } from 'react';
import ActionHeader from '../compo/ActionHeader';
import Common from '../../Common';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function AddProdImg() {

    const { nodeurl } = Common();
    const { id } = useParams();

    const [previewImg, setpreviewImg] = useState();

    const [mainproductimg, setmainproductimg] = useState();
    const [productimg, setproductimg] = useState();

    const imageHandleSingle = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        setmainproductimg(file);
    }
    const imageHandleProImg = (e) => {
        console.log(e.target.files);
        const imgarray = []
        const file = e.target.files;
        for (let i = 0; i < file.length; i++) {
            imgarray.push(e.target.files[i])
        }
        setproductimg(imgarray);
    }


    const addImgproHandle = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('mainproductimg', mainproductimg);
        for (let i = 0; i < productimg.length; i++) {
            formdata.append('productimg', productimg[i]);
        }

        const requestOptions = {
            method: 'POST',
            body: formdata,
        };

        await fetch(nodeurl + `product/image/add/${id}`, requestOptions)
            .then(res => res.json())
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
            });


    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="col-lg-10 mx-auto">
                        <div className="action-header-part dashboard-bg-light rounded-3 p-4">

                            <ActionHeader actiontext={'Add Product Image'} actionlinktext={'Back'} actionlink={'/admin/product'} />

                            <div>
                                <form onSubmit={addImgproHandle} encType="multipart/form-data" >
                                    <div className="mb-3 position-relative">
                                        <label htmlFor="link" className="form-label">Main Product Image</label>
                                        <div className="img-input-outer text-center position-relative">
                                            <input type="file" accept="image/*" className="form-control img"
                                                name="mainproductimg" onChange={imageHandleSingle}
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

                                    <div className="mb-3 position-relative">
                                        <label htmlFor="link" className="form-label">Products Image</label>
                                        <div className="img-input-outer text-center position-relative">
                                            <input type="file" accept="image/*" className="form-control img"
                                                name="productimg" onChange={imageHandleProImg} multiple
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

                                    <button type="submit" className="btn btn-light fw-semibold">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
