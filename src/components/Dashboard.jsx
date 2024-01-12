import React, { useState, useEffect } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import axios from "axios";


const Dashboard = () => {
    const { admin } = useAuthContext();
    const [newNotifications, setNewNotifications] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        // Poll the server to check for new notifications
        checkNotifications();
      }, 5000);

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);

    const checkNotifications = async () => {
      try {
        // Make an API call to check for new notifications
        const response = await axios.get("/api/supervisor/notifications");
        setNewNotifications(response.data.newNotifications);
      } catch (error) {
        console.error("Error checking notifications:", error);
      }
    };

  return (
    <div className="flex items-center justify-between h-[70px] shadow-lg px-6">
      <div className="flex items-center rounded-sm ">
        <input
          type="text"
          className="bg-white h-10 border border-cyan-500 outline-none pl-3 w-[350px] rounded-md placeholder:text-sm leading-5 font-normal"
          placeholder="Search for ..."
        />
        <div className="bg-cyan-500 h-10 px-3 flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
          <FaSearch color="white" />
        </div>
      </div>
      <div className="flex items-center gap-4 relative">
        <div className="flex items-center gap-6 border-r-2 pr-6">
          <div className="relative">
            <FaRegBell />
            {newNotifications > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {newNotifications}
              </div>
            )}
          </div>
          <FaEnvelope />
        </div>
        <div className="flex items-center gap-4 relative">
                  <p>{admin.admin.firstName}{" "} {admin.admin.lastName}</p>
          <div className="h-[50px] w-[50px] rounded-full bg-cyan-800 cursor-pointer flex items-center justify-center relative ">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard