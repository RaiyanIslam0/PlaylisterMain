import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";

import EditToolbar from "./EditToolbar";

import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


export default function AppBanner() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    auth.logoutUser();
    store.closeCurrentList();
  };

  const handleCloseList = () => {
    store.closeCurrentList();
  };

  const menuId = "primary-search-account-menu";
  const loggedOutMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login/">Login</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/register/">Create New Account</Link>
      </MenuItem>
    </Menu>
  );
  let menuMsg = "Logout";
  if (auth.visitor === "GUEST") {
    menuMsg = "Return To Start Screen";
  }
  const loggedInMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>{menuMsg}</MenuItem>
    </Menu>
  );

  let editToolbar = "";
  let menu = loggedOutMenu;
  if (auth.loggedIn) {
    menu = loggedInMenu;
    if (store.currentList) {
      editToolbar = <EditToolbar />;
    }
  }

  function getAccountMenu(loggedIn) {
    let userInitials = auth.getUserInitials();
    console.log("userInitials: " + userInitials);
    if (loggedIn && auth.vistor === "REGISTERED")
      return <div>{userInitials}</div>;
    else return <AccountCircle />;
  }

  return (
    <Box style={{}} sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        id="AppBanner"
        style={{ backgroundColor: "grey", height: "55px" }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/"
              onClick={handleCloseList}
            >
              <img
                src={
                  "https://piazza.com/redirect/s3?bucket=uploads&prefix=paste%2Fk0ejaa6849h7ke%2F22c8d90eaf4003c2c24ca0fad72a1df99841f1b617601341110fbb45df72547a%2FScreen_Shot_2022-11-08_at_5.00.49_PM-removebg-preview.png"
                }
                style={{ height: "45px", marginTop: "2%", marginLeft: "-20px" }}
                alt="⬠"
              />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box variant="outlined" sx={{ height: "30px",color:"black", display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {getAccountMenu(auth.loggedIn)}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {menu}
    </Box>
  );
}





