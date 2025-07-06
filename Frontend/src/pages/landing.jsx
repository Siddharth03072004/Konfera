import React from "react";
import "../styles/landingPage.css";
import { Link, useNavigate } from "react-router-dom";
export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Konfera</h2>
        </div>
        <div className="navlist">
          <p
            onClick={() => {
              router("/guestChannel");
            }}
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div
            onClick={() => {
              router("/auth");
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>
      </nav>
      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>From</span> office to livingroom.
          </h1>
          <p>Bridge Every Gap, MeetEdge</p>
          <div role="button">
            <Link to={"/home"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="/landing.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
