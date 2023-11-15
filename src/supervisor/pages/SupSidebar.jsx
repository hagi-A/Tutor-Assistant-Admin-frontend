import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight, FaRegCalendarAlt, FaRegChartBar, FaRegSun, FaStickyNote, FaTachometerAlt, FaWrench } from 'react-icons/fa'

const SupSidebar = () => {
  return (
    <div className="bg-cyan-800 min-h-screen px-6">
      <div className="px-4 py-8 flex items-center justify-center border-b-[1px] border-slate-300">
        <h1 className="text-white text-[15px] leading-[24px] font-bold cursor-pointer">
          Supervisor Panal
        </h1>
      </div>
      <div className="flex items-center gap-4 py-5 border-b-[1px] border-slate-300">
        <FaTachometerAlt className="text-white" />
        <button>
          <Link
            to="/supervisorDashboard"
            className="text-md leading-[20px] font-light text-white"
          >
            Dashboard
          </Link>
        </button>
      </div>
      <div className="pt-4 border-b-2 border-slate-300">
        <p className="text-sm font-bold leading-[16px] text-slate-400">
          INTERFACE
        </p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaRegSun className="text-white " />
            <button>
              <Link
                to="/tutorRequest"
                className="text-md leading-[20px] font-light text-white"
              >
                Requests
              </Link>
            </button>
          </div>
          <FaChevronRight className="text-white" />
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaRegChartBar className="text-white " />

            <Link className="text-md leading-[20px] font-light text-white">
              Charts
            </Link>
          </div>
          <FaChevronRight className="text-white" />
        </div>
        {/* <div className="flex items-center gap-[10px]"> */}
        {/* <FaRegCalendarAlt className="text-white " />
                     
                    <Link className="text-md leading-[20px] font-light text-white">Charts</Link>
                </div> */}
      </div>

      <div className="pt-4 border-b-2 border-slate-300">
        <p className="text-sm font-bold leading-[16px] text-slate-400">
          ADDONS
        </p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaStickyNote className="text-white " />

            <Link className="text-md leading-[20px] font-light text-white">
              Components
            </Link>
          </div>
          <FaChevronRight className="text-white" />
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaWrench className="text-white " />

            <Link className="text-md leading-[20px] font-light text-white">
              Utilities
            </Link>
          </div>
          <FaChevronRight className="text-white" />
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaRegCalendarAlt className="text-white " />

            <Link className="text-md leading-[20px] font-light text-white">
              Tables
            </Link>
          </div>
          <FaChevronRight className="text-white" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center pt-[15px] ">
          <div className="h-[40px] w-[40px] bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer">
            <FaChevronLeft color="white" />
          </div>
        </div>
        <div className="bg-cyan-500 mt-4 flex items-center justify-center flex-col py-[15px] px-[10px] gap-[15px] rounded-sm"></div>
      </div>
    </div>
  );
}

export default SupSidebar

