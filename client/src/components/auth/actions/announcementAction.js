const getannouncement = (profile) => dispatch => {
    dispatch({
        type: "GET_ANNOUNCEMENT_ACTION",
        payload: profile
    });
};

export default getprofile;