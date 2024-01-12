import React, { useState, useEffect } from "react";
import axios from "axios";
import SupSidebar from "../pages/SupSidebar";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { IoIosAddCircleOutline } from "react-icons/io";
import Dashboard from "../../components/Dashboard";
// import { useTutorContext } from "../../../../hooks/useTutorContext";
// import CourseDetail from "./CourseDetail";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  //   const { tutor } = useTutorContext();
  useEffect(() => {
    // Fetch courses from your API endpoint
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/course/getCourses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const fetchedCourses = await response.json();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  const truncateDescription = (description, maxLength) => {
    return description && description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  return (
    <>
      <div className="flex">
        <div className="basis-[12%] h-[100vh]">
          <SupSidebar />
        </div>
        <div className="basis-[88%] border h-[100vh] overflow-scroll">
          <Dashboard />
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
            {/* <div className="overflow-auto rounded-lg shadow hidden md:block"> */}{" "}
            {/* {truncateDescription(course.courseDescription, 50)} */}
            <section className="">
              <div className="">
                {courses &&
                  courses.map((course) => (
                    <div
                      key={course._id}
                      className="lg:w-1/4 w-full mb-4 p-8 transition duration-300"
                    >
                      {course.courses.map((innerCourse) => (
                        <div key={innerCourse.courseCode}>
                          <div className="p-4 border rounded-lg bg-slate-50 hover:border-cyan-600">
                            <div className="flex justify-between mb-4">
                              <h3 className="text-2xl lg:text-3xl font-light text-center lg:leading-9">
                                {innerCourse.courseTitle}
                              </h3>
                              <h4 className="text-sm lg:text-base font-light leading-5 text-center">
                                {innerCourse.courseCode}
                              </h4>
                            </div>
                            <div className="text-sm lg:text-base description-container">
                              {course.gradeLevel} - {course.package} - $
                              {course.price}
                              <br />
                              {truncateDescription(
                                innerCourse.courseDescription,
                                50
                              )}
                            </div>
                            <button className="bg-cyan-500 text-white rounded-lg w-full h-10 mt-4 cursor-pointer transition duration-300 hover:bg-transparent border hover:text-cyan-500 hover:border-cyan-200">
                              <Link to={`/courses/${course._id}`}>
                                View Details
                              </Link>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
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
