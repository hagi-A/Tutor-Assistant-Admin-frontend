import React, { useState, useEffect } from "react";
import axios from "axios";
import SupSidebar from "../pages/SupSidebar";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { IoIosAddCircleOutline } from "react-icons/io";
// import { useTutorContext } from "../../../../hooks/useTutorContext";
// import CourseDetail from "./CourseDetail";

const Courses = () => {
  const [courses, setCourses] = useState();
  const [selectedCourse, setSelectedCourse] = useState(null);
  //   const { tutor } = useTutorContext();
  const fetchCourses = async () => {
    try {
      //   const tutorId = tutor.tutor._id;

      // Modify the URL or use a query parameter to include the tutor's ID
      const response = await axios.get("/getCourses");

      //   console.log("Tutor ID:", tutor.tutor.firstName);

      console.log("Response from server:", response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  useEffect(() => {
    // if (tutor && tutor.tutor._id) {
    fetchCourses();
    // }
  }, []);

  function truncateDescription(description, maxLength) {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substring(0, maxLength) + "...";
    }
  }

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
            <div className="flex justify-between">
              <Breadcrumb pageName="Courses" />
              <button className="flex justify-between border border-cyan-800 text-white text-lg font-light bg-cyan-600 p-2 rounded-full ">
                <IoIosAddCircleOutline className="text-2xl mr-2" />
                <Link to={`/addCourse`}>Add Course</Link>
              </button>
            </div>
            {/* <div className="mt-4 overflow-auto rounded-lg shadow hidden md:block"> */}
            {/* <div className="mt-5 w-full bg-slate-100 border border-cyan-900 h-[50%] rounded-lg"> */}
            {/* <div className="overflow-auto rounded-lg shadow hidden md:block"> */}
            <section className="md:px-5 mt-5 min-h-screen flex flex-col-4">
              <div className="mt-4 max-w-full w-full">
                <div className="p-3 mt-4 lg:flex lg:flex-wrap md:flex lg:justify-between rounded-lg flex justify-center items-center">
                  {courses &&
                    courses.map((course) => (
                      <div
                        key={course._id}
                        className=" lg:w-1/4 w-full p-8 justify-center transition duration-300"
                      >
                        <div className="p-4 border rounded-lg bg-slate-50 hover:border-cyan-600">
                          <div className="flex justify-between mb-4">
                            <h3 className="text-2xl lg:text-3xl font-light text-center lg:leading-9">
                              {course.courseTitle}
                            </h3>
                            <h4 className="text-sm lg:text-base font-light leading-5 text-center">
                               {course.courseCode}
                            </h4>
                          </div>
                          <div className="text-sm lg:text-base description-container">
                            {truncateDescription(course.courseDescription, 50)}
                          </div>
                          <button className="bg-cyan-500 text-white rounded-lg w-full h-10 mt-4 cursor-pointer transition duration-300 hover:bg-transparent border hover:text-cyan-500 hover:border-cyan-200">
                            <Link
                              to={`/courses/${course._id}`}
                              onClick={() => setSelectedCourse(course)}
                            >
                              View Details
                            </Link>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div>
        {/* Course Detail component */}
        {/* <CourseDetail courseData={selectedCourse} /> */}
      </div>
    </>
  );
};

export default Courses;
