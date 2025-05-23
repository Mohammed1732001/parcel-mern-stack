import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { PuplicRequest } from "./requestMethod"

function User() {
    const [user, setUser] = useState({})
    const location = useLocation()
    const userId = location.pathname.split("/")[2]
  
    const [inputs, setInputs] = useState({})
  
    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value }
      })
    }
  
    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await PuplicRequest.get("/user/" +userId)
          setUser(res.data.user)
        //   console.log(res.data.user);
          
        } catch (error) {
          console.log(error)
        }
      }
      getUser()
    }, [userId])
  
    const handleUpdate = async () => {
      try {
        await PuplicRequest.put(`/user/${userId}`, inputs)
        toast.success("user has been successfully Updated to dataBase.")
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
              <label>Full Name :</label>
              <input type="text" className="form-control p-2" name="fullName" defaultValue={user.fullName} onChange={handleChange} />
            </div>
  
            <div className="d-flex flex-column my-2">
              <label>Country :</label>
              <input type="text" className="form-control p-2" name="country" defaultValue={user.country} onChange={handleChange} />
            </div>
  
            <div className="d-flex flex-column my-2">
              <label>Age :</label>
              <input type="text" className="form-control p-2" name="age" defaultValue={user.age} onChange={handleChange} />
            </div>
  
            <div className="d-flex flex-column my-2">
              <label>Addres :</label>
              <input type="text" className="form-control p-2" name="address" defaultValue={user.address} onChange={handleChange} />
            </div>
  
            <div className="d-flex flex-column my-2">
              <label>Role :</label>
              <input type="text" className="form-control p-2" name="role" defaultValue={user.role} onChange={handleChange} />
            </div>
  
            <button className="btn btn-primary w-100 my-2" onClick={handleUpdate}>Update</button>
            <ToastContainer />
          </div>
  
        </div>
      </div>
    )
}

export default User