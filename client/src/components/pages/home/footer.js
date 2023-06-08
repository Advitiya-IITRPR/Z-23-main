import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* <!-- footer start --> */}
      {/* <section className="newsletter">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <h3>Let’s get connected</h3>
            </div>
            <div className="col-sm-6 col-xs-12 talk-main-right">
              <a className="talk-main" href="#">
                Let’s Talk
              </a>
            </div>
          </div>
        </div>
      </section> */}
      <section className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-xs-12 text-center logo-footer">
              <a
                className="navbar-brand"
                href="#"
                style={{
                  maxWidth: "300px",
                }}
              >
                <img src={require("./transparent.png")} alt="" />
              </a>
              {/* <p>
                We present to you the 10th edition of Zeitgeist : Wayfare
                through TIME. We are elated to announce that we have entered
                into a successful partnership with Webguruz Technologies. This
                partnership has been a successful collaboration for Team
                Zeitgeist and Webguruz to work together and achieve our shared
                goals.
              </p> */}
            </div>
          </div>
          <div className="flex-row md:flex md:justify-evenly">
            {/* <div className="col-sm-4 col-xs-12 register-main">
              <h3>register</h3>
              <label className="input-main">
                <input type="text" placeholder="Enter email-id" />
                <input type="submit" value="submit" />
              </label>
            </div> */}
            <div className="col-sm-4 col-xs-12 text-center">
              <h3>Location</h3>
              <span>Address</span>
              <p>
                Indian Institute of Technology Ropar <br></br>Rupnagar, Punjab ,
                India 140001
              </p>
              <span>Contact Number</span>
              <p>+91-8171162979</p>
            </div>
            <div className="col-sm-4 col-xs-12 social-icons-main">
              <h3>Follow us on</h3>
              <ul>
                <li>
                  <a
                    className=""
                    href="https://www.youtube.com/@ZeitgeistIITRopar"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a
                    className=""
                    href="https://www.facebook.com/zeitgeist.iitrpr/"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    target={"_blank"}
                    className=""
                    href="https://www.linkedin.com/in/zeitgeist-iit-ropar-aa2bb6166/?originalSubdomain=in"
                    rel="noreferrer"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a
                    className=""
                    href="https://twitter.com/zeitgeist_rpr"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    className=""
                    href="https://www.instagram.com/zeitgeist_iitrpr/?hl=en"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 footer-menu">
              <ul>
                <li>
                  <Link to="/events">events</Link>
                </li>
                {/* <li>
                  <a href="#slide3">highlights</a>
                </li> */}
                <li>
                  <Link to="/sponsers">Sponsors</Link>
                </li>
                <li>
                  <Link to="/team">team</Link>
                </li>
                <li>
                  <Link to="https://ca.zeitgeist.org.in/" target={"_blank"}>
                    ca portal
                  </Link>
                </li>
                <li>
                  <Link to="/legal">T&C</Link>
                </li>
                <li>
                  <Link to="/" target={"_blank"}>
                    startup conclave
                  </Link>
                </li>
                <li>
                  <Link to="/faqs">fAQ’S</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row footer-bottom-top">
            <div className="col-sm-6 footer-bottom-left">
              <ul>
                <li
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="text-gray-400">Sponsored By</div>
                  <Link
                    className="font-bold mx-1"
                    to="https://webguruz.in/"
                    target={"_blank"}
                  >
                    Webguruz
                  </Link>
                </li>
                <li>
                  <Link to="legal">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 footer-bottom-right text-right">
              <ul>
                <li>
                  <a href="#">Copyright @ Zeitgeist 2023.</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
