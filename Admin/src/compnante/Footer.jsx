

function Footer() {
  return (
    <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between px-3" style={{ height: "60px", backgroundColor: "#E9EB77" }}>
    <div className="d-flex align-items-center" style={{ maxWidth: "200px" }}>
      <img src="../../public/logo.png" alt="Logo" style={{ width: "100%", maxWidth: "150px", height: "auto" }} />
    </div>
  
    <ul className="d-flex flex-column flex-sm-row gap-2 m-0 p-0 mt-2 mt-sm-0" style={{ listStyle: "none", fontSize: "14px" }}>
      <li className="me-sm-3">Admin</li>
      <li>&with OSOS</li>
    </ul>
  </div>
  )
}

export default Footer