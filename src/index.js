import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
// import { Provider } from "react-redux";
// import store from "./store/ReduxStore";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    {/* </Provider> */}
  </React.StrictMode>
);

