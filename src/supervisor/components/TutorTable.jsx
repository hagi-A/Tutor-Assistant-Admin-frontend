import React, { useEffect, useState } from "react";
import axios from "axios";
import SupSidebar from "../pages/SupSidebar";
import { Link, useParams } from "react-router-dom";

import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import Breadcrumb from "../../components/Breadcrumb";

const TutorTable = () => {
  // const baseUrl= "http://localhost"
  const [tutors, setTutors] = useState([]);
  // const { tutorId } = useParams(); // Access the tutorId parameter from the URL

  // useEffect(() => {
  //   axios
  //     .get("/getTutors")
  //     .then((tutors) => setTutors(tutors.data))
  //     .catch((err) => console.log(err));
  // }, []);
  const fetchTutors = async () => {
    try {
      const response = await axios.get("/getTutors");
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };
  // Function to accept action for a tutor
  const acceptAction = async (tutorId) => {
    try {
      await axios.put(`/api/tutors/tutor-requests/${tutorId}/accept`);
      // Refresh tutors after successful action
      // fetchTutors();
      // const updatedTutors = tutors.map((tutor) => {
      //   if (tutor._id === tutorId) {
      //     return { ...tutor, actionStatus: "Accepted" };
      //   }
      //   return tutor;
      // });
      // setTutors(updatedTutors);
      // Update the status in the frontend
      const updatedRequests = tutors.map((tutor) => {
        if (tutor._id === tutorId) {
          return { ...tutor, status: "Accepted" };
        }
        return tutor;
      });
      setTutors(updatedRequests);
      // console.log(updatedRequests);
    } catch (error) {
      console.error("Error accepting action:", error);
    }
  };

  // Function to deny action for a tutor
  const denyAction = async (tutorId) => {
    try {
      await axios.put(`/api/tutors/tutor-requests/${tutorId}/deny`);
      const updatedRequests = tutors.map((tutor) => {
        if (tutor._id === tutorId) {
          return { ...tutor, status: "Denied" };
        }
        return tutor;
      });
      setTutors(updatedRequests);
    } catch (error) {
      console.error("Error denying action:", error);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  return (
    <>
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
              <div className="flex items-center gap-6 border-r-2 pr-6">
                <FaRegBell />
                <FaEnvelope />
              </div>
              <div className="flex items-center gap-4 relative">
                <p>Hareg Alemu</p>
                <div className="h-[50px] w-[50px] rounded-full bg-cyan-800 cursor-pointer flex items-center justify-center relative ">
                  <img src="" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 px-6 min-h-screen bg-slate-200 ">
            <Breadcrumb pageName="Requests" />
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-cyan-50 border-b-2 border-cyan-800 ">
                  <tr>
                    <th className="p-3 text-sm font-light tracking-wide text-left">
                      No.
                    </th>
                    <th className="p-3 text-sm font-light tracking-wide text-left">
                      Full Name
                    </th>
                    <th className="p-3 text-sm font-light tracking-wide text-left">
                      Email
                    </th>
                    <th className="p-3 text-sm font-light tracking-wide text-left">
                      Profession
                    </th>
                    <th className="p-3 text-sm font-light tracking-wide text-left">
                      Phone Number
                    </th>
                    <th className="p-3 text-sm font-light tracking-wide text-left">
                      Status
                    </th>
                    {/* <th className="p-3 text-sm font-light tracking-wide text-center">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {tutors.map((tutor, index) => (
                    <tr
                      key={tutor._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <Link to={`/tutorProfile/${tutor._id}`}>
                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap hover:border  hover:border-cyan-900 hover:rounded-lg ">
                          {tutor.firstName} {tutor.lastName}
                        </td>
                      </Link>
                      <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                        {tutor.email}
                      </td>
                      <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                        {tutor.profession}
                      </td>
                      <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                        {tutor.phoneNumber}
                      </td>
                      {/* <td className="p-3 text-sm text-gray-500  whitespace-nowrap">
                        <a
                          href={
                            "http://localhost:9999/api/files/images/" +
                            tutor.selectedCVs
                          }
                          target="_blank"
                        >
                          {tutor.selectedCVs}
                        </a>
                      </td> */}
                      <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                        {tutor.status}
                        {/* Replace with actual action status */}
                      </td>
                      {/* <td>
                        <div className="flex justify-around p-1">
                          <button
                            onClick={() => acceptAction(tutor._id)}
                            className="p-2 rounded-xl border border-green-500 hover:bg-green-500 hover:text-white text-black "
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => denyAction(tutor._id)}
                            className="ml-2 p-2 rounded-xl border border-red-500 hover:bg-red-500 hover:text-white text-black "
                          >
                            Deny
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <span
                          className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                            tutor.selectedRole === "Admin"
                              ? "bg-red-500 text-white" // Red background for admin
                              : tutor.selectedRole === "Supervisor"
                              ? "bg-yellow-500 text-black" // Yellow background for supervisor
                              : "bg-blue-500 text-white" // Default blue background for other roles
                          }`}
                        >
                          {tutor.selectedRole}
                        </span> */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 text-sm">
                {users.map((user, index) => (
                    <>
                    <div>#{index+1}</div>
                    <div>{user.username}</div>
                    <div>{user.age}</div>
                   </>
                ))}
            </div>
            
            <div>
              {users.map( (user) => {
                <>
                <div>{user.email}</div>
               <div>
               <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                    user.selectedRole === "Admin"
                      ? "bg-red-500 text-white" // Red background for admin
                      : user.selectedRole === "Supervisor"
                      ? "bg-yellow-500 text-black" // Yellow background for supervisor
                      : "bg-blue-500 text-white" // Default blue background for other roles
                  }`}
                >
                  {user.selectedRole}
                </span></div>
                </>
                 })}
              </div>
        </div>
    </div> */}
    </>
  );
};

export default TutorTable;
