import React, { useState } from "react";
import SupSidebar from "../pages/SupSidebar";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Dashboard from "../../components/Dashboard";

const AddCourse = () => {
  const [addedCourses, setAddedCourses] = useState([]);
  const [some, setSome] = useState([]);
  const [showCourseFields, setShowCourseFields] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  var [newCourse, setNewCourse] = useState({
        courseCode: "dfgdfgdfg",
        courseTitle: "dfgdfgdfg",
        courseDescription: "gdfgdfg",
        courseObjectives: "dfgdfgdfg",
        courseContent: "dfgdfgdf",
  });

  const [courseData, setCourseData] = useState({
    gradeLevel: "",
    package: "",
    price: 0,
    courses: [
    ],

  });

  const handleEdit = (index) => {
    // Set the index of the course being edited
    setEditIndex(index);

    // Populate the form fields with the corresponding course data
    setCourseData({
      gradeLevel: "", // Set as needed
      package: "", // Set as needed
      price: 0, // Set as needed
      courses: [addedCourses[index]],
    });
  };

  const handleDelete = (index) => {
    // Remove the corresponding course from the list
    setAddedCourses((prevCourses) => [
      ...prevCourses.slice(0, index),
      ...prevCourses.slice(index + 1),
    ]);

    // Clear the form fields
    setCourseData({
      gradeLevel: "",
      package: "",
      price: 0,
      courses: [
        {
          courseCode: "",
          courseTitle: "",
          courseDescription: "",
          courseObjectives: "",
          courseContent: "",
        },
      ],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    // newCourse={...newCourse,[name]: value}
    setCourseData((prevData) => {
      const updatedCourses = [...prevData.courses];
      updatedCourses[index] = { ...updatedCourses[index], [name]: value };
      return { ...prevData, courses: updatedCourses };
    });
  };

  const handleCourses = (e) => {
    const { name, value } = e.target;
    newCourse = { ...newCourse, [name]: value }
    
    
  };

  const validateCourseCode = (courseCode) => {
    const { gradeLevel, courses } = courseData;

    // Validate the general format
    const generalFormatPattern = /^G\d{1,2}_[a-zA-Z]+_\d{3}$/;
    if (!generalFormatPattern.test(courseCode)) {
      alert(
        "Invalid Course Code Format. Please follow the format: G1_math_001"
      );
      return false;
    }

    // Extract components from the course code
    const [, enteredGradeLevel, enteredCourseTitle, enteredNumericPart] =
      courseCode.match(/^G(\d{1,2})_([a-zA-Z]+)_(\d{3})$/);

    // Validate the grade level
    if (enteredGradeLevel !== gradeLevel.slice(1)) {
      alert("Grade Level Mismatch in the Course code.");
      return false;
    }

    // Validate the course title uniqueness within the selected grade level
    // const isCourseTitleUnique = addedCourses.every(
    //   (course) =>
    //     course.gradeLevel === gradeLevel &&
    //     course.courseTitle !== enteredCourseTitle
    // );
    // const isCourseTitleUnique = courses.every(
    //   (course) =>
    //     course.courseTitle.toLowerCase() !== enteredCourseTitle.toLowerCase()
    // );

    // Validate the numeric part for uniqueness and increment
    const isNumericPartUnique = !addedCourses.some((course) =>
      course.courseCode.endsWith(enteredNumericPart)
    );
    const isNumericPartIncremental =
      parseInt(enteredNumericPart, 10) ===
      addedCourses.length + 1 + courses.length;

    if (!isNumericPartUnique || !isNumericPartIncremental) {
      if (!isNumericPartUnique) {
        alert("Invalid Numeric Part. The number must be unique.");
      } else {
        const previousCodeNumber = (addedCourses.length + courses.length)
          .toString()
          .padStart(3, "0");
        alert(
          `Invalid Numeric Part. Please make sure that the number increments by 1. The previous code number was ${previousCodeNumber}.`
        );
      }
      return false;
    }
    // if (!isCourseTitleUnique) {
    //   alert("Course Title must be unique within the selected grade level.");
    //   return false;
    // }
    if (enteredCourseTitle !== newCourse.courseTitle.toLowerCase()) {
      alert("Course Title Mismatch in the Course code.");
      return false;
    }
    // All validations passed
    return true;
  };

  const handleAddCourse = () => {
    // Validate the course code before adding the course
    const isCourseCodeValid = validateCourseCode(
      // courseData.courses[0].courseCode
      newCourse.courseCode
    );

    if (!isCourseCodeValid) {
      return;
    }

    // Add the current course to the list of added courses with the unique course code
    // setAddedCourses((prevCourses) => [
    //   ...prevCourses,
    //   {
    //     ...courseData.courses.push(newCourse),
    //     // courseCode: courseData.courses[0].courseCode,
    //   },
    // ]);

    // Reset the input fields for the next course
    setCourseData((prevData) => ({
      ...prevData,
      courses: [courseData.courses.push(newCourse)]
      
    }));

    
    setCourseData((prevData) => {
      const updatedCourses = [...prevData.courses];
      updatedCourses.push(newCourse);
      return { ...prevData, courses: updatedCourses };
    });

    // addedCourses.push(newCourse);


  //  setCourseData((prevData) => {
  //    const updatedData = {
  //      ...prevData,
  //      courses: [
  //        {
  //          courseCode: "",
  //          courseTitle: "",
  //          courseDescription: "",
  //          courseObjectives: "",
  //          courseContent: "",
  //        },
  //      ],
  //    };
    //  console.log("Updated Course Data:", updatedData);
    //  return updatedData;
   
    // console.log(some);
    console.log(courseData);
    console.log(courseData.courses);
    alert("Course added successfully!");
    // } else {
    //   console.error("Complete the last course before adding a new one");
    // }
    setShowCourseFields(false);
  };

  const handleSubmit = async () => {
    try {
      // // Validate the course before submitting
      // const isValidCourse = validateCourseCode(
      //   courseData.courses[0].courseCode
      // );

      // if (!isValidCourse) {
      //   return;
      // }
      console.log("Course Data:", courseData);
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
          <Dashboard />
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
                        <option key={grade + 1} value={`G${grade + 1}`}>
                          G{grade + 1}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Middle School">
                      {[...Array(4).keys()].map((grade) => (
                        <option key={grade + 7} value={`G${grade + 7}`}>
                          G{grade + 7}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="High School">
                      {[...Array(2).keys()].map((grade) => (
                        <option key={grade + 11} value={`G${grade + 11}`}>
                          G{grade + 11}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="College">
                      <option value="CS">Computer Science</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className="text-xl font-light">Package:</label>
                  <select
                    name="package"
                    value={courseData.package}
                    onChange={handleChange}
                    className="w-full mt-3 text-md font-light rounded-xl border border-cyan-900"
                  >
                    <option value="">Select Package</option>
                    <option value="G1Package 1">G1Package 1</option>
                    <option value="G2Package 1">G2Package 1</option>
                    <option value="G3Package 1">G3Package 1</option>
                    <option value="G4Package 1">G4Package 1</option>
                    <option value="G5Package 1">G5Package 1</option>
                    <option value="G6Package 1">G6Package 1</option>
                    <option value="G7Package 1">G7Package 1</option>
                    <option value="G7Package 2">G7Package 2</option>
                    <option value="G8Package 1">G8Package 1</option>
                    <option value="G8Package 2">G8Package 2</option>
                    <option value="G9Package 1">G9Package 1</option>
                    <option value="G9Package 2">G9Package 2</option>
                    <option value="G10Package 1">G10Package 1</option>
                    <option value="G10Package 1">G10Package 1</option>
                    <option value="G11Natural">G11Natural</option>
                    <option value="G11Social">G11Social</option>
                    <option value="G12Natural">G12Natural</option>
                    <option value="G12Social">G12Social</option>
                    <option value="Programming Package">
                      Programming Package
                    </option>

                    {/* Fetch and map the packages from the database */}
                  </select>
                </div>
                <div>
                  <label className="mt-4 text-xl font-light">
                    Price per Hour:
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={courseData.price}
                    onChange={handleChange}
                    className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900"
                  />
                </div>
              </div>
              <div className="border-r-4 border-cyan-900 mx-4 h-full"></div>

              <div className="flex-1">
                {addedCourses.map((addedCourse, index) => (
                  <div
                    key={index}
                    className="border p-4 mb-4 rounded-md bg-white"
                  >
                    <p className="text-xl font-bold">
                      {addedCourse.courseTitle}
                    </p>
                    {/* Display other course details as needed */}
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                ))}
                {showCourseFields && (
                  <div>
                    {/* {courseData.courses.map((course) => ( */}
                    <div>
                      <label className="text-xl font-light">Course Code:</label>
                      <input
                        type="text"
                        name="courseCode"
                        defaultValue={newCourse.courseCode}
                        onChange={(e) => handleCourses(e)}
                        className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900"
                      />
                      <label className="text-xl font-light">
                        Course Title:
                      </label>
                      <input
                        type="text"
                        name="courseTitle"
                        defaultValue={newCourse.courseTitle}
                        onChange={(e) => handleCourses(e)}
                        className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900"
                      />
                      <label className="text-xl font-light">
                        Course Description:
                      </label>
                      <input
                        type="text"
                        name="courseDescription"
                        defaultValue={newCourse.courseDescription}
                        onChange={(e) => handleCourses(e)}
                        className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900"
                      />
                      <label className="text-xl font-light">
                        Course Objectives:
                      </label>
                      <input
                        type="text"
                        name="courseObjectives"
                        defaultValue={newCourse.courseObjectives}
                        onChange={(e) => handleCourses(e)}
                        className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900"
                      />
                      <label className="text-xl font-light">
                        Course Content:
                      </label>
                      <input
                        type="text"
                        name="courseContent"
                        defaultValue={newCourse.courseContent}
                        onChange={(e) => handleCourses(e)}
                        className="w-full h-[40px] mt-3 text-md font-light rounded-xl border border-cyan-900"
                      />
                      {/* Add other input fields for course details */}
                    </div>
                    {/* ))} */}
                    {/* Add Course button */}
                    <button onClick={handleAddCourse}>Add</button>
                  </div>
                )}
                <div className="flex justify-center mt-7 mb-7">
                  <button onClick={() => setShowCourseFields(true)}>
                    <div className="flex justify-center text-xl border border-cyan-600 rounded-lg p-4">
                      Add Course
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-4">
              <button
                onClick={handleSubmit}
                className="p-3 rounded-full text-xl text-white bg-cyan-700 border hover:border-cyan-900 hover:bg-transparent hover:text-black"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* // </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default AddCourse;
