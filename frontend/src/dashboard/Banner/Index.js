import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Common from '../../Common';
import ActionHeader from '../compo/ActionHeader';
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
export default function Index() {

  const { nodeurl, customStyles } = Common();
  const [cateList, setcateList] = useState();


  useEffect(() => {
    categoryListFunc();
  }, [])


  const categoryListFunc = async () => {
    await fetch(nodeurl + 'banner/list', {
      method: 'GET',
    }).then(res => res.json())
      .then(res => {
        console.log(res.response);
        if (res.status === 200) {
          setcateList(res.response);
        }
        else {
          alert(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const categoryDelete = async (id) => {

    if (!id) {
      alert("Somthing went wrong. Please Reload the page");
    }
    else {
      if (window.confirm('Are you sure you want to delete the category?')) {
        await fetch(nodeurl + `banner/delete/${id}`, {
          method: 'DELETE',
        }).then(res => res.json())
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              alert(res.message);
              window.location.reload();
            }
            else {
              alert(res.message);
            }
          })
          .catch(err => {
            console.log(err);
          });

      } else {
        console.log('Thing was not delete the category.');
      }
    }
  }


  return (
    <>
      <section>
        <div className="container x">
          <div className="col-12">
            <div className="action-header-part dashboard-bg-light rounded-3 p-4">

              <ActionHeader actiontext={'Banner Details'} actionlinktext={'Add New'} actionlink={'/admin/banner/add'} />

              <div>
                <div className="container pt-3">
                  <div className="row">
                    {
                      cateList && cateList.map((item, index) => {
                        return (
                          <div key={index} className="col-md-4 mb-4">
                            <div className="card" >
                              <img src={nodeurl + item.bannerImg} className="card-img-top rounded-2" alt="..." />
                              <div className="card-body d-flex justify-content-between">
                                <div className='cardText align-self-center'>
                                  <p className="card-text">{item.name}</p>
                                </div>
                                <div className='cardaction'>
                                  <ul>
                                    <li><Link to={`/admin/banner/edit/${item._id}`}><FiEdit2/></Link></li>
                                    <li onClick={(e) => categoryDelete(item._id)}><AiOutlineDelete/></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }

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
