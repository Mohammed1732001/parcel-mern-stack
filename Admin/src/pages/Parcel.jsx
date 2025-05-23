import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { PuplicRequest } from "./requestMethod"

function Parcel() {
  const [parcel, setparcel] = useState({})
  const location = useLocation()
  const parcelId = location.pathname.split("/")[2]

  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await PuplicRequest.get("/parcel/" + parcelId)
        setparcel(res.data.parcel)
        console.log(res.data.parcel);
        
      } catch (error) {
        console.log(error)
      }
    }
    getParcel()
  }, [parcelId])

  const handleUpdate = async () => {
    try {
      await PuplicRequest.put(`/parcel/${parcelId}`, inputs)
      toast.success("Parcel has been successfully Updated to dataBase.")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container-fluid p-3 mt-2" style={{ boxSizing: "borderBox", backgroundColor: "whitesmoke", overflowX: "hidden" }}>
      <h1 className="p-1 m-2 text-center" style={{ fontSize: "20px" }}>Parcel</h1>
      <div className="row d-flex flex-wrap w-100 ">
        <div className="col-12 col-md-6 col-lg-4 p-2">
          <div className="d-flex flex-column my-2">
            <label>From</label>
            <input type="text" className="form-control p-2" name="from" defaultValue={parcel.from} onChange={handleChange} />
          </div>

          <div className="d-flex flex-column my-2">
            <label>To</label>
            <input type="text" className="form-control p-2" name="to" defaultValue={parcel.to} onChange={handleChange} />
          </div>

          <div className="d-flex flex-column my-2">
            <label>Sender Name</label>
            <input type="text" className="form-control p-2" name="senderName" defaultValue={parcel.senderName} onChange={handleChange} />
          </div>

          <div className="d-flex flex-column my-2">
            <label>Recipient Name</label>
            <input type="text" className="form-control p-2" name="recipientName" defaultValue={parcel.recipientName} onChange={handleChange} />
          </div>

          <div className="d-flex flex-column my-2">
            <label>Sender Email</label>
            <input type="email" className="form-control p-2" name="senderEmail" defaultValue={parcel.senderEmail} onChange={handleChange} />
          </div>

          <div className="d-flex flex-column my-2">
            <label>Recipient Email</label>
            <input type="email" className="form-control p-2" name="recipientEmail" defaultValue={parcel.recipientEmail} onChange={handleChange} />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 p-2">
          <div className="d-flex flex-column my-2">
            <label>Weight</label>
            <input type="number" className="form-control p-2" name="weight" defaultValue={parcel.weight} onChange={handleChange} />
          </div>

          <div className="d-flex flex-column my-2">
            <label>Cost</label>
            <input type="number" className="form-control p-2" name="cost" defaultValue={parcel.cost} onChange={handleChange} />
          </div>
          <div className="d-flex flex-column my-2">
            <label>Assign To</label>
            <input type="email" className="form-control p-2" name="assignedToEmail" defaultValue={parcel.assignedToEmail} onChange={handleChange} />
          </div>

          <div className="d-flex flex-column my-2">
            <label>Date</label>
            <input type="date" className="form-control p-2" name="date"  onChange={handleChange} />
          </div>

          <div className="d-flex flex-column my-2">
            <label>Note</label>
            <textarea className="form-control p-2" name="note" defaultValue={parcel.note} onChange={handleChange}></textarea>
          </div>

          <button className="btn btn-primary w-100 my-2" onClick={handleUpdate}>Update</button>
          <ToastContainer />
        </div>

        <div className="col-12 col-md-6 col-lg-4 p-2">
          <h2 className="text-start " style={{ fontSize: "20px" }}>Feedback</h2>
          <span style={{ fontSize: "14px", color: "gray" }}>Goods Received in Good condition.</span>
          <br />
          {parcel.status === 1 || parcel.status === 0 ?
            <span style={{ fontSize: "18px", color: "Blue" }}>Pending</span> :
            <span style={{ fontSize: "18px", color: "green" }}>Goods Received in Good condition.</span>}
        </div>
      </div>
    </div>
  )
}

export default Parcel
