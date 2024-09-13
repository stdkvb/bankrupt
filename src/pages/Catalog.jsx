import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container, CircularProgress } from "@mui/material";
import Filters from "../components/Filters";
import DocumentsList from "../components/DocumentsList";

import api from "../utils/Api";
import { PaginationContext } from "../utils/PaginationContext";
import { FiltersContext } from "../utils/FiltersContext";
import useCheckTarrifActive from "../hooks/useCheckTarrifActive";

const Catalog = ({ title, folders, updateFolders, handleLogout }) => {
  const { page, setPage } = useContext(PaginationContext);
  const { filters, setFilters } = useContext(FiltersContext);
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isTariffActive = useCheckTarrifActive();
  // console.log(isTariffActive)

  const getCatalog = () => {
    api
      .getCatalog(page, filters)
      .then((data) => {
        if (data.status === "success") {
          setCatalog(data.data);
        } else {
          handleLogout();
        }
      })
      .catch((error) => {
        console.error("Error fetching catalog data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(getCatalog, [page, filters]);

  if (loading) {
    return (
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
    );
  }

  if (!isTariffActive) {
    navigate("/rates");
  }

  if (error) {
    return <div>Error loading catalog: {error.message}</div>;
  }

  return (
    <Container
      maxWidth="false"
      sx={{
        mt: 4,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Filters data={catalog} />
      <DocumentsList
        data={catalog}
        inFavorites={false}
        folders={folders}
        updateFolders={updateFolders}
        updateCatalog={getCatalog}
      />
    </Container>
  );
};

export default Catalog;
