import { useState, useEffect } from "react";
import Common from "../../Common";
import { Link } from "react-router-dom";

export default function Index() {

    const { nodeurl } = Common();
    const [pageDataList, setpageDataList] = useState();
    useEffect(() => {
        frontPagesList();
    }, [])

    const frontPagesList = async () => {
        await fetch(nodeurl + 'pages/list', {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setpageDataList(res.response);
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
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ul>
                            {
                                pageDataList && pageDataList.map((item, index) => {
                                    return (
                                        <Link key={index} to={`/pages/${item.slug}`}><li >{item.name}</li></Link>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}