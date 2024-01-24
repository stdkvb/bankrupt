import React from "react";
import { Paper, Typography, Stack, Link } from "@mui/material";
import Container from "@mui/material/Container";
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

import Filters from "../components/Filters";

const Catalog = ({ data }) => {
  const [currentDocument, setCurrentDocument] = React.useState(null);

  //row menu
  const [isDocumentMenuOpen, setIsDocumentMenuOpen] = React.useState(null);
  const openDocumentMenu = Boolean(isDocumentMenuOpen);
  const handleDocumentMenuClick = (event) => {
    setIsDocumentMenuOpen(event.currentTarget);
  };
  const handleDocumentMenuClose = () => {
    setIsDocumentMenuOpen(null);
  };

  // modal controller
  const [open, setOpen] = React.useState(false);
  const handleOpen = (document) => {
    setCurrentDocument(document);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        mt: 4,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        gap: { xs: [2], md: [4] },
      }}
    >
      <Typography variant="h4" component="h1">
        Каталог
      </Typography>
      <Filters data={data} />
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
          display: "flex",
          flexDirection: "column",
          gap: { xs: [3], md: [4] },
        }}
      >
        <Typography variant="h5">Найдено 25 895 документов</Typography>

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
              <Box>{document.date}</Box>
              <Box>
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
                {document.id}
                <IconButton
                  onClick={handleDocumentMenuClick}
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
        <MenuItem
          onClick={() => {
            handleDocumentMenuClose();
          }}
        >
          Отправить на почту
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDocumentMenuClose();
          }}
        >
          Скачать
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleDocumentMenuClose();
          }}
        >
          Добавить в избранное
        </MenuItem>
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
              onClick={handleDocumentMenuClick}
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
              Судебные акты
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
    </Container>
  );
};

export default Catalog;
