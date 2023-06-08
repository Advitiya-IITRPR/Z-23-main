import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../../firebase-config";
import { useDispatch } from "react-redux";
import { fetchProfileData } from "../../auth/requests/getProfileData";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Login = () => {
  let query = useQuery();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  let navigate = useNavigate();
  const loginGoogle = async () => {
    const authentication = getAuth();
    await signInWithPopup(authentication, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // console.log(credential);
        // The signed-in user info.
        // const user = result.user;
        dispatch({
          type: "GET_USER_ACTION",
          payload: {
            email: result.user.email,
            private_key: result.user.accessToken,
          },
        });
        fetchProfileData(
          dispatch,
          result.user.email,
          navigate,
          result.user.accessToken
        );
        toast.success("Logged In  Successfully");
        if (query.get("redirect_to")) {
          navigate(query.get("redirect_to"));
        } else {
          navigate("/profile");
        }
        // ...
      })
      .catch((error) => {
        toast.error("Something went wrong, Try Again!");
      });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      toast.error("Fill required field first");
    } else {
      setLoading(true);
      const authentication = getAuth();
      await signInWithEmailAndPassword(
        authentication,
        user.email,
        user.password
      )
        .then((response) => {
          console.log(response);
          dispatch({
            type: "GET_USER_ACTION",
            payload: {
              email: user.email,
              private_key: response.user.accessToken,
            },
          });
          fetchProfileData(
            dispatch,
            user.email,
            navigate,
            response.user.accessToken
          );
          setLoading(false);
          toast.success("Logged In");
          if (query.get("redirect_to")) {
            console.log(query.get("redirect_to"));
            window.location.replace(query.get("redirect_to"));
          } else {
            navigate("profile");
          }
        })
        .catch((error) => {
          if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            toast.error("Email or Password is wrong");
            setLoading(false);
          } else {
            toast.error(error.code.slice(5, error.code.length));
            setLoading(false);
          }
        });
    }
    return;
  }
  return (
    <>
      <div
        className="container"
        style={{
          margin: "50px 0",
        }}
      >
        <div className="step-form login-form">
          <form onSubmit={handleSubmit} noValidate className="main-step-form">
            <div className="step-form-title text-center">
              <div className="step-form-heading-content">
                <h4>
                  <span className="orange-text">login</span>
                </h4>
              </div>
              <p>
                Enter the details inorder to get back into your existing
                account.
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="label-icon">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onInputChange}
                value={user.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">
                Password <span className="label-icon">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                name="password"
                onChange={onInputChange}
                value={user.password}
              />
            </div>
            <p className="account-para login-forgot-link">
              <Link to={"/forget-password"} class="sign-in-link">
                Forgot Password?
              </Link>
            </p>

            <div className="step-submit-btn">
              <button type="submit" className="btn btn-primary">
                {!loading ? "Sign In" : <div className="spinner"></div>}
              </button>
            </div>
            <p className="or-paragraph">OR</p>
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
                onClick={loginGoogle}
                className="register-btn"
                style={{
                  display: "flex",
                  flexWrap: "no wrap",
                  width: "fit-content",
                }}
              >
                <span>
                  <img src={require("../../../images/google.png")} />
                </span>
                Signin with Google{" "}
              </button>
              <p className="account-para">
                Don't have account yet?{" "}
                <Link to="/register-step1" className="sign-in-link">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
