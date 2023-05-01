
export default function Common() {

  const nodeurl = 'http://localhost:8000/';

  const customStyles = {
    rows: {
      style: {
        minHeight: '60px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        background: '#000000',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };



  return { nodeurl, customStyles }
}
