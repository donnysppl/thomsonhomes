import React from 'react';
import BannerStoreData from './BrandStore.json';
import { Link } from 'react-router-dom';

export default function BrandStore() {

    const bannerData = BannerStoreData;

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="link-part">
                                <ul>
                                    {
                                        bannerData && bannerData.map((item, index) => {
                                            return (
                                                <>
                                                    <li key={index}><Link to={`/brand-store/${item.slug}`}>{item.name}</Link></li>
                                                </>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
