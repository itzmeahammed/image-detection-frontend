import React from "react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";
import TrafficLogo from "../assets/images/trafficLogo.png";
import UploadIcon from "../assets/svg/uploadIcon.svg";
<<<<<<< HEAD
=======
import GuideIcon from "../assets/images/manual-book.png";
>>>>>>> 604facc (changes)
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    Cookies.remove("token");
    const token = Cookies.get("token");

    if (!token) navigate("/");
  };
  return (
    <div className='sidebar-container d-flex-jsb d-flex-col'>
      <div className='sidebar-header d-flex-full gap-8'>
        <img src={TrafficLogo} alt='' width={48} height={48} />
        <span>Traffic Watchdog </span>
      </div>
      <div className='sidebar-body p-16'>
        <div className='sidebar-body-item d-flex gap-8'>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_OKaMUyivk6YaqLIso8eP1UD77Oyk-C59Q&s"
            }
            alt=''
            width={24}
            height={24}
          />
          <Link to='/map'>Traffic map</Link>
        </div>
<<<<<<< HEAD
=======

        <div className='sidebar-body-item d-flex gap-8'>
          <img src={GuideIcon} alt='' width={24} height={24} />
          <Link to='/guide'>Traffic guidelines</Link>
        </div>
>>>>>>> 604facc (changes)
        <div className='sidebar-body-item d-flex gap-8'>
          <img src={UploadIcon} alt='' width={24} height={24} />
          <Link to='/upload'>Report Traffic Violation</Link>
        </div>
      </div>
<<<<<<< HEAD
=======

>>>>>>> 604facc (changes)
      <div className='sidebar-footer d-flex-full p-16'>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Sidebar;
