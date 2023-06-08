const EventSection = () => {
  return (
    <>
      {/* <!-- Event Section screen --> */}
      <div
        className="slide events-main mobile-about"
        id="slide2"
        style={{
          paddingLeft: "50px",
          height: "70vh",
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
          {/* <div className="number-main">
            <h2>02</h2>
          </div> */}
          <div className="intro" data-aos="fade-up">
            <h2>About Fest</h2>
          </div>
          {/* <!-- Pills navs --> */}
          <div
            className="navigation-tabs-main"
            styles={{ "margin-top": "10px" }}
            data-aos="fade-up"
          >
            {/* <!-- Nav tabs --> */}
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" data-bs-toggle="tab" href="#msg">
                  ZEITGEIST
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#pro">
                  Advitiya
                </a>
              </li>
            </ul>
            {/* <!-- Tab panes --> */}
            <div className="tab-content">
              <div className="tab-pane active" id="msg">
                <div className="font-bold text-lg">
                  “Shh! Listen! Someone’s coming! I think — I think it might be
                  us!” ― J.K. Rowling
                </div>
                <br />
                Welcome to our vibrant and scintillating cultural fest.
                Zeitgeist 23 is going to be an extravaganza where you will get
                to experience different timelines festooned with music, dance,
                art, literature, food, and other effervescent activities. This
                year's cultural fest promises to be a festive and enriching
                experience, featuring a range of cultural performances, food
                stalls, and interactive activities. We welcome you to this
                exhilarating journey through time.{" "}
              </div>
              <div className="tab-pane fade" id="pro">
                <div className="font-bold text-lg">
                  Changing times lead to INNOVATION!
                </div>
                <br />
                Welcome to our highly anticipated technical fest, where
                innovation and creativity meet technology! Advitiya 23 is going
                to be an exciting and enriching experience, featuring a range of
                competitions, workshops, and technical talks by industry
                experts. We welcome you to be a part of our technical fest and
                join us in celebrating the power of innovation and technology. A
                perfect opportunity to exhibit and gather knowledge while having
                fun and get rewarded.
              </div>
            </div>
          </div>
          {/* <!-- Pills navs --> */}

          {/* <!-- Tabs navs --> */}
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

export default EventSection;
