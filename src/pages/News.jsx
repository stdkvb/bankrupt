import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Box,
  Pagination,
  CircularProgress,
} from "@mui/material";

import api from "../utils/Api";

const News = ({ handleLogout }) => {
  //pagination
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [pageCount, setPageCount] = useState();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  //get data
  const getNews = () => {
    api
      .getNews(page)
      .then((data) => {
        if (data.status === "success") {
          setData(data.data);
          setPageCount(data.data.pageCount);
        } else {
          handleLogout();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getNews, [page]);

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
        Новости
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
      ) : (
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
            Найдено {data.newsCount} новостей
          </Typography>
          {data.news.map((item, i) => {
            return (
              <Box
                key={i}
                className="table"
                display="grid"
                gridAutoFlow={{ xs: "column", md: "row" }}
                gridTemplateColumns={{
                  xs: "auto 1fr",
                  md: "minmax(80px, 200px) auto",
                }}
                gridTemplateRows={{ xs: "repeat(2, auto)", md: "40px auto" }}
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
                  Информация
                </Box>
                <Box>{item.date}</Box>
                <Box sx={{ maxWidth: "815px" }}>
                  <RouterLink
                    sx={{
                      mb: 2,
                      pr: 2,
                      "&:hover": {
                        color: "primary.main",
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }}
                    to={`/news/${item.id}`}
                  >
                    {item.title}
                  </RouterLink>
                  <Typography
                    className="hidden-text"
                    color="text.secondary"
                    dangerouslySetInnerHTML={{
                      __html: item.text,
                    }}
                  ></Typography>
                </Box>
              </Box>
            );
          })}
          {pageCount > 1 && (
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              shape="rounded"
              color="primary"
              size="small"
              sx={{ justifyContent: "flex-end" }}
            />
          )}
        </Paper>
      )}
    </Container>
  );
};

export default News;
