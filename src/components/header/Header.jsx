import React, { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsFillCameraFill } from "react-icons/bs";
import { HiVideoCamera } from "react-icons/hi2";
import { AiOutlineArrowLeft } from "react-icons/ai";
import profile from "../../assets/images/profile.jpg";

import "./header.css";
import { Link } from "react-router-dom";
const Header = ({ page }) => {
  
  const [showUnderline1, setShowUnderline1] = React.useState(false);
  const [showUnderline2, setShowUnderline2] = React.useState(false);
  const [showUnderline3, setShowUnderline3] = React.useState(false);

  const handleClick1 = () => {
    setShowUnderline1(true);
    setShowUnderline2("");
    setShowUnderline3("");
  };
  const handleClick2 = () => {
    setShowUnderline2(true);
    setShowUnderline1("");
    setShowUnderline3("");
  };
  const handleClick3 = () => {
    setShowUnderline3(true);
    setShowUnderline1("");
    setShowUnderline2("");
  };
  return (
    <>
      {page === "home" ? (
        <div className="nav1">
          <div className="flex justify-between">
            <div className="text-white font-bold text-lg">WhatsApp</div>
            <div className="flex justify-between">
              <div className="mr-2">
                <AiOutlineSearch className="mt-1 text-white" />
              </div>
              <div className="">
                <BsThreeDotsVertical className="mt-1 ml-2 text-white" />
              </div>
            </div>
          </div>
          <br />
          <div className="flex justify-between">
            <div className="">
              <BsFillCameraFill className="text-white text-lg mt-1" />
            </div>
            <div
              onClick={handleClick1}
              className={`text-gray-400 hover:text-white ${
                showUnderline1 ? "font-bold border-b-2 text-white pb-3 " : ""
              }`}
            >
              Chatter
            </div>
            <div
              onClick={handleClick2}
              className={`text-gray-400 hover:text-white ${
                showUnderline2 ? "font-bold border-b-2 text-white pb-3 " : ""
              }`}
            >
              Status
            </div>
            <div
              onClick={handleClick3}
              className={`text-gray-400 hover:text-white ${
                showUnderline3 ? "font-bold border-b-2 text-white pb-3" : ""
              }`}
            >
              Samtal
            </div>
          </div>
        </div>
      ) : (
        <div className="nav2">
          <div className="flex justify-between">
            <div className="flex justify-start">
              <Link to={"/"} className="text-white font-bold text-lg mr-3 mt-1">
                <AiOutlineArrowLeft />
              </Link>
              <div className="text-white font-bold text-lg">
                <img
                  src={profile}
                  className="mr-2 h-[2rem] w-[2rem] rounded-full object-cover"
                />
              </div>
              <div className="text-white font-bold text-lg">Ali</div>
            </div>
            <div className="flex justify-between">
              <Link
                to={"/video"}
                onClick={() =>{}}
                className="mr-2 mt-[-.2rem]"
              >
                <HiVideoCamera className="mt-1 mr-3 text-white text-xl" />
              </Link>

              <div className="mr-2 ">
                <FaPhoneAlt className="mt-1 text-white" />
              </div>
              <div className="">
                <BsThreeDotsVertical className="mt-1 ml-2 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
