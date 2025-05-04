import Login from "./components/account/Login";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useEffect, useState } from "react";

import Editor from "./pages/editor.pages.component";
import PrivateRoute from "./pages/auth.pages.component";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
        <Route path="/editor" element={<Editor />} /> 

          <Route path="/" element={<PrivateRoute />}>
          <Route path="account" element={<Login />} />
           
          </Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
