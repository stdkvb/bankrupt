import React from "react";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";

import Filters from "../components/Filters";
import DocumentsList from "../components/DocumentsList";

const Catalog = ({
  title,
  data,
  onFilterSubmit,
  folders,
  updateFolders,
  updateCatalog,
}) => {
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
      <Filters data={data} onFilterSubmit={onFilterSubmit} />
      <DocumentsList
        data={data}
        inFavorites={false}
        folders={folders}
        updateFolders={updateFolders}
        updateCatalog={updateCatalog}
      />
    </Container>
  );
};

export default Catalog;
