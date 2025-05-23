import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login", { replace: true });
  };

  return (
    <nav className="navbar" style={{ height: "70px", backgroundColor: "#E9EB77" }}>
      <div className="container-fluid px-3 d-flex justify-content-between align-items-center">
        <img src="../../public/logo.png" style={{ width: "150px" }} />
        <button
          className="btn fw-semibold fs-6"
          onClick={handleLogout}
          style={{
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#555"; ر
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#333"; 
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
