import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Common from '../../Common';
import DataTable, { createTheme } from 'react-data-table-component';
import ActionHeader from '../compo/ActionHeader';
import Swal from 'sweetalert2';

export default function Index() {

  const { nodeurl, customStyles } = Common();
  const [mediaList, setmediaList] = useState();

  useEffect(() => {
    mediaListFunc();
  }, [])


  const mediaListFunc = async () => {
    await fetch(nodeurl + 'media/list', {
      method: 'GET',
    }).then(res => res.json())
      .then(res => {
        console.log(res.response);
        if (res.status === 200) {
            setmediaList(res.response);
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
      name: 'title',
      selector: row => row.title,
      cellExport: row => row.title,
    },
    {
      name: 'owner',
      selector: row => row.owner,
      cellExport: row => row.owner,
    },
    {
      name: 'date',
      selector: row => row.date,
      cellExport: row => row.date,
    },
    {
      name: 'Action',
      cell: (row) => <>
        <Link to={`/admin/media/edit/${row._id}`}>
          <button onClick={() => console.log(row._id)} className='btn btn-primary py-1 px-2 me-2 table-btn'>
            Edit </button>
        </Link>
        <Link >
          <button onClick={() => mediaDelete(row._id)} className='btn btn-danger py-1 px-2 table-btn'>
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

  const mediaDelete = async (id) => {

    if(!id){
      alert("Somthing went wrong. Please Reload the page");
    }
    else{
      if (window.confirm('Are you sure you want to delete the media?')) {
        await fetch(nodeurl + `media/delete/${id}`,{
          method : 'DELETE',
        }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1000
              }).then(function () {
                window.location.reload();
              });
          }
          else {
            alert(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });

      } else {
        console.log('Thing was not delete the media.');
      }
    }
  }


  return (
    <>
      <section>
        <div className="container">
          <div className="col-12">
            <div className="action-header-part dashboard-bg-light rounded-3 p-4">

              <ActionHeader actiontext={'Media List'} actionlinktext={'Add New'} actionlink={'/admin/media/add'} />

              <div>
                <DataTable theme='solarized' customStyles={customStyles}
                  columns={columns} pagination highlightOnHover
                  data={mediaList}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
