import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { admin: action.payload };
    case "LOGOUT":
      return { admin: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    admin: null,
  });

  const [admin, setAdmin] = useState(null);
  const setAdminData = (data) => {
    setAdmin(data);
    dispatch({ type: "LOGIN", payload: data });
  };

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    console.log(setAdminData);

    if (storedAdmin) {
      setAdmin(storedAdmin);
      dispatch({ type: "LOGIN", payload: storedAdmin });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  //   useEffect(() => {
  //     const user = JSON.parse(localStorage.getItem("user"));

  //     if (user) {
  //       dispatch({ type: "LOGIN", payload: user });
  //     }
  //   }, []);

  console.log("AuthContext state: ", state);

  return (
    // <AuthContext.Provider value={{ ...state, dispatch }}>
    //   {children}
    // </AuthContext.Provider>
    <AuthContext.Provider value={{ admin, setAdmin }}>
      {children}
      {/* //{" "} */}
    </AuthContext.Provider>
  );
};

// export const TutorContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(tutorReducer, {
//     tutor: null,
//   });

//   const [tutor, setTutor] = useState(null);
//   const setTutorData = (data) => {
//     setTutor(data);
//     dispatch({ type: "LOGIN", payload: data });
//   };
//   useEffect(() => {
//     const storedTutor = JSON.parse(localStorage.getItem("tutor"));
//     console.log(setTutorData);

//     if (storedTutor) {
//       setTutor(storedTutor);
//       dispatch({ type: "LOGIN", payload: storedTutor });
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tutor", JSON.stringify(tutor));
//   }, [tutor]);
//   console.log("TutorContext state: ", state);

//   return (
//     // <TutorContext.Provider value={{ ...state, dispatch }}>
//     //   {children}
//     // </TutorContext.Provider>
//     <TutorContext.Provider value={{ tutor, setTutor }}>
//       {children}
//     </TutorContext.Provider>
//   );
// };

// import React, { createContext, useReducer, useEffect } from 'react'

// export const AuthContext = createContext()

// export const authReducer  = (state, action) => {
//     switch (action.type) {
//         case 'LOGIN':
//             return { admin: action.payload }
//         case 'LOGOUT':
//             return { admin: null };
//         default:
//             return state
//     }
// }

// export const AuthContextProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(authReducer, {
//       admin: null,
//     });

//     useEffect(() => {
//         const admin = JSON.parse(localStorage.getItem("admin"));

//         if (admin) {
//           dispatch({ type: "LOGIN", payload: admin });
//         }
//     }, [])

//     console.log('AuthContext state: ', state)

//     return (
//         <AuthContext.Provider value = {{...state, dispatch}}>
//             { children }
//         </AuthContext.Provider>
//     )
// }
