import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link , useNavigate} from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import adminLogin from "../images/adminLogin.jpg"

const AdminLogin = () => {
    const navigate = useNavigate();
  const [username, setUserName] = useState("");
  // const [selectedRole, setSelectedRole] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { admin } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
     
        const response = await fetch("/api/adminAuth/adminlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
    
        const token = data.token;
        localStorage.setItem("token", token);
        const role = data.selectedRole;
      console.log(data);
      console.log("Role:", role);
      
        if (role === "Admin") {
          navigate("/adminPage");
          console.log(data);
        }  
        
        else if (role === "Supervisor") {
          navigate("/supervisorDashboard");
          console.log(data);
        } 
        } catch (error) {
          console.error(error);
        }
    
      
    
    // await login(username, email, password);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="relative flex flex-col m-6 space-y-8 bg-slate-300 shadow-2xl  rounded-2xl md:flex-row md:space-y-0">
      {/* <!-- left side --> */}
      <div className="flex flex-col justify-center p-2 md:p-14">
        <span className=" text-4xl font-light">Welcome Admin!</span>
        <span className="font-light text-cyan-500 mb-4">
         Have a productive and successful day!
        </span>

        <form onSubmit={handleSubmit}>
          <div className="py-2 mt-2">
            <label>
              <span className="mb-2 text-md  font-light">User Name: </span>
            </label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              className="w-full p-2 border border-violet-400 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          {/* <div className="py-4">
            <label>
              <span className="mb-2 text-md font-light">Email: </span>
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full p-2 border border-violet-400 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div> */}
          <div className="py-4">
            <label>
              <span className="mb-2 text-md font-light">Password:</span>
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full p-2 border  border-violet-400 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
            </div>
            
          {/* <div class="flex justify-between w-full py-4">
            <span class="font-bold text-md">Forgot password</span>
          </div> */}

          <button
            disabled={isLoading}
            className="w-full bg-black text-white p-2 rounded-lg mb-2 mt-2 hover:text-violet-400 hover:border hover:border-violet-400"
          >
            Login
          </button>
          {error && <div className="text-red-500 border border-red-500 rounded-lg p-4 m-4">{error}</div>}
        
        </form>
       {/* right side */}
    
      </div>
      <div className="relative">
      <img
        src={adminLogin}
        alt="img"
        class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
      />
      {/* <!-- text on image  --> */}
      {/* <div
        class="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
      >
        <span class="text-white text-xl"
          >We've been uesing Untitle to kick"<br />start every new project
          and can't <br />imagine working without it."
        </span>
      </div> */}
    </div>
    </div>
  </div>

  )
}

export default AdminLogin