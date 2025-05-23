import { FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (

<div className="py-4 px-3" style={{ backgroundColor: "#E9EB77" }}>
  <div className="container">
    <div className="row justify-content-center text-center text-md-start align-items-center">

      <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
        <img src="/logo.png" alt="Logo" className="w-50 mb-3" />

        <p style={{ maxWidth: "90%" }}>
          We understand that your parcels carry more than just items — they carry your trust.
          Committed to excellence, we deliver on time, every time.
        </p>

        <div>
          <Link className="mx-2" style={{ color: "blue", fontSize: "20px" }} to="https://www.facebook.com/share/15bxYLBWQT/">
            <FaFacebook />
          </Link>
          <Link className="mx-2" style={{ color: "black", fontSize: "20px" }} to="https://www.tiktok.com/@dinga.code?_t=ZS-8vHZQAdoTCO&_r=1">
            <FaTiktok />
          </Link>
          <Link className="mx-2" style={{ color: "green", fontSize: "20px" }} to="https://wa.me/201101797503">
            <FaWhatsapp />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-5 text-center text-md-end">
        <p className="mb-1">Design By Dinga Code</p>
        <p className="mb-0">&copy; One Project System</p>
      </div>

    </div>
  </div>
</div>

  )
}

export default Footer