
import { useEffect, useState } from "react";
import { IoCloudDoneSharp } from "react-icons/io5";
import {
  BsGeoAltFill, BsBoxSeam, BsCalendar3, BsPersonFill, BsCurrencyDollar, BsPersonCheckFill,
  BsHash, BsSticky, BsEnvelopeFill, BsEnvelopeOpenFill, BsClockHistory, BsSend, BsArrowLeft
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { PuplicRequest } from "../requsetMethod";

function Parcel() {
  const Location = useLocation();
  const parcelId = Location.pathname.split("/")[3];
  const [parcel, setParcel] = useState(null);

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await PuplicRequest.get("/parcel/" + parcelId);
        setParcel(res.data.parcel);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleSubmit = async () => {
    try {
      const res = await PuplicRequest.put(`/parcel/${parcelId}`, {
        status: 2,
      });
      setParcel(res.data.parcel);
      // console.log(res.data.parcel);

    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  if (!parcel || !parcel.date) {
    return <div className="text-center my-5">Loading...</div>;
  }

  const formattedDate = new Date(parcel.date).toLocaleDateString("en-GB");

  return (
    <div className="container my-5">
      <div className="bg-white rounded-4 shadow p-4">
        <Link to="/allparcels" className="text-decoration-none mb-3 d-inline-block">
          <BsArrowLeft className="text-dark fs-4" />
        </Link>

        <div className="row gy-4">
          <div className="col-12 col-lg-6">
            <ul className="list-unstyled">
              <li className="fw-bold mb-3">
                <BsGeoAltFill className="me-2 text-primary" />
                From: <span className="text-secondary">{parcel.from}</span>
              </li>
              <li className="fw-bold mb-3">
                <BsBoxSeam className="me-2 text-success" />
                Weight: <span className="text-secondary">{parcel.weight + "g"}</span>
              </li>
              <li className="fw-bold mb-3">
                <BsCalendar3 className="me-2 text-info" />
                Date: <span className="text-secondary">{formattedDate}</span>
              </li>
              <li className="fw-bold mb-3">
                <BsPersonFill className="me-2 text-dark" />
                Sender: <span className="text-secondary">{parcel.senderName}</span>
              </li>
              <li className="fw-bold mb-3">
                <BsGeoAltFill className="me-2 text-primary" />
                To: <span className="text-secondary">{parcel.to}</span>
              </li>
              <li className="fw-bold mb-3">
                <BsCurrencyDollar className="me-2 text-warning" />
                Cost: <span className="text-secondary">{parcel.cost + "$"}</span>
              </li>
              <li className="fw-bold mb-3">
                <BsPersonCheckFill className="me-2 text-dark" />
                Recipient: <span className="text-secondary">{parcel.recipientName}</span>
              </li>
              <li className="fw-bold mb-3">
                <BsHash className="me-2 text-muted" />
                Track ID: <span className="text-secondary">{parcel._id}</span>
              </li>
              <li className="fw-bold mb-3">
                <BsSticky className="me-2 text-danger" />
                Note: <span className="fw-normal text-muted">{parcel.note}</span>
              </li>
            </ul>
            <button className={parcel.status === 2 ? "btn btn-success mt-2" : "btn btn-dark mt-2"}>
              {parcel.status === 2 ? (
                <>
                  <IoCloudDoneSharp className="me-1" /> Delivered
                </>
              ) : (
                <>
                  <BsClockHistory className="me-1" /> Pending
                </>
              )}
            </button>
          </div>

          {/* العمود الأيمن */}
          <div className="col-12 col-lg-6">
            <ul className="list-unstyled">
              <li className="fw-bold mb-3">
                <BsEnvelopeFill className="me-2 text-primary" />
                Sender Email: <span className="text-secondary">{parcel.senderEmail}</span>
              </li>
              <li className="fw-bold mb-3">
                <BsEnvelopeOpenFill className="me-2 text-success" />
                Recipient Email: <span className="text-secondary">{parcel.recipientEmail}</span>
              </li>
            </ul>

            <div className="mb-3">
              <textarea
                className="form-control"
                rows="6"
                placeholder="Leave a comment"
                style={{ backgroundColor: "whitesmoke" }}
              ></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              <BsSend className="me-1" />
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parcel;
