import { useEffect, useState } from "react";
import Common from "../../Common"
import ProductCard from "./ProductCard";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import Loader from "../../Loader";


function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item, index) => (
                    <div key={index} id={item._id} className="col-lg-3 col-md-6 col-6 mb-4 product">
                        <Link to={`/product/${item._id}`}>
                            <ProductCard item={item} />
                        </Link>
                    </div>
                ))}
        </>
    );
}

export default function Index() {

    const { nodeurl } = Common();

    const [loader, setloader] = useState(true);
    const [productData, setproductData] = useState();
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        productList();
    }, [])


    const productList = async () => {
        await fetch(nodeurl + 'product/list', {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setproductData(res.response);
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

    const itemLenght = productData && productData.length;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = productData && productData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(itemLenght / itemsPerPage);


    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % itemLenght;
        setItemOffset(newOffset);
    };

    return (
        <>
            <section className="gray-light ptb-5 position-relative">
                <div className="container">
                    <div className="row">
                        {
                            loader ? <Loader/> : <Items currentItems={currentItems} />
                        }
                        
                    </div>
                    <div className="row">
                        <div className="col-12 text-center mt-5">
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
            </section>
        </>
    )
}
