import { useState, useEffect } from "react";
import ActionHeader from "../compo/ActionHeader";
import Common from "../../Common";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function EditBs() {

  const { nodeurl } = Common();
  const { id } = useParams();

  const [formInputBS, setformInputBS] = useState({
    name: '',
    slug: '',
  });

  const [formValues, setFormValues] = useState([{ imageurl: "", imagelink: "", sectionsize: "" }])


  useEffect(() => {

    const oldBsData = async () => {
      await fetch(nodeurl + `brand-store/list/${id}`, {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setformInputBS(res.result);
            setFormValues(res.result.brandstoredata);
          }
          else {
            alert(res.message);
          }

        })
        .catch(err => {
          console.log(err);
        })
    }

    oldBsData();


  }, [])

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { imageurl: "", imagelink: "", sectionsize: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  const inputHandler = (e) => {
    setformInputBS({ ...formInputBS, [e.target.name]: e.target.value });
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formInputBS.name,
      slug: formInputBS.slug,
      brandstoredata: formValues,
    }

    await fetch(nodeurl + `brand-store/edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Data Added SuccessFully',
            showConfirmButton: false,
            timer: 1500
          }).then(function () {
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
      <section className="add-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="action-header-part dashboard-bg-light rounded-3 p-4">
                <ActionHeader actiontext={'Add Brand Store'} actionlinktext={'Back'} actionlink={'/admin/brand-store'} />

                <div className="form-part ps-2">

                  <form onSubmit={handleSubmit} className=" p-3 mb-4">


                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Brand Store Name</label>
                      <input required type="text" className="form-control" id="name" name="name"
                        onChange={inputHandler} value={formInputBS.name} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="slug" className="form-label">Brand Store Slug</label>
                      <input required type="text" className="form-control" id="slug" name="slug"
                        onChange={inputHandler}  value={formInputBS.slug}/>
                    </div>

                    <div className="border rounded-3 p-4 mb-4">
                      {
                        formValues && formValues.map((item, index) => {
                          return (
                            <div className="form-input position-relative" key={index}>
                              <span className="input-count">{index + 1}</span>
                              <div className="form-inline d-flex gap-4 align-items-end">
                                <div className="flex-fill">
                                  <label className="form-label">Image URL</label>
                                  <input required className="form-control formimage" type="text" name="imageurl" onChange={e => handleChange(index, e)} value={formValues[index].imageurl} />
                                </div>
                                <div className="flex-fill">
                                  <label className="form-label">Image Link</label>
                                  <input required className="form-control formimagelink" type="text" name="imagelink" onChange={e => handleChange(index, e)} value={formValues[index].imagelink} />
                                </div>
                                <div className="flex-fill">
                                  <label className="form-label">Section Size</label>
                                  <select required className="form-select" name="sectionsize" value={formValues[index].sectionsize}  defaultValue={''} onChange={e => handleChange(index, e)} >
                                    <option value="">Open this select Size</option>
                                    <option value="full">Full</option>
                                    <option value="twopart">Two Parts (1/2)</option>
                                    <option value="threepart">Three Parts (1/3)</option>
                                    <option value="fourpart">Four Parts (1/4)</option>
                                  </select>
                                </div>
                                {
                                  index ?
                                    <div>
                                      <button type="button" className="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
                                    </div>
                                    : null
                                }
                              </div>
                              <hr className="mt-3" />
                            </div>
                          )
                        })
                      }
                      <div className="button-section btn-count-part d-flex gap-3 mb-3">
                        <div onClick={(e) => addFormFields(e)} className="btn btn-primary">Add</div>
                      </div>

                    </div>
                    <button className="btn btn-light submit" type="submit">Submit</button>
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

