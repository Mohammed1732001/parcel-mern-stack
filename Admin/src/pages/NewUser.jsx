import { useState } from "react"
import { PuplicRequest } from "./requestMethod"
import { ToastContainer, toast } from 'react-toastify';

function NewUser() {



  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleAddUser = async () => {
    try {
      if (!inputs.fullName || !inputs.email|| !inputs.Cpassword || !inputs.password || !inputs.age || !inputs.country || !inputs.address) {
        toast.error("Please fill all fields.");
        return;
      }

      const res = await PuplicRequest.post("/auth/signUp", { ...inputs });
      console.log(res);

      if (res.status === 201) {
        toast.success("User has been successfully saved to the database.");
      } else {
        toast.error("Failed to create user.");
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
      console.error(error);
    }
  };

  return (
    <div className="container-fluid " style={{ backgroundColor: "whitesmoke" }}>
      <h1 className="p-1 m-2" style={{ fontSize: "20px" }}>New User</h1>

      <div className="d-flex flex-column my-2">
        <label htmlFor="">Full Name</label>
        <input type="text" name="fullName" onChange={handleChange} className="form-control col-12 col-md-6 p-2" placeholder="James Doe" />
      </div>

      <div className="d-flex flex-column my-2">
        <label htmlFor="">Email</label>
        <input type="email" name="email" onChange={handleChange} className="form-control col-12 col-md-6 p-2" placeholder="JamesDoe@gmail.com" />
      </div>

      <div className="d-flex flex-column my-2">
        <label htmlFor="">Password</label>
        <input type="text" name="password" onChange={handleChange} className="form-control col-12 col-md-6 p-2" placeholder="password" />
      </div>
      <div className="d-flex flex-column my-2">
        <label htmlFor="">confirm Password</label>
        <input type="text" name="Cpassword" onChange={handleChange} className="form-control col-12 col-md-6 p-2" placeholder="password" />
      </div>

      <div className="d-flex flex-column my-2">
        <label htmlFor="">Age</label>
        <input type="number" name="age" onChange={handleChange} className="form-control col-12 col-md-6 p-2" placeholder="20" />
      </div>

      <div className="d-flex flex-column my-2">
        <label htmlFor="">Country</label>
        <input type="text" name="country" onChange={handleChange} className="form-control col-12 col-md-6 p-2" placeholder="California" />
      </div>

      <div className="d-flex flex-column my-2">
        <label htmlFor="">Address</label>
        <input type="text" name="address" onChange={handleChange} className="form-control col-12 col-md-6 p-2" placeholder="Lura Ave, California" />
      </div>

      <button className="btn btn-primary col-12 col-md-6 my-2" onClick={handleAddUser}>Create</button>
      <ToastContainer />

    </div>

  )
}

export default NewUser