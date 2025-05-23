import { Link } from "react-router-dom"


function NavBar() {
  return (
    <nav className="navbar" style={{ height: "70px", backgroundColor: "#E9EB77" }}>
      <div className="container d-flex flex-wrap justify-content-between align-items-center py-2">

        <div className="d-flex align-items-center">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              style={{ maxWidth: "150px", height: "auto" }}
              className="img-fluid"
            />
          </Link>
        </div>

        <div className="mt-2 mt-sm-0">
          <Link to="/login">
            <button className="btn btn-dark fw-semibold fs-6 px-4">
              LogIn
            </button>
          </Link>
        </div>

      </div>
    </nav>

  )
}

export default NavBar