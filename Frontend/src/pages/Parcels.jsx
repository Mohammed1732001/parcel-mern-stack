import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PuplicRequest } from '../requsetMethod';
import { jwtDecode } from "jwt-decode";

function Parcels() {
  const [parcels, setParcels] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(user.token);
 console.log(user);
  const token = user.currentUser.token
  console.log(token);
  
  const decoded = jwtDecode(token)
console.log(decoded);

  useEffect(() => {
    const getParcels = async () => {
      try {
        if (!decoded?.email) {
          console.log("User email not found.");
          return;
        }

        const res = await PuplicRequest.post("/parcel/me", {
          email: decoded.email, 
        });

        console.log(res.data.parcels);

        setParcels(res.data.parcels);
      } catch (error) {
        console.log(error);
      }
    };

    if (decoded?.email) {
      getParcels(); 
    }
  }, [user?.currentUser?.email]); 

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "senderName", headerName: "Sender Name", flex: 1 },
    { field: "recipientName", headerName: "Recipient Name", flex: 1 },
    { field: "from", headerName: "From", flex: 1 },
    { field: "to", headerName: "To", flex: 1 },
    { field: "cost", headerName: "Cost ($)", type: "number", flex: 0.7 },
  ];

  return (
    <div className="container my-4">
      <div className="bg-light p-3 rounded-3 shadow-sm" style={{ maxWidth: "100%", overflowX: "auto" }}>
        <Link to="/Myparcels">
          <FaArrowLeft className="text-dark mb-2" />
        </Link>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>All Parcels</span>
          <span style={{ fontWeight: "500" }}>
            {decoded.FullName}
          </span>
        </div>

        <div style={{ height: 400, minWidth: "600px" }}>
          <DataGrid
            rows={parcels}
            getRowId={(row) => row._id}
            onRowClick={(params) => {
              window.location.href = `Myparcels/parcel/${params.row._id}`;
            }}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            style={ { cursor:"pointer"}}
          />
        </div>
      </div>
    </div>
  );
}

export default Parcels;
