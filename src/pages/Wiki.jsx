import { useState, useEffect } from "react";
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
import CloseIcon from "@mui/icons-material/Close";

import api from "../utils/Api";
import Filters from "../components/Filters";
import { Link } from "react-router-dom";

export const data = {
  wiki: [
    {
      id: "0",
      date: "01.01.2019",
      title: "Суд по интеллектуальным правам",
      price: "999",
      buyLink: "",
      downloadLink: "",
      description: "Изготовлено в полном объеме 20 октября 2022 года",
      text: "Суды не приняли во внимание, что недействительность договора может быть связана не только с нарушением самих правил проведения торгов, но и с иными нарушениями требований закона. Заключение договора об отчуждении недвижимого имущества, принадлежащего обществу, допускалось исключительно посредством торгов.Согласно пункту 8 статьи 448 ГК РФ условия соответствующего договора могли быть изменены сторонами после проведения торгов по основаниям, установленным законом, или по иным основаниям, если изменение договора не повлияло на те его условия, которые имели существенное значение для определения цены на торгах. Однако условие относительного того, что продается имущество, обремененное арестом в пользу ФНС России, имело существенное значение для правильного определения цены договора. У судов не имелось достаточных оснований полагать, что в случае изначального предложения договора на измененном условии (о продаже имущества, не находящегося под арестом) состав участников торгов, равно как и предложения по цене, остались бы прежними и победителем торгов все равно был бы признан центр. При отчуждении арестованного имущества круг потенциальных покупателей всегда сужается, цена продажи – снижается.Действия сторон по изменению условия договора, сформулированного в документации о торгах и значительным образом влиявшего на их результат, могли указывать на то, что в отношении объекта, предлагавшегося к продаже на торгах (арестованный бизнес-центр) договор купли-продажи не был заключен, а в отношении существенно отличавшегося объекта (бизнес-центр, не обремененный правами третьего лица) торги не проводились и был заключен обычный прямой договор.Такие действия могут быть квалифицированы как обход норм о продаже имущества несостоятельного должника на торгах, а договор, условия которого изменены по сравнению с условиями документации о торгах, – как ничтожная сделка, нарушающая требования закона и при этом посягающая на права и охраняемые законом интересы третьих лиц – кредиторов несостоятельного продавца (пункт 3 статьи 139 Закон о банкротстве, пункт 2 статьи 168 и пункт 8 статьи 448 ГК РФ). К требованиям о признании ничтожной сделки недействительной и о применении последствий ее недействительности применим трехлетний срок исковой давности (пункт 1 статьи 181 ГК РФ).Следовательно, для правильного разрешения обособленного спора существенное значение имели доводы налогового органа относительно того, что центр не имел намерения заключить договор на условиях, раскрытых в публикациях о торгах, фактически была заключена сделка на иных условиях, настольно отличающихся от первоначальных, что она не может считаться совершенной по результатам торгов.",
      paid: false,
    },
    {
      id: "1",
      date: "02.01.2019",
      title: "Суд правам",
      price: "996549",
      buyLink: "",
      downloadLink: "",
      description: "Изготовлено в полном объеме 20 октября 2022 года",
      text: "Суды не приняли во внимание, что недействительность договора может быть связана не только с нарушением самих правил проведения торгов, но и с иными нарушениями требований закона. Заключение договора об отчуждении недвижимого имущества, принадлежащего обществу, допускалось исключительно посредством торгов.Согласно пункту 8 статьи 448 ГК РФ условия соответствующего договора могли быть изменены сторонами после проведения торгов по основаниям, установленным законом, или по иным основаниям, если изменение договора не повлияло на те его условия, которые имели существенное значение для определения цены на торгах. Однако условие относительного того, что продается имущество, обремененное арестом в пользу ФНС России, имело существенное значение для правильного определения цены договора. У судов не имелось достаточных оснований полагать, что в случае изначального предложения договора на измененном условии (о продаже имущества, не находящегося под арестом) состав участников торгов, равно как и предложения по цене, остались бы прежними и победителем торгов все равно был бы признан центр. При отчуждении арестованного имущества круг потенциальных покупателей всегда сужается, цена продажи – снижается.Действия сторон по изменению условия договора, сформулированного в документации о торгах и значительным образом влиявшего на их результат, могли указывать на то, что в отношении объекта, предлагавшегося к продаже на торгах (арестованный бизнес-центр) договор купли-продажи не был заключен, а в отношении существенно отличавшегося объекта (бизнес-центр, не обремененный правами третьего лица) торги не проводились и был заключен обычный прямой договор.Такие действия могут быть квалифицированы как обход норм о продаже имущества несостоятельного должника на торгах, а договор, условия которого изменены по сравнению с условиями документации о торгах, – как ничтожная сделка, нарушающая требования закона и при этом посягающая на права и охраняемые законом интересы третьих лиц – кредиторов несостоятельного продавца (пункт 3 статьи 139 Закон о банкротстве, пункт 2 статьи 168 и пункт 8 статьи 448 ГК РФ). К требованиям о признании ничтожной сделки недействительной и о применении последствий ее недействительности применим трехлетний срок исковой давности (пункт 1 статьи 181 ГК РФ).Следовательно, для правильного разрешения обособленного спора существенное значение имели доводы налогового органа относительно того, что центр не имел намерения заключить договор на условиях, раскрытых в публикациях о торгах, фактически была заключена сделка на иных условиях, настольно отличающихся от первоначальных, что она не может считаться совершенной по результатам торгов.",
      paid: true,
    },
  ],
  wikiCount: 1254,
  pageCount: 10,
};

const Wiki = () => {
  //wiki data
  const [wiki, setWiki] = useState(data.wiki);
  const [loading, setLoading] = useState(false);
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
  const [pageCount, setPageCount] = useState(data.pageCount);

  //filter submit
  const handleFilterSubmit = (event) => {
    setLoading(true);
    if (event) {
      //if filters form submit
      event.preventDefault();
      const filters = Array.from(new FormData(event.currentTarget));
      api
        .getWiki(page, filters)
        .then((data) => {
          if (data.status === "success") {
            setWiki(data.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //if filters form reset
      api
        .getWiki(page)
        .then((data) => {
          if (data.status === "success") {
            setWiki(data.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //get data
  const getWiki = () => {
    api
      .getWiki(page)
      .then((data) => {
        if (data.status === "success") {
          setWiki(data.data.wiki);
          setPageCount(data.data.pageCount);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getWiki, [page]);

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
        База знаний
      </Typography>
      <Filters onFilterSubmit={handleFilterSubmit} short={true} />
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
            Найдено {data && data.wikiCount} документов
          </Typography>
          {wiki.map((document, i) => {
            return (
              <Box
                key={i}
                className="table"
                display="grid"
                gridAutoFlow={{ xs: "column", lg: "row" }}
                gridTemplateColumns={{
                  xs: "auto 1fr",
                  lg: "minmax(80px, 180px) auto minmax(80px, 250px)",
                }}
                gridTemplateRows={{ xs: "repeat(3, auto)", lg: "40px auto" }}
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
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  {document.id}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: { xs: 1, md: 4 },
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "flex-end",
                      alignItems: { xs: "flex-end", md: "flex-start" },
                    }}
                  >
                    {!document.paid && (
                      <Typography>{document.price} Р</Typography>
                    )}

                    <Typography
                      color="primary.main"
                      sx={{ textTransform: "uppercase", cursor: "pointer" }}
                      component={Link}
                      to={
                        document.paid ? document.downloadLink : document.buyLink
                      }
                      target="_blanc"
                    >
                      {document.paid ? "Cкачать" : "Купить"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            shape="rounded"
            color="primary"
            size="small"
            sx={{ justifyContent: "flex-end" }}
          />
        </Paper>
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
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: { xs: 2, md: 4 }, pl: { xs: 0, md: 7 } }}
            >
              {currentDocument.date}
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
                {currentDocument.description}
              </Typography>
              <Typography color="text.secondary">
                ID {currentDocument.id}
              </Typography>
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
                to={
                  currentDocument.paid
                    ? currentDocument.downloadLink
                    : currentDocument.buyLink
                }
                target="_blanc"
              >
                {currentDocument.paid ? "Cкачать" : "Купить"}
              </Button>
            </Stack>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              {currentDocument.text}
            </Typography>
          </Box>
        </Modal>
      )}
    </Container>
  );
};

export default Wiki;
