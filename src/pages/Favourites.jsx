import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";

import Filters from "../components/Filters";
import DocumentsList from "../components/DocumentsList";

import api from "../utils/Api";

const Favourites = ({ title }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFavourites = () => {
    api
      .getFavourites()
      .then((data) => {
        if (data.status === "success") {
          setFavourites(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getFavourites, [loading]);

  const handleFilterSubmit = (event) => {
    if (event) {
      //if filters form submit
      event.preventDefault();
      const filters = Array.from(new FormData(event.currentTarget));
      console.log(filters);
      api
        .getFavourites(filters)
        .then((data) => {
          if (data.status === "success") {
            setFavourites(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //if filters form reset
      api
        .getFavourites()
        .then((data) => {
          if (data.status === "success") {
            setFavourites(data.data);
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
      }}
    >
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      {loading ? (
        <>
          <Skeleton
            variant="rounded"
            height={265}
            animation="wave"
            sx={{ bgcolor: "rgb(238, 239, 242);" }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height={600}
            sx={{ bgcolor: "rgb(238, 239, 242);" }}
          />
        </>
      ) : (
        <>
          <Filters data={favourites} onFilterSubmit={handleFilterSubmit} />
          <DocumentsList data={favourites} isFavourites={true} />
        </>
      )}
    </Container>
  );
};

export default Favourites;
