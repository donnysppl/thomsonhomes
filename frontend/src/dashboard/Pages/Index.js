import { useEffect, useState } from 'react';
import ActionHeader from '../compo/ActionHeader';
import Common from '../../Common';
import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from 'react-router-dom';

export default function Index() {

  const { nodeurl, customStyles } = Common();
  const [pageList, setpageList] = useState();

  useEffect(() => {
    pageListData();
  }, []);

  const pageListData = async () => {
    await fetch(nodeurl + 'pages/list', {
      method: 'GET',
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setpageList(res.response)
        }
        else {
          alert(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const pageDelete = async (id) => {
    if (!id) {
      alert("Somthing went wrong. Please Reload the page");
    }
    else {
      if (window.confirm('Are you sure you want to delete the Page?')) {
        await fetch(nodeurl + `pages/delete/${id}`, {
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
        console.log('Thing was not delete the Page.');
      }
    }
  }


  const columns = [
    {
      name: 'Index',
      selector: (row, idx) => idx + 1,
      cellExport: (row, idx) => idx + 1,
      width: '100px',
    },
    {
      name: 'Name',
      selector: row => row.name,
      cellExport: row => row.name,
      width: '150px',
    },
    {
      name: 'slug',
      selector: row => row.slug,
      cellExport: row => row.slug,
      width: '150px',
    },
    {
      name: 'Page Link',
      selector: row => <Link className='text-white' to={`${window.location.origin}/pages/${row.slug}`}>
        {`${window.location.origin}/pages/${row.slug}`}
      </Link>,
      cellExport: row => `${window.location.origin}/pages/${row.slug}`,
      width: '300px',
    },
    {
      name: 'Action',
      cell: (row) => <>
        <div className='d-flex gap-3'>
          <Link to={`/admin/pages/edit/${row._id}`}>
            <button className='btn btn-sm btn-success '>Edit</button>
          </Link>
          <button onClick={() => pageDelete(row._id)} className='btn btn-sm btn-danger '>Delete</button>
        </div>
      </>,
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


  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className='action-header-part dashboard-bg-light rounded-3 p-4'>
                <ActionHeader actiontext={'Pages Details'} actionlinktext={'Add New'} actionlink={'/admin/pages/add'} />
                <div className="datatable-part">
                  <DataTable theme='solarized' customStyles={customStyles}
                    columns={columns} pagination highlightOnHover
                    data={pageList}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
