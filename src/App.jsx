import React from "react";
import { Route, Router, Routes } from "react-router";
import NavBar from "./common/NavBar/NavBar";
import Login from "./common/Login/Login";
import Signup from "./common/SignUp/Signup";
import Loader from "./common/Loader/Loader";

function Layout() {
  return (
    <>
      <div>
        <NavBar />
        {/* <Login/> */}
        <Signup/>
        <Loader />
        <main>
          <Routes>
            <Route path="/" />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
