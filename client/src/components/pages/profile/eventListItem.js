import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const EventListItem = ({ id }) => {
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(false);
  const fetchUserEvent = async () => {
    setLoading(true);
    let url = `${process.env.REACT_APP_API_ENDPOINT}/events/getEvents/${id}`;
    await fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        toast.error("Error while fetching events data");
        setLoading(false);
        return;
      });
  };
  useEffect(() => {
    fetchUserEvent();
  }, []);
  return (
    <>
      <tr>
        {loading && (
          <td
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner"></div>
          </td>
        )}
        {!loading && (
          <>
            <td className="evnt-name">{event?.name}</td>
            <td className="evnt-name">{event?.category}</td>
            <td className="evnt-name">₹ {event?.cashPrize}</td>
            <td className="evnt-name">₹ {event?.entryFee}</td>
            <td className="evnt-name">
              <Link
                to={event?.rulebookLink ? event?.rulebookLink : ""}
                target="_blank"
                className="hover:text-yellow-400"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                Rulebook
              </Link>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default EventListItem;
