import React from "react";
import "./mainpage.css";
import profile from "../../assets/images/profile.jpg";
import {Link,useParams} from 'react-router-dom'
const MainPage = ({id}) => {
  const { ids } = useParams();
  console.log(id);
  return (
    <Link to={`/chat/${id}`} className="flex justify-between">
      <div>
        <img
          src={profile}
          className="m-2 h-[3rem] w-[3rem] rounded-full object-cover"
        />
      </div>
      <div className="flex justify-start flex-col text-left">
        <p className="text-black font-bold">Ali Ezadkhaha</p>
        <p className="text-gray-400 font-thin text-sm">Last message some message</p>
      </div>
      <div className="mr-1">{new Date().getHours()}</div>
    </Link>
  );
};

export default MainPage;
