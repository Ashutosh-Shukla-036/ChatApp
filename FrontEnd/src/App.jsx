import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SocketProvider } from "./component/SocketContext";
import { Navbar } from "./pages/navbar";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";
import { AllUsers } from "./pages/Alluser";
import { Chat } from "./component/Chat";

const App = () => (
    <>
      <Navbar />
        <div className="containe mx-auto p-4">
          <SocketProvider>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/allusers" element={<AllUsers />}></Route>
              <Route path="/chat/:username" element={<Chat />}></Route>
            </Routes>
          </SocketProvider>
        </div>
    </>
);

export default App;
