import React from "react";
import "../styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import TrafficLogo from "../assets/images/trafficLogo.png";
import UploadIcon from "../assets/svg/uploadIcon.svg";
import GuideIcon from "../assets/images/manual-book.png";
import FineIcon from "../assets/images/fine.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    Cookies.remove("token");
    const token = Cookies.get("token");

    if (!token) navigate("/");
  };

  // Helper function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className='sidebar-container d-flex-jsb d-flex-col'>
      <div className='sidebar-header d-flex-full gap-8'>
        <img src={TrafficLogo} alt='Logo' width={48} height={48} />
        <span>Traffic Watchdog</span>
      </div>

      <div className='sidebar-body p-16'>
        <div
          className={`sidebar-body-item d-flex gap-8 ${
            isActive("/map") ? "active" : ""
          }`}
        >
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_OKaMUyivk6YaqLIso8eP1UD77Oyk-C59Q&s"
            }
            alt='Map'
            width={24}
            height={24}
          />
          <Link to='/map'>Traffic map</Link>
        </div>

        <div
          className={`sidebar-body-item d-flex gap-8 ${
            isActive("/guide") ? "active" : ""
          }`}
        >
          <img src={GuideIcon} alt='Guide' width={24} height={24} />
          <Link to='/guide'>Traffic guidelines</Link>
        </div>

        <div
          className={`sidebar-body-item d-flex gap-8 ${
            isActive("/fine") ? "active" : ""
          }`}
        >
          <img src={FineIcon} alt='Fine' width={24} height={24} />
          <Link to='/fine'>Fine and Payment</Link>
        </div>

        <div
          className={`sidebar-body-item d-flex gap-8 ${
            isActive("/upload") ? "active" : ""
          }`}
        >
          <img src={UploadIcon} alt='Upload' width={24} height={24} />
          <Link to='/upload'>Report Traffic Violation</Link>
        </div>
      </div>

      <div className='sidebar-footer d-flex-full p-16'>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Sidebar;
