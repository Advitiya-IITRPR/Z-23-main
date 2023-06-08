import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../../firebase-config";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Terms_and_Conditions } from "../t&c";

const Register_Step1 = () => {
  const dispatch = useDispatch();
  const [isGoogle, setIsGoogle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const registerGoogle = () => {
    setLoading(true);
    setIsGoogle(true);

    const authentication = getAuth();
    signInWithPopup(authentication, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        dispatch({
          type: "GET_USER_ACTION",
          payload: {
            email: result.user.email,
            private_key: result.user.accessToken,
          },
        });
        toast.success("Account Created Successfully");
        setLoading(false);
        // navigate("/register-step2");
        window.location.replace("/register-step2");
        // ...
      })
      .catch((error) => {
        toast.error("Something went wrong");
        setLoading(false);
      });
    setIsGoogle(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isGoogle) {
      if (user.cpassword === "" || user.email === "" || user.password === "") {
        toast.error("Please fill required fields first");
      } else if (user.cpassword === user.password) {
        const authentication = getAuth();
        setLoading(true);
        await createUserWithEmailAndPassword(
          authentication,
          user.email,
          user.password
        )
          .then((response) => {
            toast.success("Account Created Successfuly");
            // response.user.sendEmailVerification();
            // authentication.signOut();
            dispatch({
              type: "GET_USER_ACTION",
              payload: {
                email: user.email,
                private_key: response.user.accessToken,
              },
            });
            setLoading(false);
            window.location.replace("/register-step2");
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              toast.error("Email Already in Use");
            } else if (error.code === "auth/weak-password") {
              toast.error("Weak Password");
            } else if (error.code === "auth/invalid-email") {
              toast.error("Invalid Email");
            } else {
              toast.error(error.code);
            }
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password doesn't match");
        setLoading(false);
      }
    }
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
              onSubmit={handleSubmit}
              noValidate
              className="main-step-form"
              id="regForm"
            >
              <div className="form-heading-merge">
                <div className="form-heading-left">
                  <h3 id="register"> register </h3>{" "}
                  <p
                    style={{
                      padding: "20px 0",
                      fontStyle: "italic",
                    }}
                  >
                    Enter the details inorder to create your account{" "}
                  </p>{" "}
                </div>{" "}
                <div className="all-steps" id="all-steps">
                  <span className="step active"> </span>{" "}
                  <span className={"step"}> </span>{" "}
                </div>{" "}
              </div>{" "}
              <div>
                <label className="container">
                  <p>
                    Email <span className="red"> * </span>{" "}
                  </p>{" "}
                  <input
                    type="email"
                    value={user.email}
                    onChange={onInputChange}
                    placeholder=""
                    name="email"
                  />
                </label>{" "}
                <label className="container">
                  <p>
                    Password <span className="red"> * </span>{" "}
                  </p>{" "}
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={onInputChange}
                    placeholder=""
                  />
                </label>{" "}
                <label className="container">
                  <p>
                    Confirm Password <span className="red"> * </span>{" "}
                  </p>{" "}
                  <input
                    type="password"
                    name="cpassword"
                    value={user.cpassword}
                    onChange={onInputChange}
                    placeholder=""
                  />
                </label>{" "}
              </div>{" "}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <p className="text-yellow-50 my-6">By clicking Sign Up, you agree to our <Link to="https://docs.google.com/document/d/1sbkuqTa4NJerPWf0_0oqvKULshpKSFpehy-i0HD8q3A/edit?usp=share_link"  className="text-blue-600" target={"_blank"}>Terms and Conditions</Link> and <Link  to="/legal"  className="text-blue-600" target={"_blank"}>Privacy Policy</Link>. You may receive SMS notifications from us and can opt out at any time.</p>
              </div>
              <div styles={{ overflow: "auto" }}>
                <div styles={{ "text-align": "center" }}>
                  {" "}
                  <button id="nextBtn" type="submit">
                    {" "}
                    {!loading ? (
                      "Sign Up"
                    ) : (
                      <>
                      <div className="spinner"></div>
                      </>
                    )}{" "}
                  </button>{" "}
                </div>{" "}
              </div>
              <p className="or-paragraph"> OR </p>{" "}
              <div
                className="registerd-btn-area"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <button
                  onClick={registerGoogle}
                  className="register-btn"
                  style={{
                    display: "flex",
                    flexWrap: "no wrap",
                    width: "fit-content",
                  }}
                >
                  <span>
                    <img src={require("./../../../images/google.png")} />{" "}
                  </span>
                  Register with Google{" "}
                </button>{" "}
                <p className="account-para">
                  Already have an account ?{" "}
                  <Link to="/login" className="sign-in-link">
                    Sign In{" "}
                  </Link>{" "}
                </p>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default Register_Step1;
