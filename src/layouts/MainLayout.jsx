import React, { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Avatar, Stack, Link, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CircularProgress from "@mui/material/CircularProgress";

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
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddIcon from "@mui/icons-material/Add";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import api from "../utils/Api";
import Popup from "../components/Popup";
import CreateFolder from "../components/CreateFolder";

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

export default function MainLayout({
  loading,
  onLogout,
  folders,
  updateFolders,
}) {
  const navigate = useNavigate();

  //current page
  let location = useLocation();
  const pathName = location.pathname;
  function activateMenuItem(pathname) {
    if (pathname === pathName) {
      return "active";
    }
  }

  //drawer control
  const [open, setOpen] = useState(!mobile);
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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(null);
  const openProfileMenu = Boolean(isProfileMenuOpen);
  const handleProfileMenuClick = (event) => {
    setIsProfileMenuOpen(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setIsProfileMenuOpen(null);
  };

  //folder menu
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isFolderMenuOpen, setIsFolderMenuOpen] = useState(null);
  const openFolderMenu = Boolean(isFolderMenuOpen);

  //create new folder
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleCloseCreateFolders = () => {
    setCreateFolder(false);
  };

  //rename folder
  const [renameFolder, setRenameFolder] = useState(false);

  const handleRenameFolder = (event) => {
    event.preventDefault();
    api
      .renameFolder(folderName, currentFolder)
      .then((data) => {
        if (data.status === "success") {
          updateFolders();
        } else {
          alert("Ошибка сервера, попробуйте позже");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setRenameFolder(false);
  };

  //delete folder
  const [deleteFolder, setDeleteFolder] = useState(false);

  const handleDeleteFolder = () => {
    api
      .deleteFolder(currentFolder)
      .then((data) => {
        if (data.status === "success") {
          navigate("/favorites");
          updateFolders();
        } else {
          alert("Ошибка сервера, попробуйте позже");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteFolder(false);
  };

  //folders list
  const [foldersList, setFoldersList] = useState(folders);

  //moving folders up and down in list
  const handleFolderUp = (id) => {
    setFoldersList(folders);
    for (let i = 1; i < foldersList.length; i++) {
      if (foldersList[i].id === id) {
        // Swap objects
        let temp = foldersList[i - 1];
        foldersList[i - 1] = foldersList[i];
        foldersList[i] = temp;
        break; // Stop loop after swapping
      }
    }

    api
      .sendFolders(foldersList)
      .then((data) => {
        if (data.status === "success") {
          setFoldersList(foldersList);
        } else {
          alert("Ошибка сервера, попробуйте позже");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFolderDown = (id) => {
    setFoldersList(folders);
    for (let i = 0; i < foldersList.length - 1; i++) {
      if (foldersList[i].id === id) {
        // Swap objects
        let temp = foldersList[i + 1];
        foldersList[i + 1] = foldersList[i];
        foldersList[i] = temp;
        break; // Stop loop after swapping
      }
    }

    api
      .sendFolders(foldersList)
      .then((data) => {
        if (data.status === "success") {
          setFoldersList(foldersList);
        } else {
          alert("Ошибка сервера, попробуйте позже");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //disable up down button
  const [isFolderFirst, setIsFolderFirst] = useState(false);
  const [isFolderLast, setIsFolderLast] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
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
            <Link href="https://банкротный-вестник.рф" target="_blank">
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
              component={RouterLink}
              to={"/"}
              sx={{ display: { xs: "none", md: "flex", height: "40px" } }}
            >
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton
              component={RouterLink}
              to={"/qa"}
              sx={{ display: { xs: "none", md: "flex", height: "40px" } }}
            >
              <HelpOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={handleProfileMenuClick}
              size="small"
              sx={{ ml: [2], display: { xs: "none", md: "block" } }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar {...stringAvatar("Kent Dodds")} />
            </IconButton>
            <Menu
              anchorEl={isProfileMenuOpen}
              id="account-menu"
              open={openProfileMenu}
              onClose={handleProfileMenuClose}
              onClick={handleProfileMenuClose}
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
              <MenuItem
                onClick={handleProfileMenuClose}
                component={RouterLink}
                to={"/profile"}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                Профиль
              </MenuItem>
              <Divider />
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                Выйти
              </MenuItem>
            </Menu>
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
              className={activateMenuItem("/profile")}
              sx={{ my: [3], px: [4], py: 0, display: { md: "none" } }}
              component={RouterLink}
              to={"/profile"}
              onClick={mobile ? toggleDrawer : () => {}}
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
            <ListItemButton
              className={activateMenuItem("/")}
              sx={{ px: [4] }}
              component={RouterLink}
              to={"/"}
              onClick={mobile ? toggleDrawer : () => {}}
            >
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Каталог" />
            </ListItemButton>
            <Accordion sx={{ boxShadow: "none", m: "0 !important" }}>
              <ListItemButton
                className={activateMenuItem("/wiki")}
                sx={{
                  px: [4],
                  pr: [1],
                  maxHeight: "48px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  component={RouterLink}
                  to="/wiki"
                  sx={{ display: "flex", textDecoration: "none !important" }}
                  onClick={mobile ? toggleDrawer : () => {}}
                >
                  <ListItemIcon sx={{ height: "24px" }}>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="База знаний" sx={{ m: 0 }} />
                </Link>
                <AccordionSummary
                  expandIcon={
                    <IconButton>
                      <ExpandMoreOutlinedIcon />
                    </IconButton>
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    p: 0,
                  }}
                ></AccordionSummary>
              </ListItemButton>
              <AccordionDetails sx={{ p: 0 }}>
                <ListItemButton
                  sx={{ px: [4] }}
                  onClick={mobile ? toggleDrawer : () => {}}
                >
                  <ListItemIcon>
                    <DescriptionOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Купленные документы" />
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ boxShadow: "none", m: "0 !important" }}>
              <ListItemButton
                className={activateMenuItem("/favorites")}
                sx={{
                  px: [4],
                  pr: [1],
                  maxHeight: "48px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  component={RouterLink}
                  to="/favorites"
                  sx={{ display: "flex", textDecoration: "none !important" }}
                  onClick={mobile ? toggleDrawer : () => {}}
                >
                  <ListItemIcon sx={{ height: "24px" }}>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Избранное" sx={{ m: 0 }} />
                </Link>
                <AccordionSummary
                  expandIcon={
                    <IconButton>
                      <ExpandMoreOutlinedIcon />
                    </IconButton>
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    p: 0,
                  }}
                ></AccordionSummary>
              </ListItemButton>
              <AccordionDetails sx={{ p: 0 }}>
                <ListItemButton
                  sx={{ px: [4] }}
                  onClick={() => {
                    setCreateFolder(true);
                  }}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Создать папку" />
                </ListItemButton>
                <Stack
                  sx={{
                    maxHeight: "265px",
                    overflowY: folders.length > 4 ? "scroll" : "unset",
                  }}
                >
                  {folders
                    .filter((folder) => folder.main == false)
                    .map((folder, i) => {
                      return (
                        <ListItemButton
                          key={i}
                          sx={{
                            pl: [4],
                            pr: [0],
                            gap: [1],
                            justifyContent: "space-between",
                          }}
                        >
                          <Link
                            component={RouterLink}
                            to={`/favorites/${folder.id}`}
                            sx={{
                              display: "flex",
                              overflow: "hidden",
                              alignItems: "center",
                              textDecoration: "none !important",
                            }}
                            onClick={mobile ? toggleDrawer : () => {}}
                          >
                            <ListItemIcon sx={{ minWidth: "40px" }}>
                              <FolderOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={folder.name}
                              sx={{
                                "& span": {
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                },
                              }}
                              title={folder.name}
                            />
                          </Link>
                          <IconButton
                            onClick={(event) => {
                              setCurrentFolder(folder.id);
                              setIsFolderMenuOpen(event.currentTarget);
                              //disable buttons up/down for first and last folder
                              if (i == 0) {
                                console.log(i);
                                setIsFolderFirst(true);
                              }
                              if (i == folders.length - 2) {
                                setIsFolderLast(true);
                              }
                            }}
                            sx={{
                              display: {
                                xs: "none",
                                md: "block",
                                height: "40px",
                              },
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </ListItemButton>
                      );
                    })}
                  <Menu
                    anchorEl={isFolderMenuOpen}
                    id="folder-menu"
                    open={openFolderMenu}
                    onClose={() => {
                      setIsFolderMenuOpen(null);
                      setIsFolderFirst(false);
                      setIsFolderLast(false);
                    }}
                    onClick={() => {
                      setIsFolderMenuOpen(null);
                      setIsFolderFirst(false);
                      setIsFolderLast(false);
                    }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        minWidth: "220px",
                        overflow: "visible",
                        boxShadow:
                          "0px 5px 5px -3px rgba(0, 0, 0, 0.20), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",

                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                      },
                    }}
                    transformOrigin={{
                      horizontal: "left",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: "left",
                      vertical: "bottom",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleFolderUp(currentFolder);
                      }}
                      disabled={isFolderFirst}
                    >
                      Переместить вверх
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleFolderDown(currentFolder);
                      }}
                      disabled={isFolderLast}
                    >
                      Переместить вниз
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        setRenameFolder(true);
                        setIsFolderMenuOpen(null);
                      }}
                    >
                      Переименовать папку
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setDeleteFolder(true);
                      }}
                    >
                      Удалить папку
                    </MenuItem>
                  </Menu>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <ListItemButton
              className={activateMenuItem("/news")}
              sx={{ px: [4] }}
              component={RouterLink}
              to={"/news"}
              onClick={mobile ? toggleDrawer : () => {}}
            >
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Новости" />
            </ListItemButton>
            <ListItemButton
              className={activateMenuItem("/rates")}
              sx={{ px: [4] }}
              component={RouterLink}
              to={"/rates"}
              onClick={mobile ? toggleDrawer : () => {}}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Тарифы" />
            </ListItemButton>
            <ListItemButton
              className={activateMenuItem("/qa")}
              sx={{ px: [4] }}
              component={RouterLink}
              to={"/qa"}
              onClick={mobile ? toggleDrawer : () => {}}
            >
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Вопросы и ответы" />
            </ListItemButton>
            <ListItemButton
              className={activateMenuItem("/contacts")}
              sx={{ px: [4] }}
              component={RouterLink}
              to={"/contacts"}
              onClick={mobile ? toggleDrawer : () => {}}
            >
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="Контакты" />
            </ListItemButton>
            <ListItemButton
              sx={{ px: [4], mt: [5], display: { md: "none" } }}
              onClick={onLogout}
            >
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
          {loading ? (
            <CircularProgress
              sx={{
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                margin: "auto",
              }}
            />
          ) : (
            <Outlet />
          )}
        </Box>
      </Box>
      <CreateFolder
        isPopupOpen={createFolder}
        onClose={handleCloseCreateFolders}
        updateFolders={updateFolders}
      />
      <Popup isPopupOpen={renameFolder} component="form">
        <IconButton
          onClick={() => {
            setRenameFolder(false);
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3}>
          Переименовать папку
        </Typography>
        <Box component="form" onSubmit={handleRenameFolder}>
          <TextField
            label="Название папки"
            variant="standard"
            size="medium"
            fullWidth
            id="folderName"
            name="folderName"
            sx={{ mb: 2 }}
            required
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <Button variant="contained" fullWidth sx={{ mt: 4 }} type="submit">
            Применить
          </Button>
        </Box>
      </Popup>
      <Popup isPopupOpen={deleteFolder} component="form">
        <IconButton
          onClick={() => {
            setDeleteFolder(false);
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3}>
          Удалить папку
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Вы уверены, что хотите удалить папку?
        </Typography>
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setDeleteFolder(false);
            }}
          >
            Отменить
          </Button>
          <Button variant="contained" fullWidth onClick={handleDeleteFolder}>
            Удалить
          </Button>
        </Box>
      </Popup>
    </>
  );
}
