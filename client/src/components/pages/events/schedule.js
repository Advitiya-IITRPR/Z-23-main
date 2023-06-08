import CS from "./coming soon.png";

const Schedule = () => {
  return (
    <>
      <section className="schedule-main-sec">
        <div className="container-fluid" styles={{ marginTop: "10px" }}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href="#day-one"
              >
                Day 1
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#day-two">
                Day 2
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#day-three">
                Day 3
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#day-four">
                Day 4
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="day-one">
              <img src="https://drive.google.com/uc?export=view&id=1Nn0CKs1S3A3WNfqUUuryJF2X3KbOdwhg" />
            </div>
            <div className="tab-pane fade" id="day-two">
            <img src="https://drive.google.com/uc?export=view&id=1CIxDh9Ci0KTf0OsdmHKwlBQsLPDn8FrT" />
            </div>
            <div className="tab-pane fade" id="day-three">
            <img src="https://drive.google.com/uc?export=view&id=1v3PbRcqDpvwEhAsoYRKDMFfPmPvm4PnI" />
            </div>
            <div className="tab-pane fade" id="day-four">
            <img src="https://drive.google.com/uc?export=view&id=1B1Ac5_ytxgUYQTAiiC5dhPAx-m_HRvNg" />
            </div> 
          </div>
        </div>
      </section>
    </>
  );
};

export default Schedule;
