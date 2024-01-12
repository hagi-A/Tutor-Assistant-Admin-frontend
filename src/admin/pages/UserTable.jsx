import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/getUsers")
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-cyan-50 border-b-2 border-cyan-800 ">
            <tr>
              <th className="p-3 text-sm font-light tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-sm font-light tracking-wide text-left">
                User Name
              </th>
              <th className="p-3 text-sm font-light tracking-wide text-left">
                Email
              </th>
              <th className="p-3 text-sm font-light tracking-wide text-left">
                Age
              </th>
              <th className="p-3 text-sm font-light tracking-wide text-left">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                  {user.username}
                </td>
                <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                  {user.age}
                </td>
                <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                      user.selectedRole === "Admin"
                        ? "bg-red-500 text-white" // Red background for admin
                        : user.selectedRole === "Supervisor"
                        ? "bg-yellow-500 text-black" // Yellow background for supervisor
                        : user.selectedRole === "Student"
                        ? "bg-purple-500 text-white" // Purple background for student
                        : user.selectedRole === "Parent"
                        ? "bg-blue-500 text-white" // Blue background for parent
                        : "bg-blue-500 text-white" // Default
                    }`}
                  >
                    {user.selectedRole}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 text-sm">
                {users.map((user, index) => (
                    <>
                    <div>#{index+1}</div>
                    <div>{user.username}</div>
                    <div>{user.age}</div>
                   </>
                ))}
            </div>
            
            <div>
              {users.map( (user) => {
                <>
                <div>{user.email}</div>
               <div>
               <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                    user.selectedRole === "Admin"
                      ? "bg-red-500 text-white" // Red background for admin
                      : user.selectedRole === "Supervisor"
                      ? "bg-yellow-500 text-black" // Yellow background for supervisor
                      : "bg-blue-500 text-white" // Default blue background for other roles
                  }`}
                >
                  {user.selectedRole}
                </span></div>
                </>
                 })}
              </div>
        </div>
    </div> */}
    </>
  );
};

export default UserTable;
