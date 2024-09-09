import { useState, useContext, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  Stack,
  Link,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Modal,
  Box,
  FormControlLabel,
  Checkbox,
  Pagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddIcon from "@mui/icons-material/Add";
import LanguageIcon from "@mui/icons-material/Language";

import Popup from "./Popup";
import CreateFolder from "./CreateFolder";
import api from "../utils/Api";
import { PaginationContext } from "../utils/PaginationContext";

const DocumentsList = ({
  data,
  inFavorites,
  folders,
  folderId,
  updateFolders,
  updateFavorites,
  updateCatalog,
}) => {
  //current documemt
  const [currentDocument, setCurrentDocument] = useState(null);

  //row menu
  const [isDocumentMenuOpen, setIsDocumentMenuOpen] = useState(null);
  const openDocumentMenu = Boolean(isDocumentMenuOpen);
  const handleDocumentMenuClick = (event, document) => {
    setIsDocumentMenuOpen(event.currentTarget);
    setCurrentDocument(document);
  };

  //document detail modal controller
  const [open, setOpen] = useState(false);
  const handleOpen = (document) => {
    setCurrentDocument(document);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //add to favorites
  const [addToFavorites, setAddToFavorites] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [checkedFolders, setCheckedFolders] = useState([]);
  const [checkedFoldersNames, setCheckedFoldersNames] = useState([]);

  const handleAddToFavorites = () => {
    api
      .addToFavorites(currentDocument.id, checkedFolders)
      .then((data) => {
        if (data.status === "success") {
          setIsInFavorites(!isInFavorites);
          updateCatalog();
          updateFavorites();
        } else {
          alert("Ошибка сервера, попробуйте позже");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setAddToFavorites(false);
    setCheckedFolders([]);
    setFolderChecked(false);
  };

  //remove from favorites
  const [isRemoved, setIsRemoved] = useState(false);
  const handleRemoveFromFavorites = () => {
    api
      .removeFromFavorites(currentDocument.id, folderId)
      .then((data) => {
        if (data.status === "success") {
          //success notification
          setIsRemoved(true);
          updateCatalog();
          updateFavorites();
        } else {
          alert("Ошибка сервера, попробуйте позже");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //move to another folder
  const [moveToFolder, setMoveToFolder] = useState(false);
  const [isMoved, setIsMoved] = useState(false);

  const handleMoveToFolder = () => {
    api
      .moveToFolder(currentDocument.id, folderId, checkedFolders)
      .then((data) => {
        if (data.status === "success") {
          //success notification
          setIsMoved(true);
          updateCatalog();
          updateFavorites();
        } else {
          alert("Ошибка сервера, попробуйте позже");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setMoveToFolder(false);
    setCheckedFolders([]);
    setFolderChecked(false);
  };

  //send to mail
  const [sendToMail, setSendToMail] = useState(false);
  const [isSentToMail, setIsSentToMail] = useState(false);
  const handleSendToMail = () => {
    api
      .sendToMail(currentDocument.id)
      .then((data) => {
        if (data.status === "success") {
          //success notification
          setIsSentToMail(true);
        } else {
          alert("Ошибка сервера, попробуйте позже");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setSendToMail(false);
  };

  //create new folder in menu
  const [createFolder, setCreateFolder] = useState(false);

  const handleCloseCreateFolders = () => {
    setCreateFolder(false);
  };

  //disable form
  const [folderChecked, setFolderChecked] = useState(false);

  //sort folder list
  function moveMainFolderToTop(array) {
    const index = array.findIndex((element) => element.main === true);
    if (index !== -1) {
      const element = array.splice(index, 1)[0];
      array.unshift(element);
    }
    return array;
  }

  //pagination
  const refScrollUp = useRef();
  const { page, setPage } = useContext(PaginationContext);
  const handleChange = (event, value) => {
    setPage(value);
    refScrollUp.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
          display: "flex",
          flexDirection: "column",
          gap: { xs: [3], md: [4] },
          position: "relative",
        }}
      >
        <div
          ref={refScrollUp}
          style={{ position: "absolute", top: "-100px" }}
        ></div>
        <Typography variant="h5">
          Найденных документов: {data.allCount !== "" ? data.allCount : 0}
        </Typography>

        {data.documentsList.map((document, i) => {
          return (
            <Box
              key={i}
              className="table"
              display="grid"
              gridAutoFlow={{ xs: "column", md: "row" }}
              gridTemplateColumns={{
                xs: "auto 1fr",
                md: "minmax(80px, 200px) auto minmax(80px, 200px)",
              }}
              gridTemplateRows={{ xs: "repeat(3, auto)", md: "40px auto" }}
              columnGap={{ xs: 2, md: 0 }}
              rowGap={3}
              position="relative"
              pb={2}
              borderBottom="solid 1px rgba(101, 108, 101, 0.2)"
            >
              <Box
                className="table-head"
                sx={{
                  borderBottom: {
                    xs: "none",
                    md: "solid 1px rgba(101, 108, 101, 0.2)",
                  },
                }}
              >
                Дата
              </Box>
              <Box
                className="table-head"
                sx={{
                  borderBottom: {
                    xs: "none",
                    md: "solid 1px rgba(101, 108, 101, 0.2)",
                  },
                }}
              >
                Документ
              </Box>
              <Box
                className="table-head"
                sx={{
                  borderBottom: {
                    xs: "none",
                    md: "solid 1px rgba(101, 108, 101, 0.2)",
                  },
                }}
              >
                ID
              </Box>
              <Box>
                <Typography sx={{ fontSize: { xs: "1rem", md: "14px" } }}>
                  {document.date}
                </Typography>
              </Box>
              <Box
                sx={{
                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    mb: 2,
                    pr: 2,
                    "&:hover": {
                      color: "primary.main",
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    handleOpen(document);
                  }}
                >
                  {document.title}
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: 1,
                  }}
                >
                  {document.tags.map((tag, i) => {
                    return <Chip key={i} label={tag} />;
                  })}
                </Stack>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: { xs: "1rem", md: "14px" } }}>
                  {document.id}
                </Typography>
                <IconButton
                  onClick={(event) => {
                    handleDocumentMenuClick(event, document);
                  }}
                  sx={{
                    mt: "-8px",
                    position: { xs: "absolute", md: "relative" },
                    top: 0,
                    right: 0,
                    display: {
                      height: "40px",
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
        {data.allCount > 10 && (
          <Pagination
            count={data.pagesCount}
            showFirstButton
            showLastButton
            page={page}
            onChange={handleChange}
            size="small"
          />
        )}
      </Paper>
      <Menu
        anchorEl={isDocumentMenuOpen}
        id="folder-menu"
        open={openDocumentMenu}
        onClose={() => {
          setIsDocumentMenuOpen(null);
        }}
        onClick={() => {
          setIsDocumentMenuOpen(null);
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
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        {!open && (
          <MenuItem
            onClick={() => {
              handleOpen(currentDocument);
            }}
          >
            Посмотреть
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setSendToMail(true);
          }}
        >
          Отправить на почту
        </MenuItem>
        {currentDocument && (
          <MenuItem
            onClick={() => {}}
            component={Link}
            href={currentDocument.file.url}
            download={currentDocument.file.title}
            target="_blank"
          >
            Скачать
          </MenuItem>
        )}
        {inFavorites ? (
          <div>
            <Divider />
            <MenuItem
              onClick={() => {
                setMoveToFolder(true);
              }}
            >
              Переместить в папку
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAddToFavorites(true);
              }}
            >
              Добавить в другую папку
            </MenuItem>
            <MenuItem onClick={handleRemoveFromFavorites}>
              Удалить из избранного
            </MenuItem>
          </div>
        ) : (
          // currentDocument &&
          // !currentDocument.inFavourite &&
          <div>
            <Divider />
            <MenuItem
              onClick={() => {
                setAddToFavorites(true);
              }}
            >
              Добавить в избранное
            </MenuItem>
          </div>
        )}
      </Menu>
      {currentDocument && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              width: { xs: "100vw", lg: "1000px" },
              height: "100vh",
              overflowY: "scroll",
              bgcolor: "background.paper",
              p: { xs: 2, md: 4 },
              pr: { xs: 2, md: 13 },
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                left: { xs: "unset", md: "32px" },
                right: { xs: "16px", md: "unset" },
                top: { xs: "16px", md: "32px" },
              }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={(event) => {
                handleDocumentMenuClick(event, currentDocument);
              }}
              sx={{
                position: "absolute",
                right: { xs: "16px", md: "32px" },
                top: { xs: "64px", md: "32px" },
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Stack sx={{ pr: { xs: 11, md: 7 }, pl: { xs: 0, md: 7 } }}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {currentDocument.title}
              </Typography>
            </Stack>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: { xs: 2, md: 4 }, pl: { xs: 0, md: 7 } }}
            >
              {currentDocument.subtitle}
            </Typography>
            {/* <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1}
              sx={{
                justifyContent: "space-between",
                mb: { xs: 4, md: 8 },
                pl: { xs: 0, md: 7 },
              }}
            >
              <Typography color="text.secondary">
                {currentDocument.previewText}
              </Typography>
            </Stack> */}
            <Typography
              color="text.secondary"
              sx={{ mb: 4, textIndent: "20px", textAlign: "justify" }}
              dangerouslySetInnerHTML={{
                __html: currentDocument.detailText,
              }}
            ></Typography>

            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
                justifyContent: "flex-start",
                gap: 1,
                mb: 8,
              }}
            >
              {currentDocument.tags.map((tag, i) => {
                return <Chip key={i} label={tag} />;
              })}
            </Stack>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Ссылка на первоисточник
            </Typography>
            <Stack spacing={2} sx={{ pb: { xs: 10, md: 0 } }}>
              {currentDocument.acts.map((act, i) => {
                return (
                  <Link
                    key={i}
                    href={act.url}
                    sx={{
                      display: "flex",
                      maxWidth: "100%",
                      alignItems: "center",
                      gap: "12px",
                    }}
                    target="_blank"
                  >
                    <DescriptionOutlinedIcon />
                    <Typography
                      sx={{ whiteSpace: "break-spaces", overflow: "hidden" }}
                    >
                      {act.title}
                    </Typography>
                  </Link>
                );
              })}
              {currentDocument.kadarbitr.url !== "" && (
                <Link
                  href={currentDocument.kadarbitr.url}
                  sx={{
                    display: "flex",
                    maxWidth: "100%",
                    alignItems: "center",
                    gap: "12px",
                  }}
                  target="_blank"
                >
                  <LanguageIcon />
                  <Typography
                    sx={{ whiteSpace: "break-spaces", overflow: "hidden" }}
                  >
                    {currentDocument.kadarbitr.title}
                  </Typography>
                </Link>
              )}
            </Stack>
            <Typography color="text.secondary" textAlign="right" sx={{ mt: 1 }}>
              ID {currentDocument.id}
            </Typography>
          </Box>
        </Modal>
      )}
      <Popup
        isPopupOpen={addToFavorites}
        onClose={() => {
          setAddToFavorites(false);
        }}
      >
        <IconButton
          onClick={() => {
            setAddToFavorites(false);
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
          Добавить документ в избранное
        </Typography>
        <Typography mb={1}>Выберите папку</Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {moveMainFolderToTop(folders).map((folder) => {
            return (
              <FormControlLabel
                key={folder.id}
                sx={{
                  maxWidth: "fit-content",
                }}
                control={
                  <Checkbox
                    inputProps={{ "data-folderName": `${folder.name}` }}
                    value={folder.id}
                    onChange={(e) => {
                      const folderName =
                        e.target.getAttribute("data-folderName");
                      let index = checkedFolders.indexOf(e.target.value);
                      if (index !== -1) {
                        checkedFolders.splice(index, 1);
                        checkedFoldersNames.splice(index, 1);
                      } else {
                        checkedFolders.push(e.target.value);
                        checkedFoldersNames.push(folderName);
                      }
                      setCheckedFolders(checkedFolders);
                      setCheckedFoldersNames(checkedFoldersNames);
                      if (checkedFolders.length !== 0) {
                        setFolderChecked(true);
                      } else {
                        setFolderChecked(false);
                      }
                    }}
                    defaultChecked={
                      currentDocument &&
                      currentDocument.favouriteFolders &&
                      currentDocument.favouriteFolders.find(
                        (element) => element.id == folder.id
                      ) !== undefined
                    }
                    disabled={
                      currentDocument &&
                      currentDocument.favouriteFolders &&
                      currentDocument.favouriteFolders.find(
                        (element) => element.id == folder.id
                      ) !== undefined
                    }
                  />
                }
                label={<Typography display="inline">{folder.name}</Typography>}
              />
            );
          })}
          <Stack
            onClick={() => {
              setCreateFolder(true);
            }}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mt: 1,
              ml: "-11px",
              mr: 2,
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            <IconButton>
              <AddIcon />
            </IconButton>
            <Typography display="inline">Добавить папку</Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setAddToFavorites(false);
            }}
          >
            Отменить
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToFavorites}
            disabled={!folderChecked}
          >
            Добавить
          </Button>
        </Stack>
      </Popup>
      <Popup
        isPopupOpen={isInFavorites}
        onClose={() => {
          setIsInFavorites(false);
          setCheckedFoldersNames([]);
        }}
      >
        <IconButton
          onClick={() => {
            setIsInFavorites(false);
            setCheckedFoldersNames([]);
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
          Документ добавлен в Избранное
        </Typography>
        <Typography color="text.secondary">
          Документ добавлен в папку {checkedFoldersNames.join(", ")}.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsInFavorites(false);
            setCheckedFoldersNames([]);
          }}
        >
          Закрыть
        </Button>
      </Popup>
      <Popup
        isPopupOpen={moveToFolder}
        onClose={() => {
          setMoveToFolder(false);
        }}
      >
        <IconButton
          onClick={() => {
            setMoveToFolder(false);
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
          Переместить документ
        </Typography>
        <Typography mb={1}>Выберите папку</Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {moveMainFolderToTop(folders).map((folder) => {
            return (
              <FormControlLabel
                key={folder.id}
                sx={{
                  maxWidth: "fit-content",
                }}
                control={
                  <Checkbox
                    value={folder.id}
                    onChange={(e) => {
                      let index = checkedFolders.indexOf(e.target.value);
                      if (index !== -1) {
                        checkedFolders.splice(index, 1);
                      } else {
                        checkedFolders.push(e.target.value);
                      }
                      setCheckedFolders(checkedFolders);
                      if (checkedFolders.length !== 0) {
                        setFolderChecked(true);
                      } else {
                        setFolderChecked(false);
                      }
                    }}
                    defaultChecked={
                      currentDocument &&
                      currentDocument.favouriteFolders &&
                      currentDocument.favouriteFolders.find(
                        (element) => element.id == folder.id
                      ) !== undefined
                    }
                    disabled={
                      currentDocument &&
                      currentDocument.favouriteFolders &&
                      currentDocument.favouriteFolders.find(
                        (element) => element.id == folder.id
                      ) !== undefined
                    }
                  />
                }
                label={<Typography display="inline">{folder.name}</Typography>}
              />
            );
          })}
          <Stack
            onClick={() => {
              setCreateFolder(true);
            }}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mt: 1,
              ml: "-11px",
              mr: 2,
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            <IconButton>
              <AddIcon />
            </IconButton>
            <Typography display="inline">Добавить папку</Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setMoveToFolder(false);
            }}
          >
            Отменить
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleMoveToFolder}
            disabled={!folderChecked}
          >
            Переместить
          </Button>
        </Stack>
      </Popup>
      <Popup
        isPopupOpen={isMoved}
        onClose={() => {
          setIsMoved(false);
          updateFavorites();
        }}
      >
        <IconButton
          onClick={() => {
            setIsMoved(false);
            updateFavorites();
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
          Документ перемещен
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsMoved(false);
            updateFavorites();
          }}
        >
          Закрыть
        </Button>
      </Popup>
      <Popup
        isPopupOpen={sendToMail}
        onClose={() => {
          setSendToMail(false);
        }}
      >
        <IconButton
          onClick={() => {
            setSendToMail(false);
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
          Отправить на почту
        </Typography>
        <Typography color="text.secondary">
          Отправить документ на почту, указанную при регистрации?
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setSendToMail(false);
            }}
          >
            Отменить
          </Button>
          <Button variant="contained" fullWidth onClick={handleSendToMail}>
            Отправить
          </Button>
        </Stack>
      </Popup>
      <Popup
        isPopupOpen={isSentToMail}
        onClose={() => {
          setIsSentToMail(false);
        }}
      >
        <IconButton
          onClick={() => {
            setIsSentToMail(false);
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
          Успешно
        </Typography>

        <Typography color="text.secondary">
          Документ отправлен на почту, указанную при регистрации
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsSentToMail(false);
          }}
        >
          Закрыть
        </Button>
      </Popup>
      <Popup
        isPopupOpen={isRemoved}
        onClose={() => {
          setIsRemoved(false);
          updateFavorites();
        }}
      >
        <IconButton
          onClick={() => {
            setIsRemoved(false);
            updateFavorites();
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
          Документ удален из избранного
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsRemoved(false);
            updateFavorites();
          }}
        >
          Закрыть
        </Button>
      </Popup>
      <CreateFolder
        isPopupOpen={createFolder}
        onClose={handleCloseCreateFolders}
        updateFolders={updateFolders}
      />
    </>
  );
};

export default DocumentsList;
