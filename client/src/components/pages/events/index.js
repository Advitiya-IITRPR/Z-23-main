import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./card";
import EventModel from "./eventmodel";
import Schedule from "./schedule";
import categories from "./categories";
import { toast } from "react-hot-toast";
import useQueryParam from "../../utils/useParams";

const EventsPage = () => {
  const [search, setSearch] = useQueryParam("search", "All");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [show, setShow] = useState("events");
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    setActiveCategory(search);
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (windowSize[0] > 799) {
      setToggleMenu(true);
    }
  }, [windowSize]);
  const changeCategory = (category) => {
    setActiveCategory(category);
    // console.log(category);
  };

  const debounceFunc = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const updateQuery = (...args) => {
    const value = args[0].target.value;
    setQuery(value);
  };

  const optimisedHandler = debounceFunc(updateQuery, 500);

  return (
    <>
      <section className="sponser-main pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 sponser-content">
              <h3>Events</h3>
              <div className="d-flex justify-content-between align-items-center">
                <label className="search-main">
                  <input
                    type="text"
                    placeholder="Search Event"
                    onChange={optimisedHandler}
                  />
                </label>
                <div
                  className="toggle-mobile"
                  onClick={() =>
                    windowSize[0] < 799
                      ? setToggleMenu(!toggleMenu)
                      : setToggleMenu(true)
                  }
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <ul
                className="sidebar-main nav nav-tabs"
                style={
                  toggleMenu
                    ? { display: "block", position: "sticky", top: "150px" }
                    : { display: "none", position: "sticky", top: "150px" }
                }
              >
                <li
                  className="nav-item"
                  onClick={() => {
                    changeCategory("All");
                    setSearch("All");
                  }}
                >
                  <a
                    className={
                      activeCategory === "All" ? "nav-link active" : "nav-link"
                    }
                    data-bs-toggle="tab"
                    href="#All"
                    onClick={() => {
                      setShow("events");
                      windowSize[0] < 799
                        ? setToggleMenu(false)
                        : setToggleMenu(true);
                    }}
                  >
                    All
                  </a>
                </li>
                {categories.map((category, index) => {
                  return (
                    <li
                      className="nav-item"
                      key={index}
                      onClick={() => {
                        changeCategory(category);
                        setSearch(category);
                        windowSize[0] < 799
                          ? setToggleMenu(false)
                          : setToggleMenu(true);
                      }}
                    >
                      <a
                        className={
                          activeCategory === category
                            ? "nav-link active"
                            : "nav-link"
                        }
                        data-bs-toggle="tab"
                        href={"#"}
                        onClick={() => {
                          setShow("events");
                        }}
                      >
                        {category}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-sm-10 col-xs-12 schedule-right">
              <a
                className="schedule-btn"
                as={"button"}
                style={{
                  cursor: "pointer",
                  width: "auto",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                href="#"
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                  onClick={() =>
                    show === "events" ? setShow("schedule") : setShow("events")
                  }
                >
                  <img
                    src={require("./../../../images/left-arow.png")}
                    alt=""
                    srcSet=""
                  />
                  Back to {show === "events" ? "Schedule" : "Events"}
                </span>
              </a>
              {show === "events" ? (
                <Events
                  query={query}
                  category={activeCategory}
                  setSelectedEvent={setSelectedEvent}
                />
              ) : (
                <Schedule />
              )}
            </div>
          </div>
        </div>
      </section>
      <EventModel selectedEvent={selectedEvent} />
    </>
  );
};

export default EventsPage;

const Events = ({ category, query, setSelectedEvent }) => {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadEvents = async () => {
      var url;
      setLoading(true);
      if (category === "Advitiya") {
        url = `${process.env.REACT_APP_API_ENDPOINT}/events/AdvitiyaEvents`;
      } else if (category === "Zeitgeist") {
        url = `${process.env.REACT_APP_API_ENDPOINT}/events/ZeitgeistEvents`;
      } else if (category === "All") {
        url = `${process.env.REACT_APP_API_ENDPOINT}/events/allEvents`;
      } else {
        const newCat = extractCategories(category);
        let newCatStr = "";
        for (let i = 0; i < newCat.length; i++) {
          newCatStr += newCat[i];
        }
        url =
          `${process.env.REACT_APP_API_ENDPOINT}/events/allEvents?category=` +
          newCatStr;
      }
      console.log(url);
      await axios
        .get(url)
        .then((response) => {
          setEvents(response.data);
          // console.log(response.data)
        })
        .catch((error) => {
          toast.error("Error while fetching events");
          console.log(error);
        });
      setLoading(false);
      return;
    };
    loadEvents();
  }, [category]);

  return (
    <>
      <div className="row">
        {loading && (
          <>
            <div
              style={{
                position: "fixed",
                height: "60vh",
                width: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <span className="spinner"></span>
            </div>
          </>
        )}
        {!loading && events?.length === 0 && (
          <>
            <span
              style={{
                color: "#fff",
                fontSize: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
                width: "100%",
              }}
            >
              Coming Soon{" "}
            </span>
          </>
        )}
        {!loading &&
          events &&
          events.map((event) => {
            if (query) {
              if (
                event.name.toLowerCase().includes(query.toLowerCase()) |
                event?.category?.toLowerCase().includes(query.toLowerCase())
              ) {
                return (
                  <EventCard
                    event={event}
                    setSelectedEvent={setSelectedEvent}
                  />
                );
              }
            } else {
              return (
                <EventCard event={event} setSelectedEvent={setSelectedEvent} />
              );
            }
          })}
      </div>
    </>
  );
};

function extractCategories(s) {
  s = s.replace(/\s/g, "");
  s = s.replace("&", "");
  s = s.replace(",", "");
  s = s.split(" ");
  const res = [];
  for (let val = 0; val < s.length; val++) {
    if (s[val] != "") {
      res.push(s[val]);
    }
  }

  return res;
}
