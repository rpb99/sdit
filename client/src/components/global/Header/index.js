import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { logoutUser } from "../../../api/authApi";

const Header = ({ handleDrawerToggle, classes }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleLogout = () =>
    logoutUser().then(() => {
      Cookies.remove("isLoggedIn", {
        path: "",
        expires: new Date(new Date().getTime() + 1),
      });
      Cookies.remove("userLogged", {
        path: "",
        expires: new Date(new Date().getTime() + 1),
      });
      dispatch({ type: "LOGOUT", payload: null });
      history.push("/login");
    });

  return (
    <AppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className="flex flex-1 justify-end space-x-4 text-white">
          <span>
            {user.first_name}
          </span>
          <div onClick={handleLogout} className="cursor-pointer">
            Logout
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
