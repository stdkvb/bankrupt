import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Avatar, Stack } from "@mui/material";
import { Link } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";
import MapIcon from "@mui/icons-material/Map";
import CloseIcon from "@mui/icons-material/Close";

import logo from "./assets/images/logo.svg";

let mobile;
if (window.innerWidth < 900) {
  mobile = true;
} else {
  mobile = false;
}

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

export default function Dashboard() {
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

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="absolute"
        open={open}
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
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
          <IconButton sx={{ display: { xs: "none", md: "block" } }}>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton sx={{ display: { xs: "none", md: "block" } }}>
            <HelpOutlineOutlinedIcon />
          </IconButton>
          <IconButton sx={{ ml: [2], display: { xs: "none", md: "block" } }}>
            <Avatar {...stringAvatar("Kent Dodds")} />
          </IconButton>
        </Toolbar>
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
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Container>
      </Box>
    </Box>
  );
}
