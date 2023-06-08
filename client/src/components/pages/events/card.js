import { useState } from "react";
import RegisterEventModel from "./registerEventModel";

const EventCard = ({ event, setSelectedEvent }) => {
  return (
    <>
      <div className="col-sm-3 col-xs-12">
        <div
          className="schedule-sub cursor-pointer"
          onClick={() => {
            setSelectedEvent(event);
          }}
          data-bs-toggle="modal"
          href="#exampleModalToggle"
        >
          <img src={event.imageUrl} className="h-60" />
          <div className="schedule-sub-bottom d-flex align-items-center justify-content-between">
            <div className="schedulecontent">
              <h5>{event.name}</h5>
              <p>{event.category}</p>
            </div>
            <div className="schedulecontentright">
              <a
                as={"button"}
                onClick={() => {
                  setSelectedEvent(event);
                }}
                data-bs-toggle="modal"
                href="#exampleModalToggle"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
