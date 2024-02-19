import React, { useState, useEffect } from "react";
import axios from "axios";
import SupSidebar from "../../supervisor/pages/SupSidebar";
import DashboardSup from "../../supervisor/pages/DashboardSup";
import Breadcrumb from "../Breadcrumb";
import Dashboard from "../Dashboard";
import { FaEllipsisV, FaRegCalendarMinus } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SupervisorReport = () => {
  const [tutorDenyCount, setTutorDenyCount] = useState(0);
  const [tutorBlacklistCount, setTutorBlacklistCount] = useState(0);
  const [tutorTotalCount, setTutorTotalCount] = useState(0);
  const [tutorAcceptCount, setTutorAcceptCount] = useState(0);

  const data = [
    { name: "Accepted Tutors", count: tutorAcceptCount },
    { name: "Denied Tutors", count: tutorDenyCount },
    { name: "Blacklisted Tutors", count: tutorBlacklistCount },
    { name: "Total Tutors", count: tutorTotalCount },
  ];

  useEffect(() => {
    // Fetch data for tutor deny count
    axios
      .get("/api/report/tutorAcceptCount")
      .then((response) => setTutorAcceptCount(response.data.count))
      .catch((error) =>
        console.error("Error fetching tutor deny count:", error)
      );
    // Fetch data for tutor deny count
    axios
      .get("/api/report/tutorDenyCount")
      .then((response) => setTutorDenyCount(response.data.count))
      .catch((error) =>
        console.error("Error fetching tutor deny count:", error)
      );

    // Fetch data for tutor blacklist count
    axios
      .get("/api/report/tutorBlacklistCount")
      .then((response) => setTutorBlacklistCount(response.data.count))
      .catch((error) =>
        console.error("Error fetching tutor blacklist count:", error)
      );

    // Fetch data for total tutor count
    axios
      .get("/api/report/tutorTotalCount")
      .then((response) => setTutorTotalCount(response.data.count))
      .catch((error) =>
        console.error("Error fetching total tutor count:", error)
      );
  }, []);

  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh]">
        <SupSidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <Dashboard />
        <div className="pt-6 px-6 min-h-screen bg-slate-200 ">
          <div className="flex justify-between">
            <Breadcrumb pageName="Report" />
          </div>
          <div className="flex justify-center">
            <h1>General Report</h1>
          </div>
          <div className="flex mt-[20px] w-full gap-[30px]">
            <div className="basis-[70px] border bg-white shadow-md cursor-pointer rounded-md">
              <div className="bg-slate-100 flex items-center justify-between py-[15px]  px-5 border-b-2 border-slate-400 mb-[15px]">
                <h2>Overviews</h2>
                <FaEllipsisV color="gray" className="cursor-pointer" />
              </div>
              <div>
                <LineChart
                  width={820}
                  height={400}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorReport;
