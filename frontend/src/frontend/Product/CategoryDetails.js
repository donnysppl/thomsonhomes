import { useState, useEffect } from 'react'
import Common from '../../Common';
import Loader from '../../Loader';
import { useParams } from 'react-router-dom'
import ProductCard from './ProductCard';

export default function CategoryDetails() {

  const { nodeurl } = Common();
  const { slug } = useParams();

  const category = slug;

  const [prodListData, setprodListData] = useState();
  const [loader, setloader] = useState(true);

  useEffect(() => {
    const prodListDatabyCate = async () => {
      await fetch(nodeurl + `product/list/${category}`, {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setprodListData(res.response);
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
    prodListDatabyCate();
  }, []);


  return (
    <>
      <section className='ptb-4'>
        <div className="container">
          <div className="row">
            <h2 className="section-main-headimg dark pb-5">
              {category}
            </h2>
          </div>
          <div className="row position-relative">
            {
              loader ? <Loader/> : 
              prodListData && prodListData.length === 0 ? <div>Data is empty</div> : 
              prodListData && prodListData.map((item, index) => {
                return (
                  <div key={index} className="col-lg-3 col-md-6 col-6">
                    <ProductCard item={item} />
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
