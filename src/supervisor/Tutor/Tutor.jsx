import React, { useState, useEffect } from "react";
import axios from "axios";
import SupSidebar from "../pages/SupSidebar";
import { FaBell, FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { IoIosAddCircleOutline } from "react-icons/io";
// import { useTutorContext } from "../../../hooks/useTutorContext";
import './tutor.css';
const Tutor = () => {
  const [tutors, setTutors] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  // const tutorId = tutors ? tutors._id : null;
  // const tutorId = "123456";
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

  // const fetchNotificationCount = async (tutorId) => {
  //   try {
  //     const response = await axios.get(
  //       `/api/supervisor/tutor-notifications/${tutorId}`
  //     );
  //     console.log(response.data.notificationCount);
  //     return response.data.notificationCount;
  //   } catch (error) {
  //     console.error(
  //       `Error fetching notification count for tutor ${tutorId}:`,
  //       error
  //     );
  //     return 0;
  //   }
  // };

  const fetchNotificationCount = async (tutorId) => {
    try {
      const response = await axios.get(
        `/api/supervisor/tutor-notifications/${tutorId}`
      );
      return response.data.notificationCount;
    } catch (error) {
      console.error(
        `Error fetching notification count for tutor ${tutorId}:`,
        error
      );
      return 0; // Return 0 or handle the error according to your requirements
    }
  };

  const getNotificationCounts = async () => {
    const counts = await Promise.all(
      tutors.map(async (tutor) => {
        if (tutor.sentRequest) {
          return {
            tutorId: tutor._id,
            count: await fetchNotificationCount(tutor._id),
          };
        } else {
          return { tutorId: tutor._id, count: 0 };
        }
      })
    );

    // 'counts' will be an array of objects with tutorId and count properties
    console.log(counts);

    // Handle the counts as needed, e.g., update state
    // setNotificationCounts(counts);
  };

  useEffect(() => {
    if (tutors.length > 0) {
      getNotificationCounts();
    }
  }, [tutors]);
  // useEffect(() => {
  //   if (Array.isArray(tutors) && tutors.length > 0) {
  //     fetchNotificationCounts();
  //   }
  // }, [tutors]);

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

          {/* <div className=" text-center m-5 mb-10 text-gray-500 tracking-wide font-light">
            <h1 className="mb-40 text-2.5xl">Accepted Tutors</h1>
            {tutors &&
              tutors.map((tutor) => (
                <div className="md:px-5 mt-5  flex flex-col-4">
                  <div className=" p-3 mt-4 lg:flex lg:flex-wrap md:flex lg:justify-between rounded-lg flex justify-center items-center">
                    <div className="w-150 h-150 rounded-full overflow-hidden mx-auto">
                      <img
                        src={`http://localhost:9999/api/files/images/${tutor.selectedImages}`}
                        alt={tutor.firstName}
                        className="object-cover w-full rounded-md  h-[50%]"
                      />
                    </div>
                    <div className=" text-center">
                      <h3 className="text-cyan text-1.4rem mt-25">
                        {tutor.firstName} {tutor.lastName}
                      </h3>
                      <p className="text-cyan tracking-wide">
                        {tutor.profession}
                      </p>
                      <div className="mt-30">
                        <FaBell className="text-cyan text-base bg-beige p-15 m-0 mr-3 ml-3 rounded-tl-15 rounded-tr-15 transition duration-500 hover:bg-white hover:text-cyan" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div> */}
          <section className=" md:px-5  min-h-screen flex flex-col-4 ">
            <div className=" max-w-full w-full">
              <div className="p-3  lg:flex lg:flex-wrap md:flex lg:justify-between rounded-lg flex  justify-center items-center">
                {tutors &&
                  tutors.map((tutor) => (
                    <div
                      key={tutor._id}
                      className=" lg:w-1/4 w-full p-8  justify-center transition duration-300 "
                    >
                      <Link to={"/classroom"}>
                        <div className="p-4 border rounded-lg bg-slate-50  hover:border-cyan-600">
                          <div className="flex justify-between mb-4 ">
                            <img
                              src={`http://localhost:9999/api/files/images/${tutor.selectedImages}`}
                              alt={tutor.firstName}
                              className="h-16 w-16 rounded-full bg-gray-500"
                            />
                            <h3 className="text-2xl lg:text-3xl font-light text-center lg:leading-9">
                              {tutor.firstName} {tutor.lastName}
                            </h3>
                            <h4 className="text-sm lg:text-base font-light leading-5 text-center">
                              <div className="relative">
                                <FaRegBell />

                                {tutors.map((tutor) =>
                                  tutor.sentRequest ? (
                                    <div
                                      key={tutor._id}
                                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                                    >
                                      {tutor.notificationCount > 0 &&
                                        tutor.notificationCount}
                                    </div>
                                  ) : null
                                )}
                              </div>
                            </h4>
                          </div>
                          <p className="text-sm lg:text-base">
                            {tutor.profession}
                          </p>
                          <button className="bg-cyan-500 text-white rounded-lg w-full h-10 mt-4 cursor-pointer transition duration-300 hover:bg-transparent border hover:text-cyan-500 hover:border-cyan-200">
                            <Link to={""}>View Tutor</Link>
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))}{" "}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
