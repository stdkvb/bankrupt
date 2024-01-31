import React from "react";
import { useState } from "react";
import { Paper, Typography, Stack, Link, Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import Popup from "./Popup";
import api from "../utils/Api";

const DocumentsList = ({ data, isFavorites }) => {
  const [currentDocument, setCurrentDocument] = useState(null);

  //row menu
  const [isDocumentMenuOpen, setIsDocumentMenuOpen] = useState(null);
  const openDocumentMenu = Boolean(isDocumentMenuOpen);
  const handleDocumentMenuClick = (event, document) => {
    setIsDocumentMenuOpen(event.currentTarget);
    setCurrentDocument(document);
  };
  const handleDocumentMenuClose = () => {
    setIsDocumentMenuOpen(null);
  };

  // document detail modal controller
  const [open, setOpen] = useState(false);
  const handleOpen = (document) => {
    setCurrentDocument(document);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //add to favorites
  const [isInFavorites, setIsInFavorites] = useState(false);
  const handleAddToFavorites = (currentDocument) => {
    api
      .addToFavorites(currentDocument.id)
      .then((data) => {
        if (data.status === "success") {
          setIsInFavorites(!isInFavorites);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //send to mail
  const [sendToMail, setSendToMail] = useState(false);
  const [isSentToMail, setIsSentToMail] = useState(false);
  const handleSendToMail = () => {
    api
      .sendToMail(currentDocument.id)
      .then((data) => {
        if (data.status === "success") {
          setIsSentToMail(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setSendToMail(false);
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
        }}
      >
        <Typography variant="h5">
          Найденых документов: {data.documentsList.length}
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
      </Paper>
      <Menu
        anchorEl={isDocumentMenuOpen}
        id="folder-menu"
        open={openDocumentMenu}
        onClose={handleDocumentMenuClose}
        onClick={handleDocumentMenuClose}
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
              handleDocumentMenuClose();
              handleOpen(currentDocument);
            }}
          >
            Посмотреть
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setSendToMail(true);
            handleDocumentMenuClose();
          }}
        >
          Отправить на почту
        </MenuItem>
        {currentDocument && (
          <MenuItem
            onClick={() => {
              handleDocumentMenuClose();
            }}
            component={Link}
            href={currentDocument.file.url}
            download={currentDocument.file.title}
            target="_blank"
          >
            Скачать
          </MenuItem>
        )}
        <Divider />
        {!isFavorites && (
          <MenuItem
            onClick={() => {
              handleDocumentMenuClose();
              handleAddToFavorites(currentDocument);
            }}
          >
            Добавить в избранное
          </MenuItem>
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
            <Stack
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
              <Typography color="text.secondary">
                ID {currentDocument.id}
              </Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              {currentDocument.detailText}
            </Typography>
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
            <Stack spacing={2}>
              {currentDocument.acts.map((act, i) => {
                return (
                  <Link
                    key={i}
                    href={act.url}
                    sx={{
                      display: "flex",
                      maxWidth: "430px",
                      alignItems: "center",
                      gap: "12px",
                    }}
                    target="_blank"
                  >
                    <DescriptionOutlinedIcon />
                    <Typography>{act.title}</Typography>
                  </Link>
                );
              })}
            </Stack>
          </Box>
        </Modal>
      )}
      <Popup isPopupOpen={isInFavorites}>
        <IconButton
          onClick={() => {
            setIsInFavorites(false);
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
          Документ добавлен
          <br />в избранное
        </Typography>
        <Typography color="text.secondary">
          Документ добавлен в папку Избранное
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsInFavorites(false);
          }}
        >
          Закрыть
        </Button>
      </Popup>
      <Popup isPopupOpen={sendToMail}>
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
        <Typography variant="h4" mb={3}>
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
      <Popup isPopupOpen={isSentToMail}>
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
    </>
  );
};

export default DocumentsList;
