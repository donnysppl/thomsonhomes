import { useState, useEffect } from 'react'
import Common from '../../Common';
import Loader from '../../Loader';
import { Link } from 'react-router-dom';

export default function Category() {

    const { nodeurl } = Common();

    const [cateData, setcateData] = useState();
    const [loader, setloader] = useState(true);

    useEffect(() => {

        const categoryallData = async () => {
            await fetch(nodeurl + 'product/category/list', {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setcateData(res.response);
                        setloader(false);
                    }
                    else {
                        alert(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        };
        categoryallData();
    }, [])


    return (
        <>
            <section className="bg-dark text-col-dark ptb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="section-main-headimg pb-5">
                                Category
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="container position-relative">
                    <div className="row">
                        {
                            loader ? <Loader/> : 
                            cateData && cateData.map((item, index) => {
                                return (
                                    <div key={index} className="col-lg-3 col-md-4 col-6 mb-5 category-card-col">
                                        <Link to={`/category/${item.slug}`}>
                                        <div className="category-card bg-dark text-col-dark position-relative">
                                            <svg className="category-top-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="#D0021B" d="M47.3,-24.4C50.4,-5.7,34.7,10.2,14.8,25.9C-5,41.6,-28.9,57.1,-42.8,49.3C-56.6,41.5,-60.4,10.3,-51.6,-16.2C-42.8,-42.7,-21.4,-64.5,0.3,-64.6C22.1,-64.7,44.1,-43.1,47.3,-24.4Z" transform="translate(100 100)" />
                                            </svg>
                                            <div className="category-card-img-part">
                                                <img src={nodeurl + item.cateimg} alt={item.name} className="img-fluid w-100" />
                                            </div>
                                            <div className="category-card-text-part">
                                                <h4>{item.name}</h4>
                                            </div>
                                            <svg className="category-bottom-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="#D0021B" d="M47.3,-24.4C50.4,-5.7,34.7,10.2,14.8,25.9C-5,41.6,-28.9,57.1,-42.8,49.3C-56.6,41.5,-60.4,10.3,-51.6,-16.2C-42.8,-42.7,-21.4,-64.5,0.3,-64.6C22.1,-64.7,44.1,-43.1,47.3,-24.4Z" transform="translate(100 100)" />
                                            </svg>
                                        </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section>
        </>
    )
}
