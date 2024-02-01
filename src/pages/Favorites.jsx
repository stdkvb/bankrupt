import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import Filters from "../components/Filters";
import DocumentsList from "../components/DocumentsList";

import api from "../utils/Api";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  const getFavorites = () => {
    api
      .getFavorites()
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
  useEffect(getFavorites, [loading]);

  const handleFilterSubmit = (event) => {
    if (event) {
      //if filters form submit
      event.preventDefault();
      const filters = Array.from(new FormData(event.currentTarget));
      console.log(filters);
      api
        .getFavorites(filters)
        .then((data) => {
          if (data.status === "success") {
            setFavorites(data.data);
            setIsFiltered(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //if filters form reset
      api
        .getFavorites()
        .then((data) => {
          if (data.status === "success") {
            setFavorites(data.data);
            setIsFiltered(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
        position: "relative",
        height: "calc(100% - 76px)",
      }}
    >
      <Typography variant="h4" component="h1">
        Избранное
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
          <Filters data={favorites} onFilterSubmit={handleFilterSubmit} />
          <DocumentsList data={favorites} isFavorites={true} />
        </>
      )}
    </Container>
  );
};

export default Favorites;
