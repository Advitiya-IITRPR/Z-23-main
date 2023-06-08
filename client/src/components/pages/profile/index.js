import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import EventListItem from "./eventListItem";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { fetchProfileData } from "../../auth/requests/getProfileData";
import { useDispatch } from "react-redux";

const Profile = () => {
  const getprofile = useSelector((state) => state.getprofile).result;
  const getuser = useSelector((state) => state.user).result;
  const [copyText, setCopyText] = useState("");
  const [sendingMail, setSendingMail] = useState(false);
  const auth = getAuth();
  const [isVerified, setIsVerified] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };
  const copyToClipboard = () => {
    console.log("Clicked");
    copy(getprofile.referral_code);
    toast.success("Copied to Clipboard");
  };
  useEffect(() => {
    if (getuser.email !== "") {
      fetchProfileData(dispatch, getuser.email, navigate, getuser.private_key);
    }
    setTimeout(() => {
      if (!getprofile.name && getuser.email) {
        navigate("/register-step2");
      }
    }, 3000);
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setIsVerified(userAuth.emailVerified);
      } else {
        setIsVerified(false);
      }
    });
    return unsubscribe;
  }, []);
  const SendVarificationEmail = async () => {
    setSendingMail(true);
    try {
      await sendEmailVerification(auth.currentUser).then(() => {
        toast.success("Email Verification sent! Check your inbox or spam box");
      });
    } catch {
      toast.error("Too many requests!");
    }
    setSendingMail(false);
  };
  return (
    <>
      <section className="sponser-main pb-5 my-profile">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 sponser-content">
              <h3>
                My Profile
                <Link
                  to="/edit-profile"
                  className="mx-3 text-slate-400 hover:text-zinc-50"
                >
                  (Edit)
                </Link>
              </h3>
            </div>
            {!isVerified && (
              <div style={{ padding: "10px 10px" }}>
                {sendingMail && <div className="spinner"></div>}
                <strong style={{ color: "#d63031" }}>
                  Your Email is not verified,{" "}
                  <Link
                    to="#"
                    onClick={SendVarificationEmail}
                    style={{ textDecoration: "underline" }}
                    className="text-gray-300 hover:text-gray-50"
                  >
                    Send Verification Mail
                  </Link>{" "}
                  to register in Events
                </strong>
              </div>
            )}
            <div className="image-content-team">
              <img
                className="w-80 h-80 rounded-xl img1"
                src={
                  getprofile.gender === "Female"
                    ? require("./female.jpg")
                    : require("./60111.jpg")
                }
              />
              <div className=" team-content">
                <div className="event-profile-content-main d-flex justify-content-between align-items-center">
                  <div className="team-content-left pb-4">
                    <div className="profile-image">
                      <h4 className="img1">{getprofile.name}</h4>
                      <img
                        src={require(`./../../../images/${
                          isVerified ? "" : "not_"
                        }verified.png`)}
                        alt=""
                        srcSet=""
                        className="img2"
                      />
                    </div>
                    <h6>
                      {getprofile.uniqueId}
                      <strong className="text-red-500 mx-3 ">
                        (Do not share)
                      </strong>
                    </h6>
                  </div>
                </div>
                <div className="z-coins">
                  <p>Z{getprofile.Zcoin}</p>
                  <img
                    src={require("./../../../images/wallet.png")}
                    alt=""
                    srcSet=""
                    className="wallet"
                  />
                </div>
                <div className="form-details">
                  <ul>
                    <li>
                      <span className="orange">Email -</span>
                      {getprofile.email}
                    </li>
                    <li>
                      <span className="orange">College Name -</span>
                      {getprofile.collegeName}
                    </li>
                    <li>
                      <span className="orange">Phone Number -</span>+91{"-"}
                      {getprofile.phone}
                    </li>
                    <li>
                      <span className="orange">Gender -</span>
                      {getprofile.gender}
                    </li>
                    <li>
                      <span className="orange">Date of Birth -</span>
                      {getprofile.dob}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      <div style={{ marginLeft: "37px", transform: "translateY(-50px)" }}>
        <span className="text-orange-500"> Referral Code -</span>
        <span
          style={{
            padding: "10px 10px",
            border: "1px solid #ff7b00",
            width: "fit-content",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
          }}
        >
          <input
            type="text"
            value={getprofile.referral_code}
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              fontSize: "1.2rem",
            }}
            onChange={handleCopyText}
            disabled
          />
          <a as={"button"} onClick={() => copyToClipboard()}>
            <svg
              fill="#ff7b00"
              width="28px"
              height="28px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
              transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="72.96000000000001"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M0 1919.887h1467.88V452.008H0v1467.88ZM1354.965 564.922v1242.051H112.914V564.922h1242.051ZM1920 0v1467.992h-338.741v-113.027h225.827V112.914H565.035V338.74H452.008V0H1920ZM338.741 1016.93h790.397V904.016H338.74v112.914Zm0 451.062h790.397v-113.027H338.74v113.027Zm0-225.588h564.57v-112.913H338.74v112.913Z"
                  fillRule="evenodd"
                ></path>{" "}
              </g>
            </svg>
          </a>
        </span>
      </div>
      <section className="event-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-xs-12">
              <div className="event-heading sponser-content">
                <h3>Events List -</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-xs-12">
              <div className="event-table-main">
                <table>
                  <tr>
                    <th>Event name</th>
                    <th>category</th>
                    <th>Cash Prize</th>
                    <th>Entry Fee</th>
                    <th>Know More</th>
                  </tr>
                  {getprofile?.events &&
                    getprofile?.events.map((event) => {
                      return <EventListItem id={event} />;
                    })}
                </table>
                {/* {getprofile?.events?.length === 0 && (
                  <span style={{ color: "#fff", fontSize: "1.5rem" }}>
                    Nothing to Show,{" "}
                    <Link
                      to="/events"
                      style={{
                        color: "#ff7b00",
                        textDecoration: "underline",
                      }}
                    >
                      Click to Explore
                    </Link>
                  </span>
                )} */}
                {/* <ul className="pagination d-flex align-items-center justify-content-center pt-4">
                  <li>
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>
                  </li>
                  <li>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                  </li>
                  <li className="number-btn">1</li>
                  <li>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i
                      className="fa fa-angle-double-right"
                      aria-hidden="true"
                    ></i>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
