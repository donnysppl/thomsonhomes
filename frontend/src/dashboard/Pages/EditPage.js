import { useState,useEffect } from "react";
import ActionHeader from "../compo/ActionHeader";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Common from "../../Common";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function EditPage() {

  const {id} = useParams();
  const { nodeurl } = Common();

  const [addPaageInput, setaddPaageInput] = useState({
    name: '',
    slug: '',
    metatitle: '',
    metadesciption: '',
    metakeyword :'',
  });
  const [pagebodyData, setpagebodyData] = useState();

  useEffect(() => {
    pageData();
  }, [])

  const pageData = async () => {
    await fetch(nodeurl + `pages/list/${id}`,{
        method : 'GET',
    }).then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        setaddPaageInput(res.response);
        setpagebodyData(res.response.bodydata);
      }
      else {
        alert(res.message);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  const inputHandler = (e) => {
    setaddPaageInput({ ...addPaageInput, [e.target.name]: e.target.value });
  }
  const addPageHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: addPaageInput.name,
      slug: addPaageInput.slug,
      bodydata: pagebodyData,
      metatitle: addPaageInput.metatitle,
      metadesciption: addPaageInput.metadesciption,
      metakeyword : addPaageInput.metakeyword,
    }

    await fetch(nodeurl + 'pages/add', {
      method: 'POST',
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
                <ActionHeader actiontext={'Edit Page'} actionlinktext={'Back'} actionlink={'/admin/pages'} />

                <div className="form-part">
                  <form onSubmit={addPageHandler} >
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Page Name</label>
                      <input type="text" className="form-control" id="name" name="name"
                        onChange={inputHandler} value={addPaageInput.name} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="metatitle" className="form-label">Page Meta Title</label>
                      <input type="text" className="form-control" id="metatitle" name="metatitle"
                        onChange={inputHandler} value={addPaageInput.metatitle} />
                      <div id="metatitlehepler" className="form-text">Keep the Page Meta Title up to 50-60 characters long.</div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="metakeyword" className="form-label">Page Meta Keyword</label>
                      <input type="text" className="form-control" id="metakeyword" name="metakeyword"
                        onChange={inputHandler} value={addPaageInput.metakeyword} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="metadesciption" className="form-label">Page Meta Description</label>
                      <input type="text" className="form-control" id="metadesciption" name="metadesciption"
                        onChange={inputHandler}  value={addPaageInput.metadesciption} />
                      <div id="metatitlehepler" className="form-text">Keep the Page Meta Description max out around 150-160 characters (including spaces).</div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="slug" className="form-label">Page Slug</label>
                      <input type="text" className="form-control" id="slug" name="slug"
                        onChange={inputHandler}   value={addPaageInput.slug} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="discription" className="form-label">Discription</label>
                      <CKEditor editor={Editor} data={pagebodyData} id="discription" name="discription"
                        onReady={(editor) => {
                          // console.log('editor is readt', editor);
                        }}
                        onChange={(e, editor) => {
                          const data = editor.getData();
                          setpagebodyData(data);
                          // console.log({ e, editor, data });
                        }}
                        onBlur={(e, editor) => {
                          // console.log('blur', editor);
                        }}
                        onFocus={(e, editor) => {
                          // console.log('Focus', editor);
                        }} />
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

