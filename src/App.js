import "./App.css";
import React from "react";
import HomePage from "./pages/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/chat/ChatPage";
import VideoPage from "./pages/video/VideoPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <div className="background">
          <div className="flex justify-center  bg-red-200 text-center items-center">
            <div className="w-[22rem] h-[55rem] mt-0 rounded-[2rem] py-5 px-3 header">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chat/:id" element={<ChatPage />} />
                <Route path="/video" element={<VideoPage />} />

                <Route path="*" element={<p>Not found</p>} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
