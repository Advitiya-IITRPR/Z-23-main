import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const getprofile = useSelector((state) => state.getprofile).result;
  const [udatingPhone, setUpdatingPhone] = useState(false);
  const user = useSelector((state) => state.user).result;
  const [phone, setPhone] = useState(getprofile.phone);
  const updatePhone = async (e) => {
    e.preventDefault();
    setUpdatingPhone(true);
    if (phone.length !== 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/profile/phoneUpdate`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-firebase-token": user.private_key,
      },
      body: JSON.stringify({ email: getprofile.email, phone: phone }),
    })
      .then((response) => {
        if (response.status === 401) {
          toast.error("Token Expired, Login Again to Edit profile");
          setUpdatingPhone(false);
          return;
        }
        toast.success("Phone updated Successfully");
        setUpdatingPhone(false);
      })
      .catch((err) => {
        toast.error("Something went wrong...");
        setUpdatingPhone(false);
        return;
      });
    // console.log(res);
  };
  return (
    <>
      <section className="event-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-xs-12">
              <div className="event-heading sponser-content d-flex justify-content-between align-items-center">
                <h3>
                  My Profile(
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:text-white"
                  >
                    ←Back
                  </Link>
                  )
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-xs-12">
              <div className="profile-main-pic">
                <div className="profile-dp-main">
                  <div style={{ padding: "10px 0" }}>
                    <strong style={{ color: "red" }}>
                      You can only change the Mobile Number*
                    </strong>
                  </div>
                </div>
                <div className="my-profile-form">
                  <form onSubmit={updatePhone} noValidate>
                    <div className="form-sub-profile-main">
                      <div className="form-sub-profile">
                        <label className="form-group">
                          <span>Name -</span>
                          <input
                            type="text"
                            value={getprofile.name}
                            disabled
                            style={{ backgroundColor: "#f5f5f518" }}
                          />
                        </label>
                        <label className="form-group">
                          <span>Email -</span>
                          <input
                            type="text"
                            value={getprofile.email}
                            disabled
                            style={{ backgroundColor: "#f5f5f518" }}
                          />
                        </label>
                        <label className="form-group">
                          <span>Gender -</span>
                          <input
                            type="text"
                            value={getprofile.gender}
                            disabled
                            style={{ backgroundColor: "#f5f5f518" }}
                          />
                        </label>
                        <label className="form-group">
                          <span>College Name -</span>
                          <input
                            type="text"
                            value={getprofile.collegeName}
                            disabled
                            style={{ backgroundColor: "#f5f5f518" }}
                          />
                        </label>
                      </div>
                      <div className="form-sub-profile">
                        <label className="form-group dob-main">
                          <span>DOB -</span>
                          <input
                            type="text"
                            value={getprofile.dob}
                            disabled
                            style={{ backgroundColor: "#f5f5f518" }}
                          />
                        </label>
                        <label className="form-group">
                          <span>Phone Number(Edit) -</span>
                          <input
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </label>
                        <label className="form-group">
                          <span>College State -</span>
                          <input
                            type="text"
                            value={getprofile.collegeState}
                            disabled
                            style={{ backgroundColor: "#f5f5f518" }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="step-submit-btn">
                      <button type="submit" className="btn btn-primary">
                        {udatingPhone ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
