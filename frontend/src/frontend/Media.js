import { useState } from "react";
import Common from "../Common"
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import Loader from "../Loader";
import { Link } from "react-router-dom";

function MediaItems({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item, index) => (
                    <div key={index} id={item._id} className="medialist-item-div">
                        <p>{item.date}</p>
                        <h3>{item.title}</h3>
                        <p>{item.discription}</p>
                        <div className="btn-part">
                            <h6>{item.owner}</h6>
                            <button className="frontweb-button">
                                <Link className="text-white" to={item.link}>See Details</Link>
                            </button>
                        </div>

                    </div>
                ))}
        </>
    );
}

export default function Media() {
    const { nodeurl } = Common();
    const [loader, setloader] = useState(true);
    const [mediaListData, setmediaListData] = useState();
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const mediaListDataHandle = async () => {
            await fetch(nodeurl + 'media/list', {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setmediaListData(res.response);
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
        mediaListDataHandle();
    }, []);

    const itemLenght = mediaListData && mediaListData.length;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = mediaListData && mediaListData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(itemLenght / itemsPerPage);


    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % itemLenght;
        setItemOffset(newOffset);
    };

    return (
        <>
            <section className='ptb-4 gray-light'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto media-col-div">
                            <div className="media-heading">
                                <h2 className="section-main-headimg dark pb-5">
                                    Media
                                </h2>
                            </div>
                            <div className="media-list-part position-relative">
                                {
                                    loader ? <Loader /> : <MediaItems currentItems={currentItems} />
                                }
                            </div>
                            <div className="text-center mt-5">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="< previous"
                                    renderOnZeroPageCount={null}
                                    containerClassName={'pagination justify-content-center'}
                                    pageClassName={'page-item'} pageLinkClassName={'page-link'} activeClassName={'active'}
                                    previousClassName={'page-item'} nextClassName={'page-item'} previousLinkClassName={'page-link'}
                                    nextLinkClassName={'page-link'} disabledClassName={'disabled'}
                                />
                            </div>
                        </div>


                    </div>
                </div>
            </section>

        </>
    )
}
