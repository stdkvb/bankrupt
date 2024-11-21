import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Stack,
  Button,
  Container,
  IconButton,
  Modal,
  Box,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import api from "../utils/Api";
import Popup from "../components/Popup";
import Filters from "../components/Filters";
import { FiltersContext } from "../utils/FiltersContext";
import { UserContext } from "../utils/UserContext";

const Wiki = ({ paid, handleLogout }) => {
  const { filters, setFilters } = useContext(FiltersContext);
  const user = useContext(UserContext).user;
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const [paymentStatus, setPaymentStatus] = useState();

  //wiki data
  const [wiki, setWiki] = useState();
  const [loading, setLoading] = useState(true);
  const [currentDocument, setCurrentDocument] = useState(null);

  //modal controller
  const [open, setOpen] = useState(false);
  const handleOpen = (document) => {
    setCurrentDocument(document);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //pagination
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [pageCount, setPageCount] = useState();

  //filter submit
  // const handleFilterSubmit = (event) => {
  //   setLoading(true);
  //   if (event) {
  //     //if filters form submit
  //     event.preventDefault();
  //     const filters = Array.from(new FormData(event.currentTarget));
  //     api
  //       .getWiki(page, filters, paid)
  //       .then((data) => {
  //         if (data.status === "success") {
  //           setWiki(data.data);
  //           setLoading(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     //if filters form reset
  //     api
  //       .getWiki(page, paid)
  //       .then((data) => {
  //         if (data.status === "success") {
  //           setWiki(data.data);
  //           setLoading(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  //get data
  const getWiki = () => {
    api
      .getWiki(page, filters, paid)
      .then((data) => {
        if (data.status === "success") {
          setWiki(data.data);
          setPageCount(data.data.pageCount);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getWiki, [page, filters, paid]);

  //pay start
  const payDocument = (id) => {
    if (user && user.personal.legalEntity) {
      api
        .requestDocumentInvoice(id)
        .then((data) => {
          if (data.status === "success") {
            setIsSuccess(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .payDocument(id)
        .then((data) => {
          if (data.status === "success") {
            window.location.href = data.data.url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //confirm payment
  if (paymentId) {
    const url = new URL(window.location.href);
    url.search = "";

    useEffect(() => {
      api
        .confirmDocumentPayment(paymentId)
        .then((data) => {
          if (data.status === "success") {
            getWiki();
            setIsSuccess(true);
            setPaymentStatus(data.data.status);
            window.history.replaceState(null, "", url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, [paymentId]);
  }

  return (
    <>
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
          {paid ? "Купленные документы" : "База знаний"}
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
        ) : wiki.wiki.length == 0 && wiki.wikiCount !== 0 ? (
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
              Нет купленных документов
            </Typography>
          </Box>
        ) : (
          <>
            <Filters short={true} />
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
                Найденных документов: {wiki.wikiCount}
              </Typography>
              {wiki.wiki.map((document, i) => {
                return (
                  <Box
                    key={i}
                    className="table"
                    display="grid"
                    gridAutoFlow={{ xs: "column", lg: "row" }}
                    gridTemplateColumns={{
                      xs: "auto 1fr",
                      lg: "minmax(80px, 180px) auto 300px",
                    }}
                    gridTemplateRows={{
                      xs: "repeat(3, auto)",
                      lg: "40px auto",
                    }}
                    columnGap={{ xs: 2, lg: 0 }}
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
                          lg: "solid 1px rgba(101, 108, 101, 0.2)",
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
                          lg: "solid 1px rgba(101, 108, 101, 0.2)",
                        },
                      }}
                    >
                      Информация
                    </Box>
                    <Box
                      className="table-head"
                      sx={{
                        borderBottom: {
                          xs: "none",
                          lg: "solid 1px rgba(101, 108, 101, 0.2)",
                        },
                      }}
                    >
                      {/* ID */}
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
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: { xs: 2, md: 4 },
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      {/* {document.id} */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: 1, md: 4 },
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "flex-end",
                          alignItems: { xs: "flex-end", md: "flex-start" },
                        }}
                      >
                        {document.price !== "0" && (
                          <Typography>{document.price}&nbsp;₽</Typography>
                        )}
                        {document.price == "0" ? (
                          <Typography
                            component={Link}
                            color="primary.main"
                            sx={{
                              textTransform: "uppercase",
                              cursor: "pointer",
                              textAlign: "right",
                            }}
                            to={document.downloadLink}
                            target="_blanc"
                            download={true}
                          >
                            Cкачать
                          </Typography>
                        ) : (
                          <Typography
                            color="primary.main"
                            sx={{
                              textTransform: "uppercase",
                              cursor: "pointer",
                              textAlign: "right",
                            }}
                            onClick={() => {
                              payDocument(document.id);
                            }}
                          >
                            {user.personal.legalEntity
                              ? "Запросить счет"
                              : "Купить"}
                          </Typography>
                        )}
                      </Box>
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
          </>
        )}
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
                outline: "none",
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

              <Stack sx={{ pr: { xs: 11, md: 7 }, pl: { xs: 0, md: 7 } }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {currentDocument.title}
                </Typography>
              </Stack>
              {/* <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: { xs: 2, md: 4 }, pl: { xs: 0, md: 7 } }}
              >
                от {currentDocument.date}
              </Typography> */}
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
                  {currentDocument.description}
                </Typography>
                {/* <Typography color="text.secondary">
                  ID&nbsp;{currentDocument.id}
                </Typography> */}
                {currentDocument.price == "0" ? (
                  <Button
                    type="button"
                    variant="contained"
                    sx={{
                      width: "fit-content",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      position: { xs: "unset", md: "absolute" },
                      right: { xs: "16px", md: "32px" },
                      top: { xs: "64px", md: "32px" },
                    }}
                    component={Link}
                    to={currentDocument.downloadLink}
                    target="_blanc"
                    download={true}
                  >
                    Cкачать
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    sx={{
                      width: "fit-content",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      position: { xs: "unset", md: "absolute" },
                      right: { xs: "16px", md: "32px" },
                      top: { xs: "64px", md: "32px" },
                    }}
                    onClick={() => {
                      payDocument(currentDocument.id);
                    }}
                  >
                    {user.personal.legalEntity ? "Запросить счет" : "Купить"}
                  </Button>
                )}
              </Stack>
              <Typography
                color="text.secondary"
                sx={{ mb: 4, textIndent: "20px", textAlign: "justify" }}
                dangerouslySetInnerHTML={{
                  __html: currentDocument.text,
                }}
              ></Typography>
            </Box>
          </Modal>
        )}
      </Container>
      <Popup
        isPopupOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
        }}
      >
        <IconButton
          onClick={() => {
            setIsSuccess(false);
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" mb={3} sx={{ maxWidth: "90%" }}>
          {!paymentId
            ? "Успешно"
            : paymentStatus == "succeeded"
            ? "Спасибо, документ успешно оплачен!"
            : paymentStatus == "canceled"
            ? "Ошибка, оплата не прошла, попробуйте ещё раз."
            : "Ваш платёж в обработке."}
        </Typography>
        {!paymentId && (
          <Typography color="text.secondary">
            В ближайшее время на вашу электронную почту поступит <br /> счет на
            оплату
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsSuccess(false);
          }}
        >
          Закрыть
        </Button>
      </Popup>
    </>
  );
};

export default Wiki;
