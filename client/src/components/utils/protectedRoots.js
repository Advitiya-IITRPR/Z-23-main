import { Navigate, Outlet } from "react-router-dom";

function makeid(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrtstuvwxyz123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const ProtectedRoute = ({ isLoggedIn, redirectPath }) => {
  const id = makeid(4) + "-" + makeid(4) + "-" + makeid(4);
  if (!isLoggedIn) {
    return (
      <Navigate
        to={`/login?redirect_to=${redirectPath}&auth_user=false&session_id=${id}&cookies=false`}
        replace
      />
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
