import loader from "./loader.svg";
const Loader_Main = () => {
  return (
    <>
      <div
        className="loader-main"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <img
          src={loader}
          alt=""
          srcSet=""
          style={{ transform: "scale3d(1.2,1.2,1.2)" }}
        />
        <h1
          className="text-gray-400"
          style={{
            fontSize: "3rem",
            fontFamily: "Origin Tech Demo",
            marginTop: "50px",
          }}
        >
          <span
            className="text-orange-500"
            style={{
              fontSize: "4rem",
            }}
          >
            Z
          </span>
          eitgeist'23
        </h1>
      </div>
    </>
  );
};

export default Loader_Main;
