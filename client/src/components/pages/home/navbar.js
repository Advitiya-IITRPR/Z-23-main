import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getuser = useSelector((state) => state.user).result;
  const [open, setOpen] = useState("close");
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const Logout = () => {
    const auth = getAuth();
    auth.signOut();
    dispatch({
      type: "GET_USER_ACTION",
      payload: { email: "" },
    });
    dispatch({ type: "GET_PROFILE_ACTION", payload: {} });
    navigate("/");
    toast.success("Logout Successfuly");
  };
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (windowSize[0] > 799) {
      setOpen("open");
    }
  }, [windowSize]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <nav
      className="navigation-main"
      style={
        scrollPosition > 0 ? { backgroundColor: "rgba(0, 0, 0, 0.1)" } : {}
      }
    >
      <div className="container-fluid">
        <Link className="navbar-brand for-mobile logo_a" to={"/"}>
          <img src={require("./transparent.png")} alt="" />
        </Link>{" "}
        {windowSize[0] < 799 && (
          <button
            className="navbar-toggler"
            onClick={() =>
              open === "open" ? setOpen("close") : setOpen("open")
            }
          >
            {open !== "open" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                fill="#fff"
                width="48"
              >
                <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
              </svg>
            )}
            {open === "open" && (
              <svg
                width="48px"
                height="48px"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                stroke-width="0.00024000000000000003"
                transform="matrix(1, 0, 0, -1, 0, 0)rotate(0)"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.4800000000000001"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            )}
          </button>
        )}{" "}
        {/* {windowSize[0] < 799 && (
          <button className="navbar-demo">
            <label>
              <input
                type={"checkbox"}
                id={"toggle_btn_checkbox"}
                onClick={(e) =>
                  open === "open" && e.target.value
                    ? setOpen("close")
                    : setOpen("open")
                }
                value={open === "open" ? true : false}
              />
              <span className="menu">
                {" "}
                <span className="hamburger"></span>{" "}
              </span>
            </label>
          </button>
        )} */}
        <div
          className="navigation-new"
          style={
            open === "open"
              ? {
                  display: "flex",
                }
              : { display: "none" }
          }
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to={"/events"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                {" "}
                Events{" "}
              </Link>{" "}
            </li>{" "}
            <li className="nav-item px-4">
              <Link
                to={"sponsers"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                {" "}
                Sponsors{" "}
              </Link>{" "}
            </li>{" "}
            <li className="nav-item px-4">
              <Link
                to={"https://advitiya-iitrpr.github.io/startup-conclave/"}
                target={"_blank"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                {" "}
                startup conclave{" "}
              </Link>{" "}
            </li>{" "}
            <li className="nav-item px-4">
              <Link
                to={"https://www.townscript.com/e/accommodation-143042"}
                target={"_blank"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                {" "}
                Accomodation{" "}
              </Link>{" "}
            </li>{" "}
          </ul>{" "}
          <Link
            className="navbar-brand for-desktop logo_a"
            to={"/"}
            onClick={() =>
              open === "open" && windowSize[0] < 799
                ? setOpen("close")
                : setOpen("open")
            }
          >
            <img
              src={require("./transparent.png")}
              alt=""
              style={{ height: "100px", width: "1000px" }}
            />
          </Link>{" "}
          <ul className="navbar-nav me-0 my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item px-4">
              <Link
                to={"/team"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                {" "}
                Team{" "}
              </Link>{" "}
            </li>{" "}
            <li className="nav-item px-4">
              <Link
                to={"/schedule"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                Schedule{" "}
              </Link>{" "}
            </li>{" "}
            <li className="nav-item">
              <Link
                to={"https://ca.zeitgeist.org.in/"}
                target={"_blank"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                CA Portal{" "}
              </Link>{" "}
            </li>{" "}
            <li className="nav-item px-4">
              <Link
                to={"legal"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                {" "}
                T & C{" "}
              </Link>{" "}
            </li>{" "}
            <li className="nav-item px-4">
              <Link
                to={"https://advitiya-iitrpr.github.io/tsp/"}
                target={"_blank"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                TSP{" "}
              </Link>{" "}
            </li>{" "}
            <li className="nav-item px-4" style={{ marginRight: "5px" }}>
              <Link
                to={"faqs"}
                onClick={() =>
                  open === "open" && windowSize[0] < 799
                    ? setOpen("close")
                    : setOpen("open")
                }
              >
                {" "}
                faq’ s{" "}
              </Link>{" "}
            </li>{" "}
            <li
              className="nav-item px-4"
              onClick={() =>
                open === "open" && windowSize[0] < 799
                  ? setOpen("close")
                  : setOpen("open")
              }
            >
              {" "}
              {getuser.email !== "" && (
                <>
                  <Link to="" onClick={Logout} style={{ color: "#fff" }}>
                    {" "}
                    Logout{" "}
                  </Link>{" "}
                </>
              )}{" "}
            </li>{" "}
            <li className="nav-item sign-in px-4">
              {" "}
              {getuser.email === "" && (
                <Link
                  to={"/login"}
                  onClick={() =>
                    open === "open" && windowSize[0] < 799
                      ? setOpen("close")
                      : setOpen("open")
                  }
                  style={{ overflow: "hidden" }}
                >
                  {" "}
                  SIGN IN{" "}
                </Link>
              )}{" "}
              {getuser.email !== "" && (
                <>
                  <Link
                    to={"/profile"}
                    onClick={() =>
                      open === "open" && windowSize[0] < 799
                        ? setOpen("close")
                        : setOpen("open")
                    }
                    style={{ overflow: "hidden" }}
                  >
                    {" "}
                    Profile{" "}
                  </Link>{" "}
                </>
              )}{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
};

export default Navbar;
