import ActionHeader from '../compo/ActionHeader'
import { useState, useEffect } from 'react';
import Common from '../../Common';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export default function EditMedia() {

    const {id} = useParams();
    const { nodeurl } = Common();

    const [addMediaInp, setaddMediaInp] = useState({
        title: '',
        discription: '',
        link: '',
        date: '',
        owner: '',
    });

    useEffect(() => {
        const mediaoldData = async () => {
            await fetch(nodeurl + `media/list/${id}`,{
                method : 'GET',
            }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setaddMediaInp(res.response);
                }
                else {
                    alert(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });

        }
        mediaoldData();

    }, [])
    

    const inputHandler = (e) => {
        setaddMediaInp({ ...addMediaInp, [e.target.name]: e.target.value });
    }
    const addMediaHandler = async (e) => {
        e.preventDefault();
        console.log(addMediaInp);

        await fetch(nodeurl + `media/edit/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addMediaInp),
        }).then(res => res.json())
            .then(res => {
                console.log(res.response);
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Data Added SuccessFully',
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
                                <ActionHeader actiontext={'Edit Media'} actionlinktext={'Back'} actionlink={'/admin/media'} />

                                <div className="form-part">
                                    <form onSubmit={addMediaHandler} >

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Media Title</label>
                                            <input type="text" className="form-control" name="title"
                                                onChange={inputHandler} value={addMediaInp.title} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="discription" className="form-label">Media Discription</label>
                                            <textarea className="form-control" name="discription"  value={addMediaInp.discription}
                                                onChange={inputHandler} rows="5"></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="link" className="form-label">Media Link</label>
                                            <input type="text" className="form-control" name="link" value={addMediaInp.link}
                                                onChange={inputHandler} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="date" className="form-label">Media Date</label>
                                            <input type="text" className="form-control" name="date" value={addMediaInp.date}
                                                onChange={inputHandler} placeholder='dd-mm-yyyy' />
                                            <div id="metatitlehepler" className="form-text">Date should be like this.(dd-mm-yyyy/20-04-2023)</div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="owner" className="form-label">Media Owner</label>
                                            <input type="text" className="form-control" name="owner" value={addMediaInp.owner}
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
