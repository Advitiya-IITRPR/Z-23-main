import "./App.css";
import PaymentSuccess from "./components/payment/PaymentSuccess";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Navbar from "./components/pages/home/navbar";
import Footer from "./components/pages/home/footer";
import Register_Step1 from "./components/pages/register/step1";
import Register_Step2 from "./components/pages/register/step2";
import Faq from "./components/pages/faqs";
import EventsPage from "./components/pages/events";
import TeamPage from "./components/pages/team";
import Sponsers from "./components/pages/sponsers";
import { Toaster } from "react-hot-toast";
import ForgetPassword from "./components/pages/forget password";
import Profile from "./components/pages/profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "./components/pages/profile/editProfile";
import ScrollToTop from "./components/ScrollToTop";
import Loader_Main from "./components/loader main";
import Legal from "./components/pages/legal Docx";
import ProtectedRoute from "./components/utils/protectedRoots";
import RegisterEventSeprate from "./components/pages/events/eventShowSeprate";
import Announcements from "./components/pages/announcement";
import Schedule_Separate from "./components/pages/schedule";
// import { fetchAnnouncementData } from "./components/auth/requests/getAnnData";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const getuser = useSelector((state) => state.user).result;
  useEffect(() => {
    // fetchAnnouncementData(dispatch);
    window.onload = () => {
      setLoading(false);
    };
  }, []);
  useEffect(() => {
    // Forcefuly Loading end
    setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 5000);
  }, []);
  return (
    <>
      {loading && <Loader_Main />}
      {!loading && (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/sponsers" element={<Sponsers />} />
            <Route path="/register-step2" element={<Register_Step2 />} />
            <Route
              path="/announcements"
              element={<Announcements ref_elem="seprate" />}
            />
            <Route
              path="/profile"
              element={
                !getuser.email ? (
                  <ProtectedRoute
                    isLoggedIn={getuser.email ? true : false}
                    redirectPath={"profile"}
                  />
                ) : (
                  <Profile />
                )
              }
            />
            <Route
              path="/edit-profile"
              element={
                !getuser.email ? (
                  <ProtectedRoute
                    isLoggedIn={getuser.email ? true : false}
                    redirectPath={"edit-profile"}
                  />
                ) : (
                  <EditProfile />
                )
              }
            />
            <Route path="/schedule" element={<Schedule_Separate />} />
            <Route path="/event-register" element={<RegisterEventSeprate />} />
            <Route
              path="/paymentsuccess"
              element={
                !getuser.email ? (
                  <ProtectedRoute
                    isLoggedIn={getuser.email ? true : false}
                    redirectPath={"paymentsuccess"}
                  />
                ) : (
                  <PaymentSuccess />
                )
              }
            />
            {/* <Route path="/button" element={<Button event="Dance" />} /> */}
            {/* <Route path="/button" element={<PassButton  pass="gold" />} /> */}
            {!getuser.email && (
              <>
                {" "}
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/register-step1" element={<Register_Step1 />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
