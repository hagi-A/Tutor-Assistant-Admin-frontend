import React, { useState, useEffect } from "react";
import axios from "axios";
import SupSidebar from "../pages/SupSidebar";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { IoIosAddCircleOutline } from "react-icons/io";
// import { useTutorContext } from "../../../hooks/useTutorContext";
import './tutor.css';
const Tutor = () => {
  const [tutors, setTutors] = useState();

  const fetchTutors = async () => {
    try {
      const response = await axios.get("/getTutors");
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };
  useEffect(() => {
    fetchTutors();
  }, []);

  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh]">
        <SupSidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
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
            <div className="flex items-center gap-6 border-r-2 border-cyan-900 pr-6">
              <FaRegBell />
              <FaEnvelope />
            </div>

            {/* {tutor && ( */}
            <div className="flex items-center gap-4 relative">
              <p>
                Hareg Alemu
                {/* {tutor.tutor.firstName} {tutor.tutor.lastName} */}
              </p>
              <div className="h-[50px] w-[50px] rounded-full bg-cyan-800 cursor-pointer flex items-center justify-center relative ">
                <button>
                  <Link to="/profilePage">
                    <div>
                      <img
                        // src=""
                        // src={`http://localhost:9999/api/files/images/${tutor.tutor.selectedImages}`}
                        // alt={tutor.tutor.firstName}
                        className="h-[50px] w-[50px] rounded-full bg-cyan-800 cursor-pointer flex items-center justify-center relative "
                      />
                    </div>
                  </Link>
                </button>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
        <div className="pt-6 px-6 min-h-screen bg-slate-200 ">
          <div className="flex justify-between">
            <Breadcrumb pageName="Tutors" />
          </div>

          <div className="container">
            <h1>Accepted Tutors</h1>
            {tutors &&
              tutors.map((tutor) => (
                <div className="wrapper">
                  <div className="card">
                    <div className="profile-img">
                      <img
                        src={`http://localhost:9999/api/files/images/${tutor.selectedImages}`}
                        alt={tutor.firstName}
                        className="object-cover w-full rounded-md  h-[50%]"
                      />
                    </div>
                    <div className="content">
                      <h3>
                        {tutor.firstName} {tutor.lastName}
                      </h3>
                              <p>{tutor.profession}</p>
                              <div className="social-media">  </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
