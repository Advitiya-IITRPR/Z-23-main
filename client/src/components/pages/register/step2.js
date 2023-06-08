import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData } from "../../auth/requests/getProfileData";
import Select from "react-select";
const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];
const Register_Step2 = (props) => {
  const dispatch = useDispatch();
  const getuser = useSelector((state) => state.user).result;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    college: "",
    collegeState: "",
    YearOfPassing: "",
    mobile: "",
    gender: "",
    dob: "",
    refferal: "",
  });
  let navigate = useNavigate();
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!getuser.email || !getuser.private_key) {
      toast.error("Bad Request, Access Denied!");
      return;
    }
    if (
      user.name === "" ||
      user.college === "" ||
      user.gender === "" ||
      user.YearOfPassing === "" ||
      user.collegeState === "" ||
      user.mobile === "" ||
      user.dob === ""
    ) {
      setLoading(true);
      setTimeout(() => {
        toast.error("Please fill required fields");
        setLoading(false);
      }, 1000);
      return;
    } else {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_API_ENDPOINT}/profile/addUser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-firebase-token": getuser.private_key,
        },
        body: JSON.stringify({
          name: user.name,
          email: getuser.email,
          collegeName: user.college,
          gender: user.gender,
          collegeState: user.collegeState,
          dob: user.dob,
          phone: user.mobile,
          YearOfPassing: user.YearOfPassing,
          referral: user.refferal,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          setLoading(false);
          fetchProfileData(
            dispatch,
            getuser.email,
            navigate,
            getuser.private_key
          );
          toast.success("Saved");
          window.location.replace("/profile");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error("Something went wrong");
        });
    }
    return;
  };
  const handleSelectedGender = (selectedOption) => {
    setUser({
      ...user,
      gender: selectedOption.label,
    });
  };
  return (
    <>
      <div
        className="container"
        style={{
          margin: "50px 0",
        }}
      >
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <form
              id="regForm"
              className="main-step-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-heading-merge">
                <div className="form-heading-left">
                  <h3 id="register">Personal Details</h3>
                  <p
                    style={{
                      padding: "20px 0",
                      fontStyle: "italic",
                    }}
                  >
                    Enter the details inorder to create your account
                  </p>
                </div>
                <div className="all-steps" id="all-steps">
                  <span className="step"></span>
                  <span className={"step active"}></span>
                </div>
              </div>
              <div>
                <label className="container">
                  <p>
                    Email(Saved)<span className="red">*</span>
                  </p>
                  <input
                    type="email"
                    placeholder=""
                    name="email"
                    value={getuser.email}
                    style={{
                      cursor: "not-allowed",
                      backgroundColor: "#ff7b00",
                    }}
                    disabled
                  />
                </label>
                <label className="container">
                  <p>
                    Student Name<span className="red">*</span>
                  </p>
                  <input
                    type="text"
                    placeholder=""
                    name="name"
                    value={user.name}
                    onChange={onInputChange}
                  />
                </label>
                <label className="container">
                  <p>
                    College Name<span className="red">*</span>
                  </p>
                  <input
                    type="text"
                    placeholder=""
                    name="college"
                    value={user.college}
                    onChange={onInputChange}
                    //   For invalid
                    //   style={{
                    //     border: "1px solid red",
                    //   }}
                  />
                </label>
                <label className="container">
                  <p>
                    College State<span className="red">*</span>
                  </p>
                  <input
                    type="text"
                    placeholder=""
                    name="collegeState"
                    value={user.collegeState}
                    onChange={onInputChange}
                  />
                </label>
                <label className="container">
                  <p>
                    Year of Passing<span className="red">*</span>
                  </p>
                  <input
                    type="text"
                    placeholder=""
                    name="YearOfPassing"
                    value={user.YearOfPassing}
                    onChange={onInputChange}
                  />
                </label>
                <label className="container">
                  <p>
                    Phone Number<span className="red">*</span>
                  </p>
                  <input
                    type="text"
                    placeholder=""
                    name="mobile"
                    value={user.mobile}
                    onChange={onInputChange}
                  />
                </label>
                <div className="merge-main">
                  <label className="container">
                    <p>
                      Gender<span className="red">*</span>
                    </p>
                    <Select
                      classNamePrefix="select"
                      name="gender"
                      options={options}
                      styles={colourStyles}
                      onChange={handleSelectedGender}
                      placeholder="Gender"
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </label>
                  <label className="container">
                    <p>
                      Date of Birth<span className="red">*</span>
                    </p>
                    <input
                      type="date"
                      placeholder=" Date of Birth"
                      name={"dob"}
                      value={user.dob}
                      onChange={onInputChange}
                    />
                  </label>
                </div>
                <label className="container">
                  <p>
                    Referral Code(if any)<span className="red"></span>
                  </p>
                  <input
                    type="text"
                    placeholder=""
                    name="refferal"
                    value={user.refferal}
                    onChange={onInputChange}
                  />
                </label>
              </div>
              <div styles={{ overflow: "auto" }}>
                <div styles={{ "text-align": "center" }}>
                  {" "}
                  <button
                    id="nextBtn"
                    type="submit"
                    style={{
                      minWidth: "170px",
                      minHeight: "70px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={loading ? true : false}
                  >
                    {loading && <div className="spinner"></div>}
                    {!loading && "Save"}
                  </button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#fff",
    border: "1px solid #ff7b00",
    outline: "none !important",
    boxShadow: "none",
    width: "100%",
    margin: "-10px",
    transform: "translateX(5px) translateY(15px)",
  }),

  menu: (styles) => ({
    ...styles,
    background: "rgba(0,0,0,0.7)",
    border: "1px solid rgba(0,0,0,0.1)",
    transform: "translateX(5px) translateY(15px)",
    color: "white",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: !(isFocused || isSelected) ? "transparent" : "#ff7b00",
      color: "#fff",
      fontWeight: "600 !important",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};
export default Register_Step2;
