import "./css/style.css";
import Navbar from "./navbar";
import Footer from "./footer";
import EventSection from "./event";
import Highlights from "./highlights";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Announcements from "../announcement";

const Home = () => {
  const getuser = useSelector((state) => state.user).result;
  return (
    <>
      <main>
        <div
          className="slide zeitguest-main"
          id="slide1"
          style={{
            textAlign: "center",
            verticalAlign: "center",
            height: "100vh",
          }}
        >
          <div className="aeroplane-main">
            <img src={require("./../../../images/map.png")} />
            <div className="aeroplane-image">
              <img
                className="aeroplanes"
                src={require("./../../../images/aeroplane-one.png")}
              />
            </div>
          </div>
          <div
            className="text-center position-relative pb-5 numbr-intro"
            style={{
              textAlign: "center",
              verticalAlign: "center",
            }}
          >
            <div className="number-main">{/* <h2>01</h2> */}</div>
            <div className="intro">
              <h1>ZEITGEIST</h1>
              <div className="music-main d-flex justify-content-between">
                <span className="music-white">Advitiya</span>
                <span className="date-orange">2023</span>
              </div>
            </div>
          </div>
          <div className="sign-in px-4">
            {getuser.email === "" && (
              <Link
                to={"/register-step1"}
                style={{
                  backgroundColor: "transparent",
                  fontSize: "2rem",
                  fontFamily: "fantasy",
                  textDecoration: "none",
                  fontFamily: "Origin Tech Demo",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "25px",
                  lineHeight: "25px",
                  color: "#ff7b00",
                }}
              >
                {" "}
                GET STARTED →
              </Link>
            )}
            {getuser.email !== "" && (
              <>
                <Link
                  to={"/profile"}
                  style={{
                    color: "#ff7b00",
                    backgroundColor: "transparent",
                    fontSize: "2rem",
                    fontFamily: "fantasy",
                    textDecoration: "underline",
                  }}
                  className="text-gray-300 hover:text-orange-600"
                >
                  {" "}
                  PROFILE →{" "}
                </Link>
              </>
            )}{" "}
          </div>{" "}
          <div className="image-intro-main d-flex justify-content-between pt-5">
            <img
              className="mobile-intro"
              src={require("./../../../images/slide-img-one.png")}
            />
            <div className="image-sub one">
              <img src={require("./../../../images/maping-main.png")} />
            </div>
            <div className="image-sub two">
              <img src={require("./../../../images/secnd.png")} />
            </div>
            <div className="image-sub three">
              <img src={require("./../../../images/camera.png")} />
            </div>
            <div className="image-sub four">
              <img src={require("./../../../images/mountain.png")} />
            </div>
          </div>
          <div
            className="clock-main-image"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={require("./../../../images/Clock.png")}
              className="img-clk"
            />
            <img
              className="person-main"
              src={require("./../../../images/Person.png")}
            />
          </div>
        </div>
        <Announcements ref_elem="home" />
        <Highlights />
        <EventSection />
      </main>
    </>
  );
};

export default Home;
