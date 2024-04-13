import React, { useState } from "react";
import { siteRoutes, userRoutes } from "@config/routes";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "@components/layouts";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <Routes>
          {siteRoutes.map((siteRoute, index) => (
            <Route key={index} path={siteRoute.path} element={siteRoute.page} />
          ))}
          <Route element={<UserLayout />}>
            {userRoutes.map((userRoute, index) => (
              <Route
                key={index}
                path={userRoute.path}
                element={userRoute.page}
              />
            ))}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
