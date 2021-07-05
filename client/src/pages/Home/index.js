import { useSelector } from "react-redux";

const Home = ({ history }) => {
  const { user } = useSelector(state => ({ ...state }))
  return <div>{user.role === 'admin' ? 'Home Admin' : 'Home Student'}</div>;
};

export default Home;
