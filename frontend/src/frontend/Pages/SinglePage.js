import { useParams } from 'react-router-dom'
import Common from '../../Common';
import { useState, useEffect } from 'react';
import Seotags from '../Seotags';

export default function SinglePage() {

    const { slug } = useParams();
    const { nodeurl } = Common();

    const [singlePageData, setsinglePageData] = useState();

    useEffect(() => {
        singlePage();
    }, []);

    const singlePage = async () => {
        await fetch(nodeurl + `pages/listdata/${slug}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setsinglePageData(res.response);
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
 <Seotags 
 title={singlePageData && singlePageData.metatitle} 
 description={singlePageData && singlePageData.metadesciption} keywoard={null}/>
            <section className={`ptb-6 ${singlePageData && singlePageData.slug}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="single-page-data-part" dangerouslySetInnerHTML={{ __html: singlePageData && singlePageData.bodydata }}>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
