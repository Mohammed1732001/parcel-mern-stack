import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { PuplicRequest } from "../requsetMethod";
// import { keys } from "@mui/system";

function Statement() {
  const user = useSelector((state) => state.user);
  const token = user.currentUser.token;
  const decoded = jwtDecode(token);
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const [parcels, setParcels] = useState([]);
  const deliveredParcels = parcels.filter((p) => p.status === 2);
  const totalCollected = deliveredParcels.reduce((sum, p) => sum + p.cost, 0);

  useEffect(() => {
    const getParcels = async () => {
      const email = decoded.email;
      if (email) {
        try {
          const res = await PuplicRequest.post("/parcel/me", {
            email: email,
          });
          setParcels(res.data.parcels);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getParcels();
  }, []);

  return (
    <div className="container my-4">
      <div className="bg-light p-4 rounded-3 shadow-sm">
        <Link to="/Myparcels" className="d-print-none">
          <FaArrowLeft className="text-dark mb-2" />
        </Link>

        <h2>📄 My Statement</h2>
        <p><strong>Name: {decoded.FullName}</strong></p>
        <p><strong>Role: {decoded.role}</strong></p>
        <p><strong>Date Range: {formattedDate}</strong></p>

        <button onClick={() => window.print()} className="btn btn-dark mb-3 d-print-none">
          🖨️ Print Statement
        </button>

        <hr />
        <h4>💰 Total Collected from Delivered Parcels: {totalCollected}$</h4>

        <table className="table mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Date Delivered</th>
              <th>From</th>
              <th>To</th>
              <th>Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {deliveredParcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel._id}</td>
                <td>{new Date(parcel.date).toLocaleDateString("en-GB")}</td>
                <td>{parcel.from}</td>
                <td>{parcel.to}</td>
                <td>{parcel.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Statement;
