import React from 'react';
import BannerStoreData from './BrandStore.json';
import { useParams } from 'react-router-dom';

export default function SingleBrandStore() {

    const { slug } = useParams();
    const bannerData = BannerStoreData.filter((item) => {
        return item.slug === slug
    });

    const brandStoreImage = bannerData[0].imagedata;
    // console.log(brandStoreImage)

    return (
        <>
            <section>
                <div className='container-fluid'>
                    <div className="row">

                        {
                            brandStoreImage && brandStoreImage.map((item, index) => {
                                console.log(item.data.length)
                                if(item.data.length === 1){
                                    return (
                                        <>
                                        
                                            <div className="col-12 p-0">
                                                <div key={index} className="img-part">
                                                    <img src={item.data[0].imgurl} alt={item.data[0].imgurl} className='img-fluid w-100' />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                else if(item.data.length === 2){
                                    return (
                                        <>
                                            <div className="col-6 p-0">
                                                <div key={index} className="img-part">
                                                    <img src={item.data[0].imgurl} alt={item.data[0].imgurl} className='img-fluid w-100' />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div key={index} className="img-part">
                                                    <img src={item.data[1].imgurl} alt={item.data[1].imgurl} className='img-fluid w-100' />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                else if(item.data.length === 3){
                                    return (
                                        <>
                                            <div className="col-4 p-0">
                                                <div key={index} className="img-part">
                                                    <img src={item.data[0].imgurl} alt={item.data[0].imgurl} className='img-fluid w-100' />
                                                </div>
                                            </div>
                                            <div className="col-4 p-0">
                                                <div key={index} className="img-part">
                                                    <img src={item.data[1].imgurl} alt={item.data[1].imgurl} className='img-fluid w-100' />
                                                </div>
                                            </div>
                                            <div className="col-4 p-0">
                                                <div key={index} className="img-part">
                                                    <img src={item.data[2].imgurl} alt={item.data[2].imgurl} className='img-fluid w-100' />
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
