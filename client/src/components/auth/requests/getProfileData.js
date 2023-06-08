import { toast } from "react-hot-toast";
import { getAuth } from "firebase/auth";

export async function fetchProfileData(dispatch, email, navigate, key) {
    const Logout = () => {
        const auth = getAuth();
        auth.signOut();
        dispatch({
            type: "GET_USER_ACTION",
            payload: { email: "" },
        });
        dispatch({ type: "GET_PROFILE_ACTION", payload: {} });
    };
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/profile/getUser`, {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8", "x-firebase-token": key },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data === "not found") {
                navigate("/register-step2");
                toast.error("Profile Not Found");
                return;
            }
            if (data.error === "Unauthorized: Invalid Firebase ID token") {
                toast.error("Session Expired, Login Again to get back to your account.");
                Logout();
                navigate("/login");
                return;
            }
            dispatch({ type: "GET_PROFILE_ACTION", payload: data });
            // toast.success("Profile Fetched Sucessfully")
        })
        .catch((err) => {
            console.log("Error to fetching the profile data");
            // navigate("/register-step2");
            return;
        });
    return;
}