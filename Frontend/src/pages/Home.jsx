import Footer from "../components/Footer.jsx"
import NavBar from "../components/NavBar.jsx"

function Home() {
  return (
    <div >
      <NavBar />

      <div className="py-5" style={{ backgroundColor: "#2e2e2e", minHeight: "80vh" }}>
        <div className="container">
          <div className="row align-items-center text-white">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold" style={{ fontSize: "28px" }}>
                SIMPLE, FAST AND RELIABLE <br />
                PARCEL DELIVERY SYSTEM
              </h2>
            </div>
            <div className="col-md-6 text-center">
              <img src="./../public/hero.png"alt="Delivery Illustration"className="img-fluid"/>
            </div>
          </div>
        </div>
      </div>



      <Footer />
    </div>
  )
}

export default Home