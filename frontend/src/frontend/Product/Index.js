import { useEffect, useState } from "react";
import Common from "../../Common"
import ProductCard from "./ProductCard";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { GrPrevious, GrNext } from "react-icons/gr";

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
    const [search, setsearch] = useState();
    const [loader, setloader] = useState(true);
    const [productData, setproductData] = useState();
    const [prodDataFilter, setprodDataFilter] = useState();
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        productList();
    }, []);

    useEffect(() => {
        if(search){
            const result = prodDataFilter && prodDataFilter.filter(item => {
                return search.toLowerCase().match(item.name.toLowerCase());
            });
            setprodDataFilter(result);
        }
    }, [search]);

    const productList = async () => {
        await fetch(nodeurl + 'product/list', {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setproductData(res.response);
                    setprodDataFilter(res.response);
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

    const itemLenght = prodDataFilter && prodDataFilter.length;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = prodDataFilter && prodDataFilter.slice(itemOffset, endOffset);
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
                        <div className="ms-auto col-4">
                            <div className="product-search">
                                <form className="product-search-form">
                                    <div className="position-relative">
                                        <BsSearch className="product-search-icon search-icon" />
                                        <input type="text" className="form-control" id="search" name="search" placeholder="Search"
                                            onChange={(e) => setsearch(e.target.value)} />
                                        <RxCross1 className="product-search-icon cross-icon" onClick={() => setprodDataFilter(productData)} />
                                    </div>
                                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            loader ? <Loader /> : <Items currentItems={currentItems} />
                        }

                    </div>

                    <div className="row">
                        <div className="col-12 text-center mt-5">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="< previous"
                                renderOnZeroPageCount={null}
                                containerClassName={'pagination justify-content-center'}
                                pageClassName={'page-item'} pageLinkClassName={'page-link'} activeClassName={'active'}
                                previousClassName={'page-item'} nextClassName={'page-item'} previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'} disabledClassName={'disabled'}
                                breakClassName={'page-item'} breakLinkClassName={'page-link'}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
