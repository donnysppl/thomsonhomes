import { useState, useEffect } from 'react';
import ActionHeader from '../compo/ActionHeader'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Common from '../../Common';
import Swal from 'sweetalert2';

export default function ContactFront() {


    const { nodeurl } = Common();
    const id = '64460fd621f2cbc8b9b5a0da';

    useEffect(()=>{
        contFrontData();
    },[])

   

    const contFrontData = async () => {
        await fetch(nodeurl + `contact/datafront/${id}`, {
            method: 'GET',
        }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setcontactFrontInp(res.response);
            setpagecontent(res.response.pagecontent);
          }
          else {
            alert(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    const [contactFrontInp, setcontactFrontInp] = useState({
        metatitle: '',
        metadiscrip: '',
        metakeyword: '',
    });
    const [pagecontent, setpagecontent] = useState();
    const inputHandler = (e) => {
        setcontactFrontInp({ ...contactFrontInp, [e.target.name]: e.target.value });
    }

    const addPageHandler = async (e) => {
        e.preventDefault();
        const data = {
            metatitle: contactFrontInp.metatitle,
            metadiscrip: contactFrontInp.metadiscrip,
            metakeyword: contactFrontInp.metakeyword,
            pagecontent: pagecontent,
        }
        console.log(data)
        await fetch(nodeurl + `contact/editfront/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 3000
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
            <section>
                <div className="container">
                    <div className="col-12">
                        <div className="action-header-part dashboard-bg-light rounded-3 p-4">

                            <ActionHeader actiontext={'Contact Front Edit'} actionlinktext={'Back'} actionlink={'/admin/contact'} />

                            <div>

                                <div className="form-part">
                                    <form onSubmit={addPageHandler} >
                                        <div className="mb-3">
                                            <label htmlFor="metatitle" className="form-label">Conatct Page metatitle</label>
                                            <input type="text" className="form-control" name="metatitle"
                                                onChange={inputHandler}  value={contactFrontInp.metatitle}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="metadiscrip" className="form-label">Conatct Page metadiscrip</label>
                                            <input type="text" className="form-control" name="metadiscrip"
                                                onChange={inputHandler}  value={contactFrontInp.metadiscrip}/>

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="metakeyword" className="form-label">Conatct Page metakeyword</label>
                                            <input type="text" className="form-control" name="metakeyword"
                                                onChange={inputHandler}  value={contactFrontInp.metakeyword}/>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="pagecontent" className="form-label">Conatct Page Content</label>
                                            <CKEditor editor={Editor} data={pagecontent} id="pagecontent" name="pagecontent"
                                                onReady={(editor) => {
                                                    // console.log('editor is readt', editor);
                                                }}
                                                onChange={(e, editor) => {
                                                    const data = editor.getData();
                                                    setpagecontent(data);
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
