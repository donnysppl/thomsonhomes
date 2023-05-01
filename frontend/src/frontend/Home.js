import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Common from "../Common";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import Video from '../assets/img/thomson.mp4';
import gridImg1 from '../assets/img/gridimg-1.jpg';
import gridImg2 from '../assets/img/gridimg-2.jpg';
import gridImg3 from '../assets/img/gridimg-3.jpg';
import gridImg4 from '../assets/img/gridimg-4.mp4';
import ProductCard from "./Product/ProductCard";
import Seotags from "./Seotags";

const testimonialsData = [
    {
        name: 'testimonials 1',
        imgurl: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/testimonials/thomson-testimonials-1.webp',
    },
    {
        name: 'testimonials 2',
        imgurl: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/testimonials/thomson-testimonials-2.webp',
    },
    {
        name: 'testimonials 3',
        imgurl: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/testimonials/thomson-testimonials-3.webp',
    },
    {
        name: 'testimonials 4',
        imgurl: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/testimonials/thomson-testimonials-4.webp',
    },
    {
        name: 'testimonials 5',
        imgurl: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/testimonials/thomson-testimonials-5.webp',
    },
    {
        name: 'testimonials 6',
        imgurl: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/testimonials/thomson-testimonials-6.webp',
    }
]

export default function Home() {
    const { nodeurl } = Common();

    const [bannerData, setbannerData] = useState([]);
    const [categoryData, setcategoryData] = useState();
    const [prodData, setprodData] = useState();

    useEffect(() => {
        const bannerHandle = async () => {
            await fetch(nodeurl + 'banner/list', {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        bannerOrder(res.response);
                    }
                    else {
                        alert(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            produSlideData();
            categoryHandle();
        }
        bannerHandle();
    }, []);

    // banner function start


    const bannerOrder = (res) => {
        let data = [];
        data = res;
        data.sort(function (x, y) {
            return x.order - y.order;
        });
        setbannerData(data);
    }

    // banner function end

    // category function start

    const categoryHandle = async () => {
        await fetch(nodeurl + 'product/category/list', {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const data = res.response;
                    const filterData = data.filter((item) => {
                        return item.parentcate === false;
                    });
                    setcategoryData(filterData);
                }
                else {
                    alert(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
        // homeVideo();
    }


    // product slider
    const produSlideData = async () => {
        await fetch(nodeurl + 'product/list', {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setprodData(res.response);
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
            <Seotags />
            <section>
                <div className="container-fluid p-0">
                    <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination, Autoplay]} className="mySwiper"
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}>

                        {
                            bannerData && bannerData.map((item, index) => {
                                return (
                                    <SwiperSlide key={index} >
                                        <div>
                                            <Link to={item.link}>
                                                <picture>
                                                    <source media="(max-width:767px)" srcSet={nodeurl + item.bannerMobImg} />
                                                    <img src={nodeurl + item.bannerImg} alt={item.name} className="img-fluid w-100" />
                                                </picture>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>
                </div>
            </section>
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
                <div className="container ">
                    <div className="row">
                        {
                            categoryData && categoryData.map((item, index) => {
                                return (
                                    <div key={index} className="col-3 p-0 category-card-col">
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

            <section className="ptb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <video width="100%" autoPlay muted loop id="thomsonVideo" >
                                <source src={Video} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </section>

            <section className="gray-light ptb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="section-main-headimg dark pb-5">
                                FEATURED PRODUCTS
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={20}
                                pagination={{
                                    clickable: true,
                                }} loop={true} centeredSlides={true}
                                autoplay={{
                                    delay: 2000,
                                }}
                                modules={[Pagination, Autoplay]}
                                className="mySwiper product-swiper-slider-parent"
                            >
                                {
                                    prodData && prodData.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index} className="product-swiper-slider overflow-hidden">
                                                <Link to={`/product/${item._id}`}>
                                                    <ProductCard item={item} nodeurl={nodeurl} />
                                                </Link>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ptb-6">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="grid-parent-part">
                                <div className="grid-big-part  bg-black">

                                    <video width="100%" height="100%" autoPlay muted loop id="gridImg4" >
                                        <source src={gridImg4} type="video/mp4" />
                                    </video>
                                </div>
                                <div className="grid-big-part">
                                    <div className="grid-small-bg-part">
                                        <img src={gridImg1} alt="gridImg1" className="img-fluid" />
                                    </div>
                                    <div className="grid-small-bg-part">
                                        <div className="grid-small-part">
                                            <img src={gridImg2} alt="gridImg2" className="img-fluid" />
                                        </div>
                                        <div className="grid-small-part">
                                            <img src={gridImg3} alt="gridImg3" className="img-fluid" />
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-dark text-col-dark ptb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="section-main-headimg pb-5">
                                TESTIMONIALS

                            </h2>
                        </div>
                    </div>
                </div>
                <div className="container ">
                    <div className="row">
                        <div className="col-12">
                            <Swiper pagination={{
                                dynamicBullets: true,
                            }}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                modules={[Pagination, Autoplay]}
                                className="mySwiper testimonial-slider" >

                                {
                                    testimonialsData && testimonialsData.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index} >
                                                <div>
                                                    <img src={item.imgurl} alt={item.name} className="img-fluid w-100" />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }

                            </Swiper>
                        </div>


                    </div>
                </div>
            </section>

        </>
    )
}
