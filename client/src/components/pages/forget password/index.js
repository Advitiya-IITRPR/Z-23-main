import { Link } from "react-router-dom";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";

const ForgetPassword = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      toast.error("Fill required field first");
    } else {
      await sendPasswordResetEmail(email);
      toast.success(
        "Email sent successfully. Please check promotions or spam folder also"
      );
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <>
      <div
        className="container"
        style={{
          margin: "50px 0",
        }}
      >
        <div className="step-form login-form">
          <form
            onSubmit={handleResetPassword}
            noValidate
            className="main-step-form"
          >
            <div className="step-form-title text-center">
              <div className="step-form-heading-content">
                <h4>
                  <span className="orange-text">forget password?</span>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="account-para login-forgot-link">
              <Link to="/login" class="sign-in-link">
                Login?
              </Link>
            </p>
            <div className="step-submit-btn">
              <button type="submit" className="btn btn-primary">
                {!loading && "Submit"}
                {loading && <div className="spinner"></div>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
