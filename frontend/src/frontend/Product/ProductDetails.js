import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Common from "../../Common";
import Loader from "../../Loader";

import { useScroll, useTransform, motion } from 'framer-motion';

export default function ProductDetails() {
    const { id } = useParams();
    const { nodeurl } = Common();

    const [thumbsSwiper, setThumbsSwiper] = useState();
    const [loader, setloader] = useState(true);
    const [prodResData, setprodResData] = useState();
    const [prodMainImg, setprodMainImg] = useState();
    const [productimg, setproductimg] = useState([]);
    const [productrpd, setproductrpd] = useState([]);
    const [specification, setspecification] = useState();

    const { scrollYProgress } = useScroll();
    const xstyle = useTransform(scrollYProgress, [0, 1], [0, -600]);

    useEffect(() => {
        const productDetailData = async () => {
            await fetch(nodeurl + `product/listdata/${id}`, {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setprodResData(res.response);
                        setprodMainImg(res.response.mainproductimg);
                        setproductimg(res.response.productimg);
                        setproductrpd(res.response.productrpd);
                        setspecification(res.response.discription);
                        setloader(false);
                    }
                    else {
                        alert(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        productDetailData();

    }, [id, nodeurl])

    const pillsTab = window.$('#pills-tab').offset();
    const pillsTabTop = pillsTab && pillsTab.top;

    window.addEventListener('scroll', navdivSticky);

    function navdivSticky() {
        if (window.$(window).scrollTop() > pillsTabTop) {
            window.$('#pills-tab').addClass('product-tab-sticky');
        }
        else {
            window.$('#pills-tab').removeClass('product-tab-sticky');
        }
    }

    return (
        <>
            <section className={`single single-product position-relative overflow-hidden ${loader ? "h90vh" : null}`}>
                {
                    loader ? <Loader /> : null
                }

                <div className="container position-relative" >

                    <div className="row pt-4">
                        <div className="col-12">
                            <div className="breadcrum">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to={'/'}>Home</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to={'/product'}>Product</Link>
                                        </li>
                                        <li className="breadcrumb-item active fw-semibold" aria-current="page">
                                            {prodResData && prodResData.name}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="row gap-4">
                        <div className="col-lg-5 col-md-5 col-12">

                            <div className="product-slider-part">
                                <Swiper
                                    style={{
                                        "--swiper-navigation-color": "#fff",
                                        "--swiper-pagination-color": "#fff",
                                    }}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                                    className="mySwiper2"
                                >
                                    <SwiperSlide>
                                        <img src={prodMainImg} className="img-fluid" alt={prodResData && prodResData.name} />
                                    </SwiperSlide>
                                    {
                                        productimg && productimg.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <img src={item.link} className="img-fluid" alt={prodResData && prodResData.name} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }

                                </Swiper>
                            
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper subslider"
                                >
                                    <SwiperSlide>
                                        <img src={prodMainImg} className="img-fluid" alt={prodResData && prodResData.name} />
                                    </SwiperSlide>
                                    {
                                        productimg && productimg.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <img src={item.link} className="img-fluid" alt={prodResData && prodResData.name} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>

                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="prod-main-contant pt-4">
                                <h6 className="product-category">{prodResData && prodResData.category}</h6>
                                <h1 className="product-name">{prodResData && prodResData.name}</h1>
                                <h5 className="product-model">Model : {prodResData && prodResData.model}</h5>
                                <p className="product-short-disp">{prodResData && prodResData.shortdiscrip}</p>

                                <div className="d-flex gap-3 product-btn-part ">
                                    <button className="frontweb-button">
                                        <a className="text-white" href={prodResData && prodResData.buylink}>Buy Now</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <motion.div className="product-cate-highlight" style={{ x: xstyle }}>Thomson {prodResData && prodResData.category}</motion.div>

                <hr />
                <div className="container-fluid transall5 bg-dark position-relative" id="pills-tab-parent">


                    <div className="row">
                        <div className="col-12">
                            <div className="single-prod-tab-part">
                                <ul className={`nav nav-pills mb-3 gap-3 single-prod-tab justify-content-center`} id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                            Discription
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                            Specification
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                        <div className="prod-rpd-img-parent">
                                            <ul>
                                                {
                                                    productrpd && productrpd.map((item, index) => {
                                                        return (
                                                            <li key={item.index} id={item.index}>
                                                                <img src={item.link} alt="" className="img-fluid w-100" />
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                                        <div className="prod-specification-part text-col-dark">
                                            {
                                                specification && <div className="prod-specification" dangerouslySetInnerHTML={{ __html: specification }} />
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
