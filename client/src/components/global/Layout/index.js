import React from 'react';
import { NavLink } from 'react-router-dom'
import { CssBaseline, Divider } from '@material-ui/core';
import { Home, Person, SettingsApplications } from '@material-ui/icons';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Logo from '../../../assets/images/logo.png'
import Header from '../Header'
import Sidebar from '../Sidebar'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundImage: `radial-gradient(
      farthest-side at 100% 100%,
      rgba(22, 23, 41, 1),
      rgba(20, 21, 37, 0.4777),
      rgba(19, 19, 33, 0.1)
    )`,
    backgroundColor: "#333867"
  },
  sidebar: {
    minHeight: '100vh',
    backgroundColor: "#333867",
    backgroundImage: `radial-gradient(
      farthest-side at 100% 100%,
      rgba(22, 23, 41, 1),
      rgba(20, 21, 37, .4),
      rgba(19, 19, 33, .4)
    )`,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,.2);'
  }
}));

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const StyledNavLink = ({ children, ...props }) => (
    <NavLink {...props}>
      {children}
    </NavLink>
  );
  const listRoutes = [
    { to: '/', icon: Home, label: 'Home', exact: true },
    { to: '/students', icon: Person, label: 'Siswa' },
    { to: '/teachers', icon: Person, label: 'Guru' },
    { to: '/profile', icon: SettingsApplications, label: 'Profile' },
  ]

  const container = window !== undefined ? () => window().document.body : undefined;


  const drawer = (
    <div className={classes.sidebar} >
      <div className={classes.toolbar} >
        <div className="flex flex-col items-center space-y-1 justify-center text-white">
          <img src={Logo} width="60" alt="logo-sdit-almanar" />
          <div className="flex flex-col items-center mt-2">
            <span>SDIT Al-Manar</span>
            <span>Pekanbaru</span>
          </div>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className="flex flex-col space-y-3 mt-6">
        {listRoutes.map((item, index) => (
          <StyledNavLink key={index} {...item} className="flex items-center space-x-2 px-4 py-2" activeClassName="active_route">
            <item.icon />
            <span>{item.label}</span>
          </StyledNavLink>
        ))}
      </div>
      <Divider className={classes.divider} />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header classes={classes} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar classes={classes} theme={theme} drawer={drawer} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} container={container} />
      <div className="w-full mt-24 px-6">

        {children}
      </div>
    </div>
  );
}


export default ResponsiveDrawer;
