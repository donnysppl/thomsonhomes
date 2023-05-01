import { useState, useEffect } from "react";
import ActionHeader from "../compo/ActionHeader";
import Common from "../../Common";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function EditSeo() {

  const { nodeurl } = Common();
  const {id} = useParams();

  useEffect(() => {
   const oldSeoPageData = async () => {
    await fetch(nodeurl + `seo/list/${id}`,{
      method:'GET',
    }).then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        setaddSEOPaageInput(res.response);
      }
      else {
        alert(res.message);
      }
    })
    .catch(err => {
      console.log(err);
    });
   }
   oldSeoPageData();
  }, [])
  
  
  const [addSEOPaageInput, setaddSEOPaageInput] = useState({
    name: '',
    slug: '',
    metatitle: '',
    metadesciption: '',
    metakeyword:'',
  });

  const inputHandler = (e) => {
    setaddSEOPaageInput({ ...addSEOPaageInput, [e.target.name]: e.target.value });
  }
  const updateSEOPageHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: addSEOPaageInput.name,
      slug: addSEOPaageInput.slug,
      metatitle: addSEOPaageInput.metatitle,
      metadesciption: addSEOPaageInput.metadesciption,
      metakeyword: addSEOPaageInput.metakeyword,
    }

    await fetch(nodeurl + `seo/edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Data Added SuccessFully',
            showConfirmButton: false,
            timer: 1500
          }).then(function () {
            window.location.reload();
          });
        }
        else {
          alert(res.message);
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
                <ActionHeader actiontext={'Add New Seo Data'} actionlinktext={'Back'} actionlink={'/admin/seo'} />

                <div className="form-part">
                  <form onSubmit={updateSEOPageHandler} >
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Page Name</label>
                      <input type="text" className="form-control" id="name" name="name"
                        onChange={inputHandler}  value={addSEOPaageInput.name}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="slug" className="form-label">Page Slug</label>
                      <input type="text" className="form-control" id="slug" name="slug"
                        onChange={inputHandler} value={addSEOPaageInput.slug}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="metatitle" className="form-label">Page Meta Title</label>
                      <input type="text" className="form-control" id="metatitle" name="metatitle"
                        onChange={inputHandler} value={addSEOPaageInput.metatitle}/>
                      <div id="metatitlehepler" className="form-text">Keep the Page Meta Title up to 50-60 characters long.</div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="metakeyword" className="form-label">Page Meta Keyword</label>
                      <input type="text" className="form-control" id="metakeyword" name="metakeyword"
                        onChange={inputHandler} value={addSEOPaageInput.metakeyword}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="metadesciption" className="form-label">Page Meta Description</label>
                      <input type="text" className="form-control" id="metadesciption" name="metadesciption"
                        onChange={inputHandler} value={addSEOPaageInput.metadesciption}/>
                      <div id="metatitlehepler" className="form-text">Keep the Page Meta Description max out around 150-160 characters (including spaces).</div>
                    </div>
                    <button type="submit" className="btn btn-light fw-semibold">Submit</button>
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

