import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import useQueryParam from "../../utils/useParams";

const Schedule_Separate = () => {
  const [day, setDay] = useQueryParam("day", "1");
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    "https://drive.google.com/uc?export=view&id=1Nn0CKs1S3A3WNfqUUuryJF2X3KbOdwhg",
    "https://drive.google.com/uc?export=view&id=1CIxDh9Ci0KTf0OsdmHKwlBQsLPDn8FrT",
    "https://drive.google.com/uc?export=view&id=1v3PbRcqDpvwEhAsoYRKDMFfPmPvm4PnI",
    "https://drive.google.com/uc?export=view&id=1B1Ac5_ytxgUYQTAiiC5dhPAx-m_HRvNg",
  ];
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <>
      <section className="sponser-main pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 sponser-content">
              <h3>Schedule</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-main">
        <div className="container-fluid" styles={{ "margin-top": "10px" }}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={day === "1" ? "nav-link active" : "nav-link"}
                data-bs-toggle="tab"
                href="#day1"
                onClick={() => setDay("1")}
              >
                Day 1
              </a>
            </li>
            <li className="nav-item">
              <a
                className={day === "2" ? "nav-link active" : "nav-link"}
                data-bs-toggle="tab"
                href="#day2"
                onClick={() => setDay("2")}
              >
                Day 2
              </a>
            </li>
            <li className="nav-item">
              <a
                className={day === "3" ? "nav-link active" : "nav-link"}
                data-bs-toggle="tab"
                href="#day3"
                onClick={() => setDay("3")}
              >
                Day 3
              </a>
            </li>
            <li className="nav-item">
              <a
                className={day === "4" ? "nav-link active" : "nav-link"}
                data-bs-toggle="tab"
                href="#day4"
                onClick={() => setDay("4")}
              >
                Day 4
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div
              className={day === "1" ? "tab-pane active" : "tab-pane fade"}
              id="day1"
            >
              <h3>Day 1 -</h3>
              <img
                src={images[0]}
                alt=""
                srcset=""
                onClick={() => openImageViewer(0)}
              />
            </div>
            <div
              className={day === "2" ? "tab-pane active" : "tab-pane fade"}
              id="day2"
            >
              <h3>Day 2 -</h3>
              <img
                src={images[1]}
                alt=""
                srcset=""
                onClick={() => openImageViewer(1)}
              />
            </div>
            <div
              className={day === "3" ? "tab-pane active" : "tab-pane fade"}
              id="day3"
            >
              <h3>Day 3 -</h3>
              <img
                src={images[2]}
                alt=""
                srcset=""
                onClick={() => openImageViewer(2)}
              />
            </div>
            <div
              className={day === "4" ? "tab-pane active" : "tab-pane fade"}
              id="day4"
            >
              <h3>Day 4 -</h3>
              <img
                src={images[3]}
                alt=""
                srcset=""
                onClick={() => openImageViewer(3)}
              />
            </div>
          </div>
        </div>
      </section>
      <div style={{ zIndex: "9999999999" }}>
        {isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        )}
      </div>
    </>
  );
};

export default Schedule_Separate;
