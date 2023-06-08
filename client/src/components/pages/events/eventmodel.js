import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EventModel = ({ selectedEvent }) => {
  const getuser = useSelector((state) => state.user).result;
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    window.popup(event);
  };

  return (
    <>
      {selectedEvent && (
        <div
          className="modal fade popup-open-events"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="row align-items-center">
                    <div className="col-sm-8 col-xs-12 music-left-content">
                      <h3 className="flex flex-row">
                        {selectedEvent.name}{" "}
                        <Link
                          style={{
                            fontFamily: "Origin Tech Demo",
                            cursor: "pointer",
                          }}
                          to={`/event-register?id=${selectedEvent.name}&ref=parent`}
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="36px"
                            viewBox="0 0 24 24"
                            width="50px"
                            fill="#39ff14"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                          </svg>
                        </Link>
                      </h3>
                      <p>{selectedEvent.description}</p>
                      <div className="price-main">
                        <h4>
                          <span>Prizes Worth-</span>₹ {selectedEvent.cashPrize}
                        </h4>
                      </div>
                      <div className="btn-merg">
                        <a
                          className="cart-main"
                          href="#"
                          onClick={() => setOpen(true)}
                        >
                          {/* <Button event={selectedEvent.name}/> */}
                          <div>
                            {!getuser.email && (
                              <>
                                <button
                                  onClick={() =>
                                    window.location.replace(
                                      "/login?redirect_to=events"
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
                                  Login to Register
                                </button>
                              </>
                            )}
                            {getuser.email && (
                              <>
                                  <button
                                    onClick={() =>
                                      handleClick(selectedEvent.eventId)
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
                                    ₹ {selectedEvent.entryFee}/Person
                                  </button>
                              </>
                            )}
                          </div>
                        </a>
                        <a
                          className="cart-main rulebook"
                          href={selectedEvent.rulebookLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Rulebook
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-4 col-xs-12 music-right-image">
                      <img src={selectedEvent.imageUrl} alt="" srcSet="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventModel;
