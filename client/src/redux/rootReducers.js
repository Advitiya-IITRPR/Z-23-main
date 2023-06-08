import { combineReducers } from "redux";
import getprofileReducer from "../components/auth/reducers/profileReducers";
import getuserReducer from "../components/auth/reducers/userReducer";
import getannouncementReducer from "../components/auth/reducers/announcementReducer";




export default combineReducers({
    user: getuserReducer,
    getprofile: getprofileReducer,
    getannouncement: getannouncementReducer
});