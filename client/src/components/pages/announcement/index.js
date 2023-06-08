import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Announcements = ({ ref_elem }) => {
  const [scrollamount, setScrollAmount] = useState(3);
  const navigate = useNavigate();
  return (
    <>
      {ref_elem === "seprate" && (
        <>
          <a
            className="schedule-btn m-11 hover:mx-16"
            as={"button"}
            style={{
              cursor: "pointer",
              width: "auto",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              transition: "0.5s ease all",
            }}
            href="#"
          >
            <span
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              onClick={() => navigate("/")}
              className="text-gray-200 font-bold"
            >
              <img
                src={require("./../../../images/left-arow.png")}
                className="mx-3"
                alt=""
                srcSet=""
              />
              Back to Home{" "}
            </span>{" "}
          </a>{" "}
        </>
      )}
      <div
        className="slide events-main mobile-about"
        id="slide2"
        style={{
          paddingLeft: "50px",
          height: `${ref_elem === "home" ? "500px" : "auto"}`,
        }}
      >
        <div className="aeroplane-main">
          <div className="aeroplane-image">
            <img
              className="aeroplanes"
              src={require("./../../../images/aeroplane-two.png")}
            />
          </div>
        </div>
        <div className="text-left position-relative pb-5">
          {ref_elem === "home" && (
            <>
              <div
                className="intro"
                data-aos="fade-up"
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2>Announcements</h2>
                <div
                  className="flex justify-content-end align-items-end text-gray-300"
                  style={{ marginRight: "65px" }}
                >
                  <Link
                    to="/announcements"
                    style={{
                      fontFamily: "Origin Tech Demo",
                      cursor: "pointer",
                      fontSize: "1.3rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="more-link"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      fill="#fff"
                    >
                      <path d="M11 21q-1.875 0-3.512-.7-1.638-.7-2.863-1.925T2.7 15.512Q2 13.875 2 12t.7-3.513q.7-1.637 1.925-2.862T7.488 3.7Q9.125 3 11 3q.525 0 1.012.062.488.063.988.188V5.3q-.5-.15-.988-.225Q11.525 5 11 5 8.05 5 6.025 7.025 4 9.05 4 12q0 2.95 2.025 4.975Q8.05 19 11 19q2.95 0 4.975-2.025Q18 14.95 18 12q0-.275-.025-.5-.025-.225-.075-.5h2.05q.05.275.05.5v.5q0 1.875-.7 3.512-.7 1.638-1.925 2.863T14.513 20.3Q12.875 21 11 21Zm2.8-4.8L10 12.4V7h2v4.6l3.2 3.2ZM18 9V6h-3V4h3V1h2v3h3v2h-3v3Z" />
                    </svg>
                    More
                  </Link>
                </div>
              </div>
            </>
          )}
          <div
            className="navigation-tabs-main"
            styles={{ "margin-top": "10px", marginBottom: "100px" }}
            data-aos="fade-up"
          >
            {ref_elem === "home" && (
              <>
                <marquee
                  onmouseover={() => setScrollAmount(0)}
                  onmouseout={() => setScrollAmount(3)}
                  behavior="scroll"
                  scrollamount={scrollamount}
                  direction="up"
                  loop="infinite"
                  height="300px"
                >
                  <div className="announcement-main text-gray-200">
                    <ul>
                      {[...Array(1)].map((d) => {
                        return (
                          <li>
                          Attention everyone, we have a slight delay in tonight's event due to the rain. The band performance, which was scheduled to start at 8 pm, will now begin at 9 pm on the main stage. We apologize for any inconvenience this may have caused and appreciate your patience. The safety of our guests and performers is our top priority and we want to ensure that everyone enjoys the show without any risk. Please use this extra time to grab some refreshments and find a dry spot. We will continue to monitor the weather and update you if necessary. Thank you and see you all at 9 pm!
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </marquee>
              </>
            )}
            {ref_elem === "seprate" && (
              <>
                <div className="announcement-main text-gray-50">
                  <ul>
                    {[...Array(1)].map((d) => {
                      return (
                        <li>
                        Attention everyone, we have a slight delay in tonight's event due to the rain. The band performance, which was scheduled to start at 8 pm, will now begin at 9 pm on the main stage. We apologize for any inconvenience this may have caused and appreciate your patience. The safety of our guests and performers is our top priority and we want to ensure that everyone enjoys the show without any risk. Please use this extra time to grab some refreshments and find a dry spot. We will continue to monitor the weather and update you if necessary. Thank you and see you all at 9 pm!
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className="image-intro-main d-flex justify-content-between pt-5 events-bottom-image"
          data-aos="fade-up"
        >
          <img
            className="mobile-intro"
            src={require("./../../../images/slide-img-one.png")}
          />
          <div className="image-sub five">
            <img src={require("./../../../images/event-tree.png")} />
          </div>
          <div className="image-sub six">
            <img src={require("./../../../images/event-camera.png")} />
          </div>
          <div className="image-sub seven">
            <img src={require("./../../../images/event-map.png")} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcements;
