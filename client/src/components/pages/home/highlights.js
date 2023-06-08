const Highlights = () => {
  return (
    <>
      <div
        className="slide events-main highlight-new"
        id="slide3"
        style={{
          // paddingLeft: "50px",
          height: "70vh",
        }}
      >
        <div className="aeroplane-main">
          <div className="aeroplane-image">
            <img
              className="aeroplanes"
              src={require("./../../../images/aeroplane-three.png")}
            />
          </div>
        </div>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="text-left position-relative pb-5">
                {/* <div className="number-main">
                  <h2>03</h2>
                </div> */}
                <div className="intro">
                  <h2>highlights</h2>
                  <p>
                    Welcome to Zeitgeist, the most anticipated and biggest techno-cultural fest in North India that showcases myriad events, workshops and talk series and is ornamented by the presence of various big names from different industries such as - Diljit Dosanjh, Anubhav Singh Bassi, The local Train band, Vishal-Shekhar, Zakir Khan, Sonam Bajwa etc.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-4 col-xs-12 highlight-sub one">
                  <img src={require("./../../../images/slide-one.png")} className="rounded-xl" />
                </div>
                <div className="col-sm-4 col-xs-12  highlight-sub two">
                  <img src={require("./../../../images/slide-two.png")} className="rounded-xl" />
                </div>
                <div className="col-sm-4 col-xs-12  highlight-sub three">
                  <img src={require("./../../../images/slide-three.png")} className="rounded-xl" />
                </div>
              </div>
            </div>
            {/* <!-- Tabs navs --> */}

            <div className="image-intro-main d-flex justify-content-between pt-5 events-bottom-image">
              <img
                className="mobile-intro"
                src={require("./../../../images/slide-img-one.png")}
              />

              <div className="image-sub eight">
                <img src={require("./../../../images/eight.png")} />
              </div>
              <div className="image-sub nine">
                <img src={require("./../../../images/nine.png")} />
              </div>
              <div className="image-sub ten">
                <img src={require("./../../../images/ten.png")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Highlights;
