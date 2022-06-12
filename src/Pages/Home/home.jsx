import "./home.css";
import Navbar from "../../Components/Navbar/navbar";

const Home = () => {
  return (
    <div className="home">
      <div className="home__wrapper">
        <Navbar />

        <h1 className="home__heading">Welcome to our website</h1>
      </div>
    </div>
  );
};

export default Home;
