import { FaBox, FaCalendarAlt, FaChartBar, FaClipboard, FaClipboardList, FaCog, FaElementor, FaHdd, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
function Menue() {
  return (
  
  
<div className="shadow-lg rounded" style={{ height: "90vh" }}>
  <ul className="d-flex flex-column align-items-start p-0" style={{ listStyle: "none" }}>
    <Link className="link-ul-li" to="/">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto mt-2">
        <FaHome className="w-100 m-2" /> Home
      </li>
    </Link>

    <Link className="link-ul-li" to="/">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaUser className="w-100 m-2" /> Profile
      </li>
    </Link>

    <hr style={{ height: "5px" }} />

    <Link className="link-ul-li" to="/Parcels">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaBox className="w-100 m-2" /> Parcels
      </li>
    </Link>

    <Link className="link-ul-li" to="/Users">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaUsers className="w-100 m-2" /> Users
      </li>
    </Link>

    <Link className="link-ul-li" to="/">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaClipboardList className="w-100 m-2" /> Orders
      </li>
    </Link>

    <hr style={{ height: "5px" }} />

    <Link className="link-ul-li" to="/">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaElementor className="w-100 m-2" /> Elements
      </li>
    </Link>

    <Link className="link-ul-li" to="/">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaCog className="w-100 m-2" /> Settings
      </li>
    </Link>

    <Link className="link-ul-li" to="/">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaHdd className="w-100 m-2" /> Backup
      </li>
    </Link>

    <hr style={{ height: "5px" }} />

    <Link className="link-ul-li" to="/">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaChartBar className="w-100 m-2" /> Charts
      </li>
    </Link>

    <Link className="link-ul-li" to="/">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaClipboard className="w-100 m-2" /> Logs
      </li>
    </Link>

    <Link className="link-ul-li" to="/">
      <li className="menue-ul-li text-center d-flex align-items-center mx-auto">
        <FaCalendarAlt className="w-100 mr-2" /> Calendar
      </li>
    </Link>
  </ul>
</div>
  
  
  )
}

export default Menue