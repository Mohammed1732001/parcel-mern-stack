import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Footer from "../compnante/Footer";
import { PuplicRequest } from "./requestMethod";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");



  const handleLogin = async () => {
    setErrorMsg(""); // reset any previous errors

    if (!email || !password) {
      setErrorMsg("من فضلك أدخل الإيميل والباسورد.");
      return;
    }

    try {
      const res = await PuplicRequest.post("/auth/login", { email, password, });
      console.log(res);

      const token = res.data.token;
      const decoded = jwtDecode(token);
      console.log(decoded);
      

      if (decoded.role === "Admin") {
        localStorage.setItem("token", token);
        window.location.href = "/";
      } else {
        setErrorMsg("أنت لست Admin.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMsg("الإيميل أو الباسورد غير صحيح.");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "Admin") {
          window.location.href = "/home";
        } else {
          setErrorMsg("أنت لست Admin.");
        }
      } catch (err) {
        console.error("توكن غير صالح");
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <div>
      <div
        className="d-flex justify-content-center justify-content-lg-evenly align-items-center p-3 p-lg-5 flex-column-reverse flex-lg-row"
        style={{ minHeight: "90.5vh", color: "gray" }}
      >
        {/* Left section (logo) */}
        <div className="text-center text-lg-start mb-4 mb-lg-0">
          <h2 className="text-secondary fw-semibold" style={{ fontSize: "35px" }}>
            SendIT Admin
          </h2>
          <img
            src="../../public/hero.png"
            alt="Hero"
            className="img-fluid"
            style={{ maxWidth: "100%" }}
          />
        </div>

        {/* Login box */}
        <div
          className="w-100"
          style={{
            maxWidth: "350px",
            backgroundColor: "#E9EB77",
            borderRadius: "10px",
            padding: "30px 20px",
          }}
        >
          <input
            type="text"
            placeholder="Enter your email"
            className="d-block p-2 my-3 w-100 mx-auto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: "5px",
              border: "none",
            }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="d-block p-2 my-3 w-100 mx-auto"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderRadius: "5px",
              border: "none",
            }}
          />

          {errorMsg && (
            <div className="text-danger text-center mb-2" style={{ fontSize: "14px" }}>
              {errorMsg}
            </div>
          )}

          <div className="d-flex justify-content-center">
            <button onClick={handleLogin} className="btn btn-dark w-100 p-2 mt-2">
              Login
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
