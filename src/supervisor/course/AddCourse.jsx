import React, { useState } from "react";
import SupSidebar from "../pages/SupSidebar";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
// import { useParams } from "react-router-dom";
// import { TutorContext } from "../../../context/TutorContext"
// import { useTutorContext } from "../../../../hooks/useTutorContext";

const AddCourse = () => {
  // const TutorContext = useContext(TutorContext);

//   const { tutor } = useTutorContext();
//   const tutorId = tutor ? tutor.tutor._id : null;
  const [courseData, setCourseData] = useState({
    courseCode: "",
    courseTitle: "",
    courseDescription: "",
    courseObjectives: "",
    courseContent: "",
    // grade: "",
    // tutor: tutorId, // You can include tutorId here if needed
    price: 0, // Default value, adjust as needed
    resourse: "", // Corrected typo in property name to "resource"
    gradeLevel: "",
  });
  // const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Assuming you have an API endpoint for creating a course
      const response = await fetch(`/api/course/addCourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
    //   console.log(tutor.tutor._id);
      if (!response.ok) {
        throw new Error("Failed to create course");
      }
      console.log("trrrryyyy");
      // Optionally, you can handle the response or redirect the user
      const createdCourse = await response.json();
      console.log(createdCourse);
    } catch (error) {
      // console.log(tutor.tutor._id);
      console.log("catchhhhh");
      console.log(error);
      console.error("Error creating course:", error.message);
    }
  };

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
            <div className="">
              <Breadcrumb pageName="Courses" subPageName="/ Add Course" />
            </div>
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <div className=" w-full bg-slate-100 border border-cyan-900 h-[50%] rounded-lg">
                {/* <div className="flex justify-between m-7 p-7">
                  <form onSubmit={handleSubmit} className="flex "> */}
                {/* Left Section */}
                <div className="flex-1  w-full">
                  {/* Course Details Section */}
                  <div>
                    <label className="text-xl font-light ">Course Code:</label>
                    <input
                      type="text"
                      name="courseCode"
                      value={courseData.courseCode}
                      onChange={handleChange}
                      className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900 "
                    />
                  </div>
                  <div>
                    <label className="text-xl font-light ">Course Title:</label>
                    <input
                      type="text"
                      name="courseTitle"
                      value={courseData.courseTitle}
                      onChange={handleChange}
                      className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900 "
                    />
                  </div>
                  <div>
                    <label className="text-xl font-light ">
                      Course Description:
                    </label>
                    <textarea
                      name="courseDescription"
                      value={courseData.courseDescription}
                      onChange={handleChange}
                      className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900 "
                    />
                  </div>
                  {/* Learning Resources Section */}
                  <div>
                    <label className="text-xl font-light ">
                      Course Objectives:
                    </label>
                    <textarea
                      //   type="text"
                      name="courseObjectives"
                      value={courseData.courseObjectives}
                      onChange={handleChange}
                      className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900 "
                    />
                  </div>

                  {/* Assessment Section */}
                  <div>
                    <label className="text-xl font-light ">
                      Course Contents:
                    </label>
                    <textarea
                      name="courseContent"
                      value={courseData.courseContent}
                      onChange={handleChange}
                      className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900 "
                    />
                  </div>
                </div>
                <div className="">
                  <label className="text-xl font-light">Grade Level:</label>
                  <select
                    name="gradeLevel"
                    value={courseData.gradeLevel}
                    onChange={handleChange}
                    className="w-full mt-3 text-md font-light rounded-xl border border-cyan-900"
                  >
                    <option value="">Select Grade</option>
                    <optgroup label="Elementary">
                      {[...Array(6).keys()].map((grade) => (
                        <option key={grade + 1} value={(grade + 1).toString()}>
                          Grade {grade + 1}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Middle School">
                      {[...Array(4).keys()].map((grade) => (
                        <option key={grade + 7} value={(grade + 7).toString()}>
                          Grade {grade + 7}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="High School">
                      {[...Array(2).keys()].map((grade) => (
                        <option
                          key={grade + 11}
                          value={(grade + 11).toString()}
                        >
                          Grade {grade + 11}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="College">
                      <option value="CS">CS</option>
                    </optgroup>
                  </select>
                </div>
                {/* Vertical Line Border */}
                <div className="border-r-4 border-cyan-900 mx-4 h-full"></div>
                {/* Right Section */}
                <div className="flex-1">
                  {/* Learning Objectives Section */}
                  {/* <div className="">
                    <label className="text-xl font-light">Grade:</label>
                    <select
                      name="grade"
                      value={courseData.grade}
                      onChange={handleChange}
                      className="w-full mt-3 text-md font-light rounded-xl border border-cyan-900"
                    >
                      <option value="">Select Grade</option>
                      {[...Array(12).keys()].map((grade) => (
                        <option key={grade + 1} value={(grade + 1).toString()}>
                          Grade {grade + 1}
                        </option>
                      ))}
                      <option value="CS">CS</option>
                    </select>
                  </div> */}

                  {/* Target Audience Section */}
                  <div>
                    <label className="mt-4 text-xl font-light">
                      Price per Hour:
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleChange}
                      className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900 "
                    />
                  </div>
                  <div>
                    <label className="mt-5 text-xl font-light">Resourse:</label>
                    <input
                      type="text"
                      name="resourse"
                      value={courseData.resourse}
                      onChange={handleChange}
                      className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900 "
                    />
                  </div>
                </div>{" "}
                {/* </form> */}
              </div>
              <div className="flex justify-center m-4">
                <button
                  onClick={handleSubmit}
                  className="border border-cyan-900 "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default AddCourse;
