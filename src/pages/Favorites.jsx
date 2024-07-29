import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Container, CircularProgress, Box } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import Filters from "../components/Filters";
import DocumentsList from "../components/DocumentsList";

import api from "../utils/Api";
import { PaginationContext } from "../utils/PaginationContext";
import { FiltersContext } from "../utils/FiltersContext";
import useCheckTarrifActive from "../hooks/useCheckTarrifActive";

const Favorites = ({ folders, mainFolder, updateFolders, updateCatalog }) => {
  let { id } = useParams();
  const folder = folders.find((folder) => folder.id == id);
  const { page, setPage } = useContext(PaginationContext);
  const { filters, setFilters } = useContext(FiltersContext);
  const [favorites, setFavorites] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isTariffActive = useCheckTarrifActive();

  const getFavorites = () => {
    api
      .getFavorites([["folderId", id ? id : mainFolder.id]], page, filters)
      .then((data) => {
        if (data.status === "success") {
          setFavorites(data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getFavorites, [folder, page, filters]);

  if (!isTariffActive) {
    navigate("/rates");
  }

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
        {folder ? folder.name : "Избранное"}
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
          {favorites.filterParamsList && <Filters data={favorites} />}
          <DocumentsList
            data={favorites}
            inFavorites={true}
            folders={folders}
            folderId={id ? id : mainFolder.id}
            updateFolders={updateFolders}
            updateFavorites={getFavorites}
          />
        </>
      )}
    </Container>
  );
};

export default Favorites;
