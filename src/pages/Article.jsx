import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";

import api from "../utils/Api";

const Article = () => {
  let { id } = useParams();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = () => {
    api
      .getNewsDetail(id)
      .then((data) => {
        if (data.status === "success") {
          setData(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getData, [id]);

  return (
    <Container
      maxWidth="false"
      sx={{
        mt: 4,
        mb: 4,
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
        <Paper
          elevation={0}
          sx={{
            p: { xs: [2], md: [4] },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: { xs: 2, md: 4 }, maxWidth: "864px" }}
          >
            {data.title}
          </Typography>
          <Typography
            sx={{ maxWidth: "864px" }}
            dangerouslySetInnerHTML={{
              __html: data.text,
            }}
          ></Typography>
          {data.imageUrl != "" && (
            <Box
              component="img"
              src={data.imageUrl}
              alt="photo"
              loading="lazy"
              sx={{
                width: "100%",
                maxWidth: "864px",
                my: 2,
              }}
            />
          )}
        </Paper>
      )}
    </Container>
  );
};

export default Article;
