import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Common from '../../Common';
import ActionHeader from '../compo/ActionHeader'

export default function EditBanner() {

  const { nodeurl } = Common();

  const { id } = useParams();

  const [previewImg, setpreviewImg] = useState([]);
  const [bannerimg, setbannerimg] = useState();
  const [bannermobImg, setbannermobImg] = useState();
  const [previewmobImg, setpreviewmobImg] = useState();

  const [inpVal, setinpVal] = useState({
    link: '',
    name: '',
    order: '',
    bannerImg: '',
    bannerMobImg: '',
  });



  useEffect(() => {

    const oldCateData = async () => {
      await fetch(nodeurl + `banner/list/${id}`, {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          console.log(res.response);
          if (res.status === 200) {
            setinpVal(res.response);
            setpreviewImg(nodeurl + res.response.bannerImg);
            setpreviewmobImg(nodeurl + res.response.bannerMobImg);
          }
          else {
            alert(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    oldCateData();
  }, [])

  const imageHandle = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setpreviewImg(window.URL.createObjectURL(file));
    setbannerimg(file)

  }
  const imagemobHandle = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setpreviewmobImg(window.URL.createObjectURL(file));
    setbannermobImg(file);
  }

  const inputHandle = (e) => {
    setinpVal({ ...inpVal, [e.target.name]: e.target.value });
  }

  const editbannerHandle = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('link', inpVal.link);
    formdata.append('name', inpVal.name);
    formdata.append('order', inpVal.order);
    formdata.append('bannerImg', bannerimg);
    formdata.append('bannerMobImg', bannermobImg);

    await fetch(nodeurl + `banner/edit/${id}`, {
      method: 'PUT',
      body: formdata,
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire(
            'Saved',
            res.message,
            'success'
          ).then(function () {
            window.location.reload();
          }
          );

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
                <ActionHeader actiontext={'Edit Banner'} actionlinktext={'Back'} actionlink={'/admin/banner'} />
                <div className="form-part">

                  <form onSubmit={editbannerHandle} encType="multipart/form-data" >
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" name='name' onChange={inputHandle} value={inpVal.name} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="order" className="form-label">Order</label>
                      <input type="number" className="form-control" id="order" name='order' onChange={inputHandle} value={inpVal.order} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="link" className="form-label">Banner Page Link</label>
                      <input type="text" className="form-control" id="link" name='link' onChange={inputHandle} value={inpVal.link} />
                    </div>
                    <div className="mb-3 position-relative">
                      <label htmlFor="link" className="form-label">Banner Image</label>
                      <div className="img-input-outer text-center position-relative">
                        <input type="file" accept="image/*" className="form-control img"
                          name="bannerImg" onChange={imageHandle}
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
                      <label htmlFor="link" className="form-label">Banner Mob Image</label>
                      <div className="img-input-outer text-center position-relative">
                        <input type="file" accept="image/*" className="form-control img"
                          name="bannerMobImg" onChange={imagemobHandle}
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
                            previewmobImg ?
                              <li className="mt-2 w-25"><img src={previewmobImg} className="img-fluid" /></li>
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
