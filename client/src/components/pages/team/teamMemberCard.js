import "./teamStyles.css";

export default function TeamMemberCard({
  imgName,
  name,
  email,
  linkedin,
  instagram,
  mobile,
}) {
  return (
    <>
      <div className="col-sm-3 col-xs-14" style={{ transform: "scale(0.9)" }}>
        <div className="sponser-image-content">
          <img
            src={require(`./pics/${imgName}`)}
            alt=""
            srcSet=""
            style={{ width: "400px", height: "400px" }}
          />
          <div className="team-content text-center">
            <h4 style={{ marginTop: "5px" }}>{name}</h4>
            {/* <h6>{email}</h6> */}
            <h6>+91-{mobile}</h6>
          </div>
          <ul className="team-member-social"  style={{display: "flex", justifyContent:"space-around"}}>
            {/* <li>
              <a
                target={"_blank"}
                className=""
                href={`tel:+91${mobile}`}
                rel="noreferrer"
              >
                <i
                  className="fa fa-phone"
                  style={{ transform: "scale(0.85) rotate(180deg)" }}
                ></i>
              </a>
            </li> */}
            <li>
              <a
                target={"_blank"}
                className=""
                href={`mailto:${email}`}
                rel="noreferrer"
              >
                <i className="fa fa-envelope-o" style={{fontSize:"22px"}}></i>
              </a>
            </li>
            <li>
              <a
                target={"_blank"}
                className=""
                href={linkedin}
                rel="noreferrer"
              >
                <i className="fa fa-linkedin" style={{fontSize:"22px"}}></i>
              </a>
            </li>
            <li>
              <a
                className=""
                href={instagram}
                target={"_blank"}
                rel="noreferrer"
              >
                <i className="fa fa-instagram" style={{fontSize:"22px"}}></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
