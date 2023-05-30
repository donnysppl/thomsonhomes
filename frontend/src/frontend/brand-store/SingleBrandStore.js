import { useEffect, useState } from 'react';
import BannerStoreData from './BrandStore.json';
import { useParams } from 'react-router-dom';
import Common from '../../Common';
import Swal from 'sweetalert2';

export default function SingleBrandStore() {

    const { slug } = useParams();
    const { nodeurl } = Common();

    const [bsData, setbsData] = useState([]);

    useEffect(() => {
        bsDataFetch();
    }, [])

    const bsDataFetch = async () => {
        await fetch(nodeurl + `brand-store/listslug/${slug}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setbsData(res.result[0].brandstoredata);
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.message,
                    }).then((function () {
                        window.location.reload();
                    }))
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    // console.log(bsData)
    return (
        <>
            <section>
                <div className='container-fluid'>
                    <div className="row">

                        {
                            bsData && bsData.map((item, index) => {
                                if (item.sectionsize === 'full') {
                                    return (
                                        <>
                                            <div className="col-12 p-0">
                                                <div key={index} className="img-part">
                                                    <img src={item.imageurl} alt={item.imgurl} className='img-fluid w-100' />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                else if (item.sectionsize === 'twopart') {
                                    return (
                                        <>
                                            <div key={index} className="col-6 p-0">
                                                <div className="img-part">
                                                    <img src={item.imageurl} alt={item.imgurl} className='img-fluid w-100' />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                else if (item.sectionsize === 'threepart') {
                                    return (
                                        <>
                                            <div key={index} className="col-4 p-0">
                                                <div  className="img-part">
                                                    <img src={item.imageurl} alt={item.imgurl} className='img-fluid w-100' />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                else if (item.sectionsize === 'fourpart') {
                                    return (
                                        <>
                                            <div key={index} className="col-3 p-0">
                                                <div  className="img-part">
                                                    <img src={item.imageurl} alt={item.imgurl} className='img-fluid w-100' />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }

                            })
                        }

                    </div>
                </div>
            </section>
        </>
    )
}
