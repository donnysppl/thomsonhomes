import React, { useEffect } from 'react'
import { useState } from 'react';
import Common from "../Common";
import Swal from 'sweetalert2';
import Seotags from './Seotags';

export default function Contact() {
    const { nodeurl } = Common();
    const id = '64460fd621f2cbc8b9b5a0da';

    useEffect(() => {
        const contactFrontData = async () => {
            await fetch(nodeurl + `contact/datafront/${id}`, {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setcontactData(res.response);
                    }
                    else {
                        alert(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        contactFrontData();
    }, [])

    const [contactData, setcontactData] = useState();

    const [conatctInp, setconatctInp] = useState({
        name: '',
        email: '',
        number: '',
        message: '',
    });

    const contactInpHandle = (e) => {
        setconatctInp({ ...conatctInp, [e.target.name]: e.target.value });
    }
    const frontContactHandle = async (e) => {
        e.preventDefault();
        console.log(conatctInp);
        await fetch(nodeurl + 'contact/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(conatctInp),
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 2000
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
            <Seotags
                title={contactData && contactData.metatitle}
                description={contactData && contactData.metadiscrip} keywoard={contactData && contactData.metakeyword} />

            <section className='gray-light ptb-4'>
                <div className="container media-col-div">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="contact-support-text"
                                dangerouslySetInnerHTML={{ __html: contactData && contactData.pagecontent }}></div>

                        </div>
                        <div className="col-lg-6 col-md-6">
                            <form onSubmit={frontContactHandle} className='contact-form'>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name='name' onChange={contactInpHandle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name='email' onChange={contactInpHandle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="number" className="form-label">Number</label>
                                    <input type="number" className="form-control" id="number" name="number" onChange={contactInpHandle} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id='message' name='message' rows={'5'} onChange={contactInpHandle} ></textarea>
                                </div>

                                <button type="submit" className="frontweb-button text-white">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
