import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    !user && history.push("/login");
  }, [user]);

  return <div>Home</div>;
};

export default Home;
