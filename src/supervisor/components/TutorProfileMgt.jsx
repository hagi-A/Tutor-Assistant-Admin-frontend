import React, { useEffect, useState } from "react";
import SupSidebar from "../pages/SupSidebar";
import { FaCheckCircle, FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import Breadcrumb from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaFilePdf, FaX } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../components/toastUtils";

const TutorProfileMgt = ({ match }) => {
  const [tutor, setTutor] = useState(null);
  const [rank, setRank] = useState(() => {
    const storedRank = localStorage.getItem("rank");
    return storedRank ? parseInt(storedRank, 10) : 1; // Use a default value if not present
  });
  const { id } = useParams(); // Access the tutorId parameter from the URL
  const gradeLevel = [
    "Kindergarten",
    "Elementary",
    "Middle School",
    "High School",
    "College",
  ];
  const [updatedGradeLevels, setUpdatedGradeLevels] = useState([]);

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
      showToast("Tutor Request is Accepted Successfully", "success");
      showToast("Email is Sent", "info");
    } catch (error) {
      console.error("Error accepting action:", error);
    }
  };

  // Function to deny action for a tutor
  const denyAction = async (id) => {
    try {
      await axios.put(`/api/tutor/tutor-requests/${id}/deny`);
      const updatedRequests = tutor.map((tutor) => {
        if (tutor._id === id) {
          return { ...tutor, status: "Denied" };
        }
        return tutor;
      });
      setTutor(updatedRequests);
      showToast("Tutor Request is Denied", "info");
    } catch (error) {
      console.error("Error denying action:", error);
    }
  };

  const handleGradeLevelChange = (event) => {
    const { value, checked } = event.target;

    // Update the local state first
    setTutor((prevTutor) => {
      const updatedGradeLevels = prevTutor.gradeLevel.includes(value)
        ? prevTutor.gradeLevel.filter((level) => level !== value)
        : [...prevTutor.gradeLevel, value];

      // Set the updatedGradeLevels state
      setUpdatedGradeLevels(updatedGradeLevels);

      return { ...prevTutor, gradeLevel: updatedGradeLevels };
    });
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
showToast("Tutor Profile is Updated Successfully", "success");
      if (response.ok) {
        // Handle successful update
        console.log("Rank and gradeLevels updated successfully");
        
      } else {
        // Handle error
        console.error("Failed to update rank and gradeLevels");
      }
    } catch (error) {
      console.error("Error updating rank and gradeLevels:", error);

      showToast("Tutor Profile is not Updated ", "error");
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
                    <div className="flex  justify-center p-3 mt-3">
                      <button className="text-4xl text-center text-green-700">
                        <FaCheckCircle />
                      </button>
                      <button className="ml-3 text-4xl text-center text-red-700">
                        <FaX />
                      </button>
                    </div>
                  </div>
                  <div className="flex mt-7 ml-36 gap-4">
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
                  {/* <div className=" w-full bg-cyan-300 h-[30%] mt-3 rounded-lg">
                  row 2
                </div> */}
                </div>
                <div className="basis-[70%] ">
                  <div className=" w-full bg-slate-100 border border-cyan-900 h-[80%] rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-7 p-7">
                      {/* Display additional details */}
                      <div>
                        <label className="text-xl font-light ">Email:</label>
                        <input
                          id="email"
                          value={tutor.email}
                          className="w-full h-[40px] mt-3 text-lg font-light rounded-xl border border-cyan-900 "
                        />
                      </div>
                      <div>
                        <label className="text-xl font-light">
                          Profession:
                        </label>
                        <input
                          id="profession"
                          value={tutor.profession}
                          className="w-full h-[40px] mt-3 text-lg font-light rounded-xl border border-cyan-900 "
                        />
                      </div>
                      <div className="mt-6">
                        <label className="text-xl mt-5 font-light">
                          Location:
                        </label>
                        <input
                          id="location"
                          value={tutor.location}
                          className="w-full h-[40px] mt-3 text-lg font-light rounded-xl border border-cyan-900 "
                        />
                      </div>
                      <div className="mt-6">
                        <label className="text-xl font-light">
                          Phone Number:
                        </label>
                        <input
                          id="phoneNumber"
                          value={tutor.phoneNumber}
                          className="w-full h-[40px] mt-3 text-lg font-light rounded-xl border border-cyan-900 "
                        />
                      </div>
                      <div className="mt-6">
                        <label className="text-xl font-light">
                          Major Taken:
                        </label>
                        <input
                          id="majorTaken"
                          value={tutor.majorTaken}
                          className="w-full h-[40px] mt-3 text-lg font-light rounded-xl border border-cyan-900 "
                        />
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
                      <div className="flex flex-row m-3 gap-4 mt-6">
                        <label className="text-xl font-light">CV:</label>
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
                        <label htmlFor="rank" className="text-xl font-light">
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
                        <label className="text-xl font-light">
                          Tutoring Grade Level:
                        </label>

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
