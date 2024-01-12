import React, { useEffect, useState } from "react";
import SupSidebar from "../pages/SupSidebar";
import {
  FaCheckCircle,
  FaEnvelope,
  FaRegBell,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import Breadcrumb from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaFilePdf, FaTentArrowLeftRight, FaX } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../components/toastUtils";
import DenyModal from "../../components/DenyModal";
import BlacklistModal from "../../components/BlacklistModal";
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import Dashboard from "../../components/Dashboard";

const TutorProfileMgt = ({ match }) => {
  const [openDeny, setOpenDeny] = useState(false);
  const [openBlacklist, setOpenBlacklist] = useState(false);
  const [tutor, setTutor] = useState(null);
  const [rank, setRank] = useState(() => {
    const storedRank = localStorage.getItem("rank");
    return storedRank ? parseInt(storedRank, 10) : 1; // Use a default value if not present
  });
  const { id } = useParams(); // Access the tutorId parameter from the URL
  const gradeLevel = [
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
    "G7",
    "G8",
    "G9",
    "G10",
    "G11",
    "G12",
    "Collage",
  ];
  const [updatedGradeLevels, setUpdatedGradeLevels] = useState([]);
  const [denialReasons, setDenialReasons] = useState({
    credentialsError: false,
    missingAttachment: false,
  });

  // State to track if the tutor is blacklisted
  const [isBlacklisted, setIsBlacklisted] = useState(false);

  // State to track if the overlay should be shown
  const [showOverlay, setShowOverlay] = useState(false);

  //   console.log(id);
  useEffect(() => {
    // Fetch tutor data based on the ID from the route
    if (id) {
      // Fetch tutor data based on the ID from the route
      const fetchTutorData = async () => {
        try {
          const response = await fetch(`/api/supervisor/tutorProfile/${id}`);
          const data = await response.json();
          setTutor(data);
        } catch (error) {
          console.error("Error fetching tutor data:", error);
        }
      };

      fetchTutorData();
    }
  }, [id]);

  // Update localStorage whenever rank changes
  useEffect(() => {
    localStorage.setItem("rank", rank.toString());
  }, [rank]);

  // Handler for rank change
  const handleRankChange = (event) => {
    const selectedRank = parseInt(event.target.value, 10);
    setRank(selectedRank);
  };

  // Function to accept action for a tutor
  const acceptAction = async (id) => {
    try {
      await axios.put(`/api/tutor/tutor-requests/${id}/accept`);
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
      const updatedRequests = tutor.map((tutor) => {
        if (tutor._id === id) {
          return { ...tutor, status: "Accepted" };
        }
        return tutor;
      });
      setTutor(updatedRequests);
    } catch (error) {
      console.error("Error accepting action:", error);
    }
    alert("Tutor Request is Accepted Successfully");
    alert("Email is Sent");
  };

  // Function to deny action for a tutor
  const blacklistAction = async (id, denialReasons) => {
    try {
      await axios.put(`/api/tutor/tutor-requests/${id}/blacklist`, {
        denialReasons,
      });
      // Update the local state if the backend operation is successful
      console.log(denialReasons);
      const updatedRequests = tutor.map((tutor) => {
        if (tutor._id === id) {
          return { ...tutor, status: "Blacklisted", denialReasons };
        }
        return tutor;
        // alert("Tutor Request is Denied insideeeeee", "info");
      });
      setTutor(updatedRequests);
      // // Close the modal
      // setOpen(true);
      // Set the tutor as blacklisted
      setIsBlacklisted(true);

      // // Show the overlay
      // setShowOverlay(true);
    } catch (error) {
      console.error("Error denying action:", error);
      alert("Error denying tutor request", "error");
    }

    alert("Tutor Request is Blacklisted");
  };

  const denyAction = async (id, denialReasons) => {
    try {
      await axios.put(`/api/tutor/tutor-requests/${id}/deny`, {
        denialReasons,
      });
      // Update the local state if the backend operation is successful
      console.log(denialReasons);
      const updatedRequests = tutor.map((tutor) => {
        if (tutor._id === id) {
          return { ...tutor, status: "Denied", denialReasons };
        }
        return tutor;
      });
      setTutor(updatedRequests);
      FaTentArrowLeftRight("Tutor Request is Balcklisted", "info");
      // // Close the modal
      // setOpen(true);
      // Set the tutor as blacklisted
      // setIsBlacklisted(true);
      alert("Tutor Request is Denied insideeeeee");
      // // Show the overlay
      // setShowOverlay(true);
    } catch (error) {
      console.error("Error denying action:", error);
      alert("Error denying tutor request");
    }
  };
  useEffect(() => {
    // Check local storage if the tutor is blacklisted
    const isBlacklistedFromStorage = localStorage.getItem("isBlacklisted");
    if (isBlacklistedFromStorage) {
      setIsBlacklisted(true);
      setShowOverlay(true);
    }
  }, []);

  const handleGradeLevelChange = (event) => {
    const { value } = event.target;

    // Update the local state first
    setTutor((prevTutor) => {
      console.log("Prev Tutor:", prevTutor);
      // if (!prevTutor || !prevTutor.gradeLevel) {
      //   // Handle the case when prevTutor or prevTutor.gradeLevel is undefined
      //   return prevTutor;
      // }
      const updatedGradeLevels = prevTutor.gradeLevel.includes(value)
        ? prevTutor.gradeLevel.filter((level) => level !== value)
        : [...prevTutor.gradeLevel, value];

      // Set the updatedGradeLevels state
      setUpdatedGradeLevels(updatedGradeLevels);

      return { ...prevTutor, gradeLevel: updatedGradeLevels };
    });
  };
  const handleCheckboxChange = (reason) => {
    setDenialReasons((prev) => ({ ...prev, [reason]: !prev[reason] }));
  };

  const saveUpdates = async () => {
    // Make an API call to update both rank and gradeLevels
    try {
      const response = await fetch(
        `/api/tutor/updateTutorProfile/${tutor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rank, gradeLevel: updatedGradeLevels }),
        }
      );

      if (response.ok) {
        // Handle successful update
        console.log("Rank and gradeLevels updated successfully");
        alert("Tutor Profile is Updated Successfully", "success");
      } else {
        // Handle error
        console.error("Failed to update rank and gradeLevels");
      }
    } catch (error) {
      console.error("Error updating rank and gradeLevels:", error);

      alert("Tutor Profile is not Updated ", "error");
    }
  };
  // const handleGradeLevelChange = async (event) => {
  //   const { value } = event.target;

  //   try {
  //     // Update the local state first
  //     setTutor((prevTutor) => {
  //       const updatedGradeLevels = prevTutor.gradeLevel.includes(value)
  //         ? prevTutor.gradeLevel.filter((level) => level !== value)
  //         : [...prevTutor.gradeLevel, value];

  //       // Set the updatedGradeLevels state
  //       setUpdatedGradeLevels(updatedGradeLevels);

  //       return { ...prevTutor, gradeLevel: updatedGradeLevels };
  //     });

  //     // Make API call to update the tutor's data in the database
  //     const response = await fetch(`/api/updateTutorGradeLevel/${tutor._id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ gradeLevel: updatedGradeLevels }),
  //     });

  //     if (!response.ok) {
  //       console.error("Failed to update tutor grade level in the database");
  //       // Optionally, you can roll back the local state change on failure
  //     }
  //   } catch (error) {
  //     console.error("Error updating tutor grade level:", error);
  //     // Optionally, you can roll back the local state change on failure
  //   }
  // };

  return (
    <>
      <div className="flex">
        <div className="basis-[12%] h-[100vh]">
          <SupSidebar />
        </div>
        <div className="basis-[88%] border h-[100vh] overflow-scroll">
          <Dashboard />
          <div className="pt-6 px-6 min-h-screen bg-slate-200 ">
            <Breadcrumb pageName="Tutor Profile" />
            {tutor && (
              <div className="flex flex-col md:flex-row gap-3 p-3 h-screen ">
                <div className="basis-[30%] flex-row gap-3">
                  <div className=" w-full bg-slate-100 border border-cyan-900 h-[50%] rounded-lg">
                    <div className="font-light text-2xl text-center mt-3  text-cyan-900">
                      {tutor.firstName} {tutor.lastName}
                    </div>
                    <div className="flex justify-center">
                      <img
                        src={`http://localhost:9999/api/files/images/${tutor.selectedImages}`} // Replace with the actual image URL
                        alt={tutor.firstName}
                        className="w-72 h-72 mt-10   object-cover rounded-xl bg-slate-200 p-2 "
                      />
                    </div>
                    {/* <div className="flex  justify-center p-3 mt-3">
                      <button className="text-4xl text-center text-green-700">
                        <FaCheckCircle />
                      </button>
                      <button className="ml-3 text-4xl text-center text-red-700">
                        <FaX />
                      </button>
                    </div> */}
                  </div>
                  <div className="flex mt-7 ml-20 gap-4">
                    <button
                      onClick={() => acceptAction(tutor._id)}
                      className="p-2 rounded-xl border border-green-500 hover:bg-green-500 hover:text-white text-black "
                    >
                      Accept
                    </button>
                    <button
                      // onClick={() => denyAction(tutor._id)}
                      onClick={() => setOpenDeny(true)}
                      className="ml-2 p-2 rounded-xl border border-red-500 hover:bg-red-500 hover:text-white text-black "
                    >
                      Deny
                    </button>
                    <button
                      // onClick={() => denyAction(tutor._id)}
                      onClick={() => setOpenBlacklist(true)}
                      className="ml-2 p-2 rounded-xl border border-cyan-500 hover:bg-cyan-500 hover:text-white text-black "
                    >
                      Blacklist
                    </button>
                  </div>
                  <BlacklistModal
                    open={openBlacklist}
                    onClose={() => setOpenBlacklist(false)}
                  >
                    <div className="text-center w-56">
                      <FaTrash size={56} className="mx-auto text-cyan-500" />
                      <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">
                          Blacklist Tutor
                        </h3>
                        <p className="text-gray-500">
                          Enter reasons for blacklisting{" "}
                          <span className="text-md text-cyan-600 ">
                            {tutor.firstName}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center ml-3">
                          <input
                            type="checkbox"
                            id="credentialsError"
                            value="credentialsError"
                            checked={denialReasons.credentialsError}
                            onChange={(e) =>
                              setDenialReasons((prev) => ({
                                ...prev,
                                credentialsError: e.target.checked,
                              }))
                            }
                          />
                          <label className="ml-3">Credentials Error</label>
                        </div>
                        <div className="flex items-center ml-3">
                          <input
                            type="checkbox"
                            id="missingAttachment"
                            value="missingAttachment"
                            checked={denialReasons.missingAttachment}
                            onChange={(e) =>
                              setDenialReasons((prev) => ({
                                ...prev,
                                missingAttachment: e.target.checked,
                              }))
                            }
                          />
                          <label className="ml-3">Missing Attachment</label>
                        </div>
                        <div className="my-4">
                          <label className="text-sm font-light">
                            Additional Reasons:
                          </label>
                          <textarea
                            name="additionalReasons"
                            value={denialReasons.additionalReasons}
                            onChange={(e) =>
                              setDenialReasons((prev) => ({
                                ...prev,
                                additionalReasons: e.target.value,
                              }))
                            }
                            className="w-full mt-3 text-md font-light rounded-xl border border-cyan-900"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          className="w-full h-10px border hover:border-cyan-600 rounded-full"
                          onClick={() => {
                            if (
                              Object.values(denialReasons).some(
                                (reason) => reason
                              )
                            ) {
                              blacklistAction(tutor._id, denialReasons);
                            } else {
                              alert("Please select at least one reason.");
                            }
                          }}
                        >
                          Blacklist
                        </button>
                        <button
                          className="w-full hover:bg-blue-500 hover:text-white rounded-full"
                          onClick={() => setOpenBlacklist(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </BlacklistModal>

                  <DenyModal open={openDeny} onClose={() => setOpenDeny(false)}>
                    <div className="text-center w-56">
                      <FaTimes size={56} className="mx-auto text-red-500" />
                      <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">
                          Deny Tutor
                        </h3>
                        <p className="text-gray-500">
                          Enter reason for denying{" "}
                          <span className="text-md text-red-600 ">
                            {tutor.firstName}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center ml-3">
                          <input
                            type="checkbox"
                            id="fraudulent"
                            value="fraudulent"
                            checked={denialReasons.fraudulent}
                            onChange={(e) =>
                              setDenialReasons((prev) => ({
                                ...prev,
                                fraudulent: e.target.checked,
                              }))
                            }
                          />
                          <label className="ml-3">Fraudulent Activity</label>
                        </div>
                        <div className="flex items-center ml-3">
                          <input
                            type="checkbox"
                            id="lowPerformance"
                            value="lowPerformance"
                            checked={denialReasons.lowPerformance}
                            onChange={(e) =>
                              setDenialReasons((prev) => ({
                                ...prev,
                                lowPerformance: e.target.checked,
                              }))
                            }
                          />
                          <label className="ml-3">Low Performance</label>
                        </div>
                        <div className="flex items-center ml-3">
                          <input
                            type="checkbox"
                            id="violationOfPolicies"
                            value="violationOfPolicies"
                            checked={denialReasons.violationOfPolicies}
                            onChange={(e) =>
                              setDenialReasons((prev) => ({
                                ...prev,
                                violationOfPolicies: e.target.checked,
                              }))
                            }
                          />
                          <label className="ml-3">Violation of Policies</label>
                        </div>
                        <div className="flex items-center ml-3">
                          <input
                            type="checkbox"
                            id="plagiarism"
                            value="plagiarism"
                            checked={denialReasons.plagiarism}
                            onChange={(e) =>
                              setDenialReasons((prev) => ({
                                ...prev,
                                plagiarism: e.target.checked,
                              }))
                            }
                          />
                          <label className="ml-3">Plagiarism</label>
                        </div>
                      </div>
                      <div className="my-4">
                        <label className="text-sm font-light">
                          Additional Reasons:
                        </label>
                        <textarea
                          name="additionalReasons"
                          value={denialReasons.additionalReasons}
                          onChange={(e) =>
                            setDenialReasons((prev) => ({
                              ...prev,
                              additionalReasons: e.target.value,
                            }))
                          }
                          className="w-full mt-3 text-md font-light rounded-xl border border-cyan-900"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          className="w-full border hover:border-red-600 rounded-full"
                          onClick={() => denyAction(tutor._id, denialReasons)}
                        >
                          Deny
                        </button>
                        <button
                          className="w-full hover:bg-blue-500 hover:text-white rounded-full"
                          onClick={() => setOpenDeny(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </DenyModal>
                  {/* Overlay for blacklisted tutors */}
                  {/* {showOverlay && (
                    <div className="overlay bg-black bg-opacity-50">
                      <p className="blacklisted-text text-red-700 text-3xl">
                        Blacklisted
                      </p>
                    </div>
                  )} */}
                  {/* <div className=" w-full bg-cyan-300 h-[30%] mt-3 rounded-lg">
                  row 2
                </div> */}
                </div>
                <div className="basis-[70%] ">
                  <div className=" w-full bg-slate-100 border border-cyan-900 h-[80%] rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-7 p-7">
                      {/* Display additional details */}
                      <div>
                        <label className="text-xl font-semibold ">Email:</label>
                        <label className="w-full ml-7 h-[40px] mt-3 text-lg font-light ">
                          {tutor.email}
                        </label>
                      </div>
                      <div>
                        <label className="text-xl font-semibold ">Age:</label>
                        <label className="w-full ml-7 h-[40px] mt-3 text-lg font-light ">
                          {tutor.age}
                        </label>
                      </div>
                      <div className="mt-6">
                        <label className="text-xl mt-5 font-semibold ">
                          Gender:
                        </label>
                        <label className="w-full ml-7 h-[40px] mt-3 text-lg font-light ">
                          {tutor.gender}
                        </label>
                      </div>
                      <div className="mt-6">
                        <label className="text-xl mt-5 font-semibold">
                          Profession:
                        </label>
                        <label className="w-full ml-7 h-[40px] mt-3 text-lg font-light ">
                          {tutor.profession}
                        </label>
                      </div>
                      <div className="mt-6">
                        <label className="text-xl mt-5 font-semibold">
                          Location:
                        </label>
                        <label className="w-full ml-7 h-[40px] mt-3 text-lg font-light ">
                          {tutor.location}
                        </label>
                      </div>
                      <div className="mt-6">
                        <label className="text-xl font-semibold">
                          Phone Number:
                        </label>
                        <label className="w-full ml-7 h-[40px] mt-3 text-lg font-light ">
                          {tutor.phoneNumber}
                        </label>
                      </div>
                      <div className="mt-6">
                        <label className="text-xl font-semibold">
                          Major Taken:
                        </label>
                        <label className="w-full ml-7 h-[40px] mt-3 text-lg font-light ">
                          {tutor.profession}
                        </label>
                      </div>
                      <div className="mt-6">
                        <label className="text-xl font-semibold">
                          Selected Courses:
                        </label>
                        <label className="w-full ml-7 h-[40px] mt-3 text-lg font-light ">
                          {tutor.courses}{" "}
                        </label>
                      </div>
                      {/* <div className="mt-6">
                        <label className="text-xl font-light">
                          Price per Hour:
                        </label>
                        <input
                          id="priceRate"
                          value={tutor.priceRate}
                          className="w-full h-[40px] mt-3  text-lg font-light rounded-xl border border-cyan-900 "
                        />
                      </div> */}
                      <div className="flex flex-row gap-4 mt-6">
                        <label className="text-xl font-semibold">CV:</label>
                        {/* Display the CV here */}
                        {/* <embed
                          src={`http://localhost:9999/api/files/images/${tutor.selectedCVs}`}
                          type="application/pdf"
                          width="100%"
                          height="600px"
                        /> */}
                        <a
                          href={
                            "http://localhost:9999/api/files/images/" +
                            tutor.selectedCVs
                          }
                          target="_blank"
                          className="flex flex-row m-2 text-red-900 gap-2"
                        >
                          <FaFilePdf />
                          {tutor.selectedCVs}
                        </a>
                      </div>

                      <div className="mt-6">
                        <label htmlFor="rank" className="text-xl font-semibold">
                          Rank:
                        </label>
                        <div className="mt-3 space-x-4">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <label
                              key={value}
                              className="inline-flex items-center"
                            >
                              <input
                                type="radio"
                                id={`rank${value}`}
                                name="rank"
                                value={value}
                                checked={rank === value}
                                onChange={handleRankChange}
                                className="text-lg font-light border border-cyan-900 rounded-xl"
                              />
                              <span className="ml-2 text-md">{value}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="text-xl font-semibold">
                          Tutoring Grade Level:
                        </label>
                        <div className="flex flex-wrap flex-row">
                          {gradeLevel.map((level) => (
                            <div key={level} className="flex mt-3 items-center">
                              <input
                                type="checkbox"
                                id={level}
                                value={level}
                                checked={
                                  tutor &&
                                  tutor.gradeLevel &&
                                  tutor.gradeLevel.includes(level)
                                }
                                onChange={handleGradeLevelChange}
                              />
                              <label
                                htmlFor={level}
                                className="grid grid-cols-2 text-lg font-light ml-2 "
                              >
                                {level}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mb-6">
                      <button
                        onClick={saveUpdates}
                        className="text-2xl font-light p-3 border border-teal-500 bg-cyan-700 text-white rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring focus:border-teal-300"
                      >
                        Save Updates
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorProfileMgt;
