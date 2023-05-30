import { useState } from "react";
import { useEffect } from "react";

export default function Common() {

  const [token, settoken] = useState();

  // const nodeurl = 'http://192.168.0.105:8000/';
  const nodeurl = 'http://localhost:8000/';
  // const nodeurl = 'https://thomson.shopsppl.net/';

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      settoken(token);
    }
  }, [])
  

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

  const tokenValue = window.localStorage.getItem("token") || token;

  return { nodeurl, customStyles, tokenValue }
}
