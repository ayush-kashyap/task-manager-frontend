import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserDetails } from './context/Context';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserDetails>
 <ConfigProvider 
  theme={{
    token: {
      colorPrimary: "rgb(37 99 235)",
      // borderRadius: ,
      fontFamily:"Montserrat"
    },
    components: {
      Button: {
        colorPrimary: "rgb(37 99 235)",
        fontFamily:"Montserrat"
        // algorithm: data.Button?.algorithm,
      },
    },
  }}
 
 >
    <App />
    </ConfigProvider>
  </UserDetails>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

