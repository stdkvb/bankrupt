import * as React from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Stack, Link } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";
import MapIcon from "@mui/icons-material/Map";
import CloseIcon from "@mui/icons-material/Close";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import logo from "../assets/images/logo.svg";

//check window width
let mobile;
if (window.innerWidth < 900) {
  mobile = true;
} else {
  mobile = false;
}

//left menu depends of window width
let drawerWidth;
if (mobile) {
  drawerWidth = "100vw";
} else {
  drawerWidth = 287;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: "0",
    }),
  },
}));

export default function MainLayout({ children }) {
  //drawer control
  const [open, setOpen] = React.useState(!mobile);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  //avatar letters
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  //profile menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="absolute"
        open={open}
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          boxShadow: {
            xs: "0px 4px 4px 0px rgba(156, 156, 156, 0.25)",
            md: "none",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            px: { xs: [2], md: [4] },
            height: "76px",
            width: "287px",
            borderRight: { xs: "none", md: "1px solid rgba(0, 0, 0, 0.12);" },
          }}
        >
          <Link href="#">
            <Box
              component="img"
              sx={{ height: { xs: "44px", md: "47px" } }}
              alt="Logo"
              src={logo}
            />
          </Link>
        </Toolbar>
        <Toolbar
          sx={{
            pr: { xs: [2], md: [4] },
            height: "76px",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              display: { md: "none" },
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            aria-label="close drawer"
            onClick={toggleDrawer}
            sx={{
              display: { md: "none" },
              ...(!open && { display: "none" }),
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            sx={{ display: { xs: "none", md: "block", height: "40px" } }}
          >
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{ display: { xs: "none", md: "block", height: "40px" } }}
          >
            <HelpOutlineOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: [2], display: { xs: "none", md: "block" } }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar {...stringAvatar("Kent Dodds")} />
          </IconButton>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={openMenu}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              minWidth: "220px",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem sx={{ pointerEvents: "none", cursor: "default" }}>
            <Stack>
              <ListItemText primary="Name" sx={{ m: 0 }} />
              <ListItemText
                primary="Company"
                sx={{ m: 0, color: "text.secondary" }}
              />
              <ListItemText
                primary="Email"
                sx={{ m: 0, color: "text.secondary" }}
              />
            </Stack>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <Avatar /> Профиль
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            Выйти
          </MenuItem>
        </Menu>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ height: { xs: "fit-content", md: "unset" } }}
      >
        <List
          component="nav"
          sx={{
            pt: "76px",
            height: "100%",
          }}
        >
          <ListItemButton
            sx={{ my: [3], px: [4], py: 0, display: { md: "none" } }}
          >
            <ListItemIcon>
              <Avatar {...stringAvatar("Kent Dodds")} />
            </ListItemIcon>
            <Stack>
              <ListItemText primary="Name" sx={{ m: 0 }} />
              <ListItemText
                primary="Email"
                sx={{ m: 0, color: "text.secondary" }}
              />
            </Stack>
          </ListItemButton>
          <ListItemButton sx={{ px: [4] }}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Каталог" />
          </ListItemButton>
          <ListItemButton sx={{ px: [4] }}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="База знаний" />
          </ListItemButton>
          <ListItemButton sx={{ px: [4] }}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Избранное" />
          </ListItemButton>
          <ListItemButton sx={{ px: [4] }}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Новости" />
          </ListItemButton>
          <ListItemButton sx={{ px: [4] }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Тарифы" />
          </ListItemButton>
          <ListItemButton sx={{ px: [4] }}>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Вопросы и ответы" />
          </ListItemButton>
          <ListItemButton sx={{ px: [4] }}>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Контакты" />
          </ListItemButton>
          <ListItemButton sx={{ px: [4], mt: [5], display: { md: "none" } }}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Выйти" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: "rgba(240, 242, 245, 1)",
          pt: "76px",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
          {/* <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper> */}
        </Container>
      </Box>
    </Box>
  );
}
