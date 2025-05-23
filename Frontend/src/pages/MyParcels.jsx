import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { PuplicRequest } from '../requsetMethod';
import { logOut } from '../redux/userRedux';
import { jwtDecode } from "jwt-decode";

const MyParcels = () => {
  const [open, setOpen] = useState(false);
  const [parcels, setParcels] = useState([]);
  const [decoded, setDecoded] = useState(null);

  const navigate = useNavigate();
  const location = useLocation(); // لمعرفة إذا كنا أصلًا في صفحة login
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Check for token validity once
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (!user.currentUser || !user.currentUser.token) {
          dispatch(logOut());
          localStorage.removeItem("token");

          // ✅ فقط نعمل navigate لو مش بالفعل في صفحة login
          if (location.pathname !== "/login") {
            navigate("/login");
          }

        } else {
          const decodedToken = jwtDecode(user.currentUser.token);
          setDecoded(decodedToken);
        }
      } catch (err) {
        dispatch(logOut());
        localStorage.removeItem("token");

        if (location.pathname !== "/login") {
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, []); // ✅ يحصل مرة واحدة فقط عند تحميل الصفحة

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getParcels = async () => {
      if (decoded?.email) {
        try {
          const res = await PuplicRequest.post("/parcel/me", {
            email: decoded.email,
          });
          setParcels(res.data.parcels);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getParcels();
  }, [decoded]);

  const Logout = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!decoded) return null; // ما نرندرش الصفحة قبل التحقق

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center mt-3 position-relative" style={{ cursor: "pointer" }}>
        <div className="text-light" onClick={handleOpen} style={{ fontSize: "18px", fontWeight: "600" }}>
          <FaUser className="me-2" /> {decoded?.FullName || "Loading..."}
        </div>

        {open && (
          <div className="position-absolute shadow-lg rounded-3 p-3"
            style={{
              top: "25px",
              right: "0",
              width: "250px",
              backgroundColor: "#f8f9fa",
              zIndex: "999",
              boxShadow: "0px 10px 15px rgba(0,0,0,0.1)",
            }}
          >
            <ul className="list-unstyled m-0">
              <Link style={{ textDecoration: "none" }} to="/allparcels">
                <li className="my-2 element text-center p-2 rounded">All Parcels</li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/statement">
                <li className="my-2 element text-center p-2 rounded">Statement</li>
              </Link>
              <li className="my-2 element text-center p-2 rounded" onClick={Logout}>Logout</li>
            </ul>
          </div>
        )}
      </div>

      <div className="container mt-4">
        <h2 className="text-white" style={{ fontSize: "25px", fontWeight: "600" }}>My Parcels</h2>

        {parcels.slice(0, 3).map((parcel, index) => {
          const formattedDate = new Date(parcel.date).toLocaleDateString("en-GB");
          return (
            <Link to={`parcel/${parcel._id}`} style={{ textDecoration: "none", color: "black", fontWeight: "600" }} key={index}>
              <div className="d-flex flex-column flex-md-row justify-content-between bg-light mb-3 p-3 rounded-3 shadow-sm">
                <div className="flex-grow-1">
                  <ul>
                    <li>From: {parcel.from}</li>
                    <li>Weight: {parcel.weight + "g"}</li>
                    <li>Date: {formattedDate}</li>
                    <li>Sender: {parcel.senderName}</li>
                  </ul>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <span>To: {parcel.to}</span>
                  <button className={parcel.status === 1 || parcel.status === 0 ? "btn btn-dark mt-2" : "btn btn-success mt-2"}>
                    {parcel.status === 1 || parcel.status === 0 ? "Pending" : "Delivered"}
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MyParcels;
