import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Common from '../../Common';
import DataTable, { createTheme } from 'react-data-table-component';
import ActionHeader from '../compo/ActionHeader';

export default function Index() {

  const { nodeurl, customStyles } = Common();
  const [cateList, setcateList] = useState();

  useEffect(() => {
    categoryListFunc();
  }, [])


  const categoryListFunc = async () => {
    await fetch(nodeurl + 'brand-store/list', {
      method: 'GET',
    }).then(res => res.json())
      .then(res => {
        console.log(res.result);
        if (res.status === 200) {
          setcateList(res.result);
        }
        else {
          alert(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }


  const columns = [
    {
      name: 'Index',
      selector: (row, idx) => idx + 1,
      cellExport: (row, idx) => idx + 1,
    },
    {
      name: 'Name',
      selector: row => row.name,
      cellExport: row => row.name,
    },
    {
      name: 'slug',
      selector: row => row.slug,
      cellExport: row => row.slug,
    },
    {
      name: 'Page Link',
      selector: row => <Link className='text-white' to={`${window.location.origin}/brand-store/${row.slug}`}>
        {`${window.location.origin}/brand-store/${row.slug}`}
      </Link>,
      cellExport: row => `${window.location.origin}/brand-store/${row.slug}`,
    },
    {
      name: 'Action',
      cell: (row) => <>
        <Link to={`/admin/brand-store/edit/${row._id}`}>
          <button onClick={() => console.log(row._id)} className='btn btn-primary py-1 px-2 me-2 table-btn'>
            Edit </button>
        </Link>
        <Link >
          <button onClick={() => brandStoreDelete(row._id)} className='btn btn-danger py-1 px-2 table-btn'>
            Delete </button>
        </Link>
      </>
    }

  ];

  createTheme('solarized', {
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
    background: {
      default: 'rgba(0,0,0,0)',
      text: '#FFFFFF',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#999999',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

  const brandStoreDelete = async (id) => {

    if(!id){
      alert("Somthing went wrong. Please Reload the page");
    }
    else{
      if (window.confirm('Are you sure you want to delete the Brand Store?')) {
        await fetch(nodeurl + `brand-store/delete/${id}`,{
          method : 'DELETE',
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
        console.log('Thing was not delete the Brand Store.');
      }
    }
  }


  return (
    <>
      <section>
        <div className="container">
          <div className="col-12">
            <div className="action-header-part dashboard-bg-light rounded-3 p-4">

              <ActionHeader actiontext={'Brand Store Details'} actionlinktext={'Add New'} actionlink={'/admin/brand-store/add'} />

              <div>
                <DataTable theme='solarized' customStyles={customStyles}
                  columns={columns} pagination highlightOnHover
                  data={cateList}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
