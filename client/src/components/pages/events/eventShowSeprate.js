import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegisterEventSeprate() {
  const navigate = useNavigate();
  const getuser = useSelector((state) => state.user).result;
  const queryParameters = new URLSearchParams(useLocation().search);
  const eventId = queryParameters.get("id");
  const ref = queryParameters.get("ref");
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true);
  async function handleShare() {
    const url = window.location.href;
    const text = "Share this Event";
    const title = "Zeitgeist 2023";
    try {
      await navigator.share({ title: title, text: text, url: url });
      toast.success("Event shared successfully");
    } catch (err) {
      toast.error(`Error: ${err}`);
    }
  }
  const loadEvent = async () => {
    console.log(eventId);
    // console.log(ref);
    var url = `${process.env.REACT_APP_API_ENDPOINT}/events/getEvents/${eventId}`;
    console.log(url);
    const res = await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // toast.error("Error while fatching events");
        console.log(error);
        return error;
      });
    if (res.name === "AxiosError") {
      toast.error("Something went wrong...");
      return;
    }
    setTimeout(() => {
      setEvent(res);
      setLoading(false);
    }, 2000);
    return;
  };
  useEffect(() => {
    if (!eventId) {
      window.location.replace("/events");
    } else {
      loadEvent();
    }
    console.log(event);
    if (event === undefined) {
      loadEvent();
    }
    console.log(event);
  }, []);
  const handleClick = (e) => {
    window.popup(e);
  };
  return (
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
          onClick={() => navigate("/events")}
          className="text-gray-200 font-bold"
        >
          <img
            src={require("./../../../images/left-arow.png")}
            className="mx-3"
            alt=""
            srcSet=""
          />
          Back to Events{" "}
        </span>{" "}
      </a>{" "}
      <div className="modal-content mx-6 my-11">
        <div className="modal-body">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-sm-8 col-xs-12 music-left-content">
                <h3 className="flex flex-row my-11">
                  {" "}
                  {loading && (
                    <div role="status" className="max-w-sm animate-pulse">
                      <div className="h-12 bg-gray-200 dark:bg-gray-700 w-48">
                        {" "}
                      </div>{" "}
                    </div>
                  )}{" "}
                  {!loading && event.name}{" "}
                  <div
                    style={{
                      transform:
                        "scale3d(0.9,0.9,0.9) translateY(-7px) translateX(5px)",
                      cursor: "pointer",
                    }}
                    onClick={handleShare}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48px"
                      viewBox="0 0 24 24"
                      width="48px"
                      fill="#39ff14"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                    </svg>{" "}
                  </div>{" "}
                </h3>{" "}
                <p>
                  {" "}
                  {loading && (
                    <div role="status" className="max-w-sm animate-pulse">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full">
                        {" "}
                      </div>{" "}
                    </div>
                  )}{" "}
                  {!loading && event.description}{" "}
                </p>{" "}
                <div className="price-main my-6">
                  <h4>
                    <span> Prizes Worth - </span>₹{" "}
                    {loading && (
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 w-28 mx-3">
                          {" "}
                        </div>{" "}
                      </div>
                    )}{" "}
                    {!loading && event.cashPrize}{" "}
                  </h4>{" "}
                </div>{" "}
                <div className="btn-merg my-11">
                  <a className="cart-main" href="#">
                    {" "}
                    {/* <Button event={selectedEvent.name}/> */}{" "}
                    <div>
                      {" "}
                      {!getuser.email && (
                        <button
                          onClick={() =>
                            window.location.replace(
                              `/login?redirect_to=${window.location.href}`
                            )
                          }
                          className="cart-main tsbutton"
                          style={{
                            background: "none",
                            border: "none",
                            fontFamily: "Origin Tech Demo",
                            padding: "0px 0px",
                            margin: "0",
                            color: "#ff6b00",
                            minWidth: "auto",
                            fontSize: "15px",
                          }}
                        >
                          Login to Register{" "}
                        </button>
                      )}{" "}
                      {getuser.email && (
                        <>
                          <button
                            onClick={() => handleClick(event.eventId)}
                            className="cart-main tsbutton"
                            style={{
                              background: "none",
                              border: "none",
                              fontFamily: "Origin Tech Demo",
                              padding: "0px 0px",
                              margin: "0",
                              color: "#ff6b00",
                              minWidth: "auto",
                              fontSize: "15px",
                            }}
                          >
                            ₹{loading && "Loading..."}{" "}
                            {!loading && event.entryFee}
                            /Person{" "}
                          </button>{" "}
                        </>
                      )}{" "}
                    </div>
                    {/* <div>Coming Soon</div> */}{" "}
                    {/* <button onClick={()=> handleClick('singing-411041')} className="cart-main tsbutton" style={{background:"none", border: "none", fontFamily:"Origin Tech Demo", padding:"0px 0px", margin: "0", color:"#ff6b00",minWidth:"auto"}}>Register Now</button> */}{" "}
                  </a>{" "}
                  <a
                    className="cart-main rulebook"
                    href={loading ? "#" : event.rulebookLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {loading ? "Loading..." : "Rulebook"}{" "}
                  </a>{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-sm-4 col-xs-12 music-right-image">
                <img
                  src={loading ? require("./spinner1.gif") : event.imageUrl}
                  alt=""
                  srcSet=""
                />
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
