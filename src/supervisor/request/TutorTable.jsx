import React, { useEffect, useState } from "react";
import axios from "axios";
import SupSidebar from "../pages/SupSidebar";
import { Link, useParams } from "react-router-dom";

import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import Breadcrumb from "../../components/Breadcrumb";
import Dashboard from "../../components/Dashboard";

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
          <Dashboard />
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
                      <td
                        className={`p-3 text-sm whitespace-nowrap text-center `}
                      >
                        <span
                          className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                            tutor.status === "Accepted"
                              ? "bg-green-700 text-white bg-opacity-50 rounded-full"
                              : tutor.status === "Blacklisted"
                              ? "bg-red-700 text-white bg-opacity-50 rounded-full"
                              : tutor.status === "Pending"
                              ? "bg-blue-700 text-white bg-opacity-50 rounded-full"
                              : "" // Default or additional cases
                          }`}
                        >
                          {tutor.status}
                        </span>
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
      
    </>
  );
};

export default TutorTable;
