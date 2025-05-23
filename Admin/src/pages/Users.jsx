import { DataGrid, } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { PuplicRequest } from './requestMethod';
import { ToastContainer, toast } from 'react-toastify';
function Users() {
  const [data, setData] = useState([])
  const columns = [
    { field: "_id", headerName: "ID", width: 50 },
    { field: "fullName", headerName: "Full Name", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "age", headerName: "Age", type: "number", width: 80 },
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "edit", headerName: "Edit", width: 120,
      renderCell: (params) => {
        return (
          <Link to={`/user/${params.id}`}>
            <button className='btn btn-primary'>
              Edit <FiEdit style={{ color: "white", marginLeft: "3px" }} />
            </button>
          </Link>
        );
      }
    },
    {
      field: "delete", headerName: "Delete", width: 120,
      renderCell: (params) => {
        console.log(params.id);


        return (
          <button className='btn btn-danger' onClick={() => handleDelete(params.id)} >
            Delete <FaTrash style={{ color: "white", marginLeft: "3px" }} />
          </button>
        );
      }
    },
  ];
  useEffect(() => {
    const getUsers = async () => {
      try {

        const res = await PuplicRequest.get("/user")
        setData(res.data.user)
        // console.log(res.data.user);
      } catch (error) {
        console.log(error);

      }
    }
    getUsers()
  }, [])

  const handleDelete = async (id) => {
    try {
      await PuplicRequest.delete(`/user/${id}`)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "whitesmoke" }}>
      <div className="d-flex justify-content-between">
        <h1 className="p-1 m-2" style={{ fontSize: "20px" }}>All Users</h1>

        <Link to="/NewUser">
          <button className="p-2 btn btn-dark m-2">New User</button>
        </Link>
      </div>

      <div style={{ width: '100%' }}>
        <DataGrid rows={data}
          getRowId={(row) => row._id}
          columns={columns} checkboxSelection />
      </div>
    </div>
  );

}

export default Users