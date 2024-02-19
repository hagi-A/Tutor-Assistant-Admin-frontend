import React, { PureComponent } from "react";
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
import SupPie from "./SupPie";
import { Progress } from 'antd';
import { Link } from "react-router-dom";
// import TutorTable from "../components/TutorTable";


const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const SupMain = () => {
  return (
    <div className="pt-6 px-6 min-h-screen bg-slate-200 ">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-700 text-2xl leading-8 font-light cursor-pointer ">
          Dasboard
        </h1>
        <button className="bg-cyan-800 h-8 rounded-md text-white flex items-center justify-center px-8 cursor-pointer">
          <Link to="/supervisorReport">Generate Report</Link>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-[25px] mt-[20px] pb-[15px]">
        <div className="h-[75px] rounded-lg bg-white border-l-[4px] border-cyan-500 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div className="flex items-center">
            <div className="ml-3">
              <h2 className="text-cyan-500 text-[11px] font-light leading-4">
                Earnings
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-gray-700 mt-1">
                $40,000
              </h1>
              <FaRegCalendarMinus
                fontSize={25}
                className="text-cyan-600 ml-3"
              />
            </div>
          </div>
        </div>
        <div className="h-[75px] rounded-lg bg-white border-l-[4px] border-cyan-500 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div className="ml-3">
            <h2 className="text-cyan-500 text-[11px] font-light leading-4">
              Earnings
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-gray-700 mt-1">
              $40,000
            </h1>
            <FaRegCalendarMinus fontSize={25} className="text-cyan-600" />
          </div>
        </div>
        <div className="h-[75px] rounded-lg bg-white border-l-[4px] border-cyan-500 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div className="ml-3">
            <h2 className="text-cyan-500 text-[11px] font-light leading-4">
              Earnings
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-gray-700 mt-1">
              $40,000
            </h1>
            <FaRegCalendarMinus fontSize={25} className="text-cyan-600" />
          </div>
        </div>
        <div className="h-[75px] rounded-lg bg-white border-l-[4px] border-cyan-500 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div className="ml-3">
            <h2 className="text-cyan-500 text-[11px] font-light leading-4">
              Earnings
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-gray-700 mt-1">
              $40,000
            </h1>
            <FaRegCalendarMinus fontSize={25} className="text-cyan-600" />
          </div>
        </div>
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
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px] ">
          <div className="bg-slate-100 flex items-center justify-between py-[15px] px-5 border-b-1 border-slate-400">
            <h2>Resources</h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="pl-[35px] ">
            <SupPie />
          </div>
        </div>
      </div>

      <div className="flex mt-[22px] w-full gap-[30px] ">
        <div className="basis-[55%] mb-4 border bg-white shadow-md cursor-pointer rounded-md">
          <div className="bg-slate-100  flex items-center justify-between py-[15px] border-b-[1px] border-slate-400  ">
            <h2 className="ml-4 text-cyan-600 text-md leading-[19px] font-light">
              Users
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="px-[25px] space-y-[15px] py-[15px]">
            {/* <div>
                <h2>Server Migration</h2>
                <Progress percent={30} strokeColor="#E74A3B"/>
              </div>
              <div>
                <h2>User Tracking</h2>
                <Progress percent={60} status="active" strokeColor="#543ABF"/>
              </div>
               <div>
                <h2>Customer Database</h2>
                <Progress percent={100} status="exception" strokeColor="#AB4CB2"/>
              </div> */}
            {/* <TutorTable /> */}
          </div>
        </div>
        <div className="basis-[45%] border mb-4 bg-white shadow-md curssor-pointer rounded-md ">
          <div className="bg-slate-100  flex items-center justify-between py-[15px] border-b-[1px] border-slate-400  ">
            <h2 className="ml-4 text-cyan-600 text-md leading-[19px] font-light">
              Resources
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupMain;
