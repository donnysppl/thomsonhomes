import ActionHeader from '../compo/ActionHeader'
import { useState, useEffect } from 'react';
import Common from '../../Common';
import Swal from 'sweetalert2';

export default function AddMedia() {

    const { nodeurl } = Common();

    const [addMediaInp, setaddMediaInp] = useState({
        title: '',
        discription: '',
        link: '',
        date: '',
        owner: '',
    })

    const inputHandler = (e) => {
        setaddMediaInp({ ...addMediaInp, [e.target.name]: e.target.value });
    }
    const addMediaHandler = async (e) => {
        e.preventDefault();
        console.log(addMediaInp);

        await fetch(`${nodeurl}media/add`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addMediaInp),
        }).then(res => res.json())
            .then(res => {
                console.log(res.response);
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: `${nodeurl}/media/add`,
                        showConfirmButton: false,
                        timer: 1000
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
                                <ActionHeader actiontext={'Add New Page'} actionlinktext={'Back'} actionlink={'/admin/pages'} />

                                <div className="form-part">
                                    <form onSubmit={addMediaHandler} >

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Media Title</label>
                                            <input type="text" className="form-control" name="title"
                                                onChange={inputHandler} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Media Discription</label>
                                            <textarea className="form-control" name="discription"
                                                onChange={inputHandler} rows="5"></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Media Link</label>
                                            <input type="text" className="form-control" name="link"
                                                onChange={inputHandler} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label ">Media Date</label>
                                            <input type="text" className="form-control datepick" name="date"
                                                onChange={inputHandler} placeholder='dd-mm-yyyy' />
                                            <div id="metatitlehepler" className="form-text">Date should be like this.(dd-mm-yyyy/20-04-2023)</div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Media Owner</label>
                                            <input type="text" className="form-control" name="owner"
                                                onChange={inputHandler} />
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
