import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Container, CircularProgress, Box } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import DocumentsList from "../components/DocumentsList";
import api from "../utils/Api";

const Folder = ({ folders, updateFolders, updateCatalog }) => {
  let { id } = useParams();
  const folder = folders.find((folder) => folder.id == id);

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  //filters (feature for backlog)
  const [isFiltered, setIsFiltered] = useState(false);

  const getFavorites = () => {
    api
      .getFavorites([["folderId", `${id}`]])
      .then((data) => {
        if (data.status === "success") {
          setFavorites(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getFavorites, [folder]);

  //filters (feature for backlog)
  // const handleFilterSubmit = (event) => {
  //   if (event) {
  //     //if filters form submit
  //     event.preventDefault();
  //     const filters = Array.from(new FormData(event.currentTarget));
  //     filters.push(["folderId", `${id}`]);
  //     // console.log(filters);
  //     api
  //       .getFavorites(filters)
  //       .then((data) => {
  //         if (data.status === "success") {
  //           setFavorites(data.data);
  //           setIsFiltered(true);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     //if filters form reset
  //     api
  //       .getFavorites()
  //       .then((data) => {
  //         if (data.status === "success") {
  //           setFavorites(data.data);
  //           setIsFiltered(true);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  return (
    <Container
      maxWidth="false"
      sx={{
        mt: 4,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        gap: { xs: [2], md: [4] },
        position: "relative",
        height: "calc(100% - 76px)",
      }}
    >
      <Typography variant="h4" component="h1">
        {folder && folder.name}
      </Typography>
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
      ) : favorites.documentsList.length == 0 && !isFiltered ? (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BookmarkIcon
            fontSize="large"
            sx={{ opacity: "0.2", scale: "2", mb: 2 }}
          />
          <Typography color="text.secondary">
            Нет избранных документов
          </Typography>
        </Box>
      ) : (
        <>
          {/* filters (feature for backlog) */}
          {/* <Filters data={favorites} onFilterSubmit={handleFilterSubmit} /> */}
          <DocumentsList
            data={favorites}
            inFavorites={true}
            folderId={id}
            folders={folders}
            updateFavorites={getFavorites}
            updateFolders={updateFolders}
            updateCatalog={updateCatalog}
          />
        </>
      )}
    </Container>
  );
};

export default Folder;
