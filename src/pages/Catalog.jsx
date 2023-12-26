import React from "react";
import { Paper, Typography, Stack, Link } from "@mui/material";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import Filters from "../components/Filters";

const tags = [
  "ООО",
  "Конкурсное производство",
  "Торги",
  "Недействительные торги",
  "Договор купли-продажи",
  "ООО",
  "Конкурсное производство",
  "Торги",
  "Недействительные торги",
  "Договор купли-продажи",
  "Недействительные торги",
  "ООО",
];

const Catalog = () => {
  //row menu
  const [isDocumentMenuOpen, setIsDocumentMenuOpen] = React.useState(null);
  const openDocumentMenu = Boolean(isDocumentMenuOpen);
  const handleDocumentMenuClick = (event) => {
    setIsDocumentMenuOpen(event.currentTarget);
  };
  const handleDocumentMenuClose = () => {
    setIsDocumentMenuOpen(null);
    setOpen(true);
  };

  // modal controller
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        Каталог
      </Typography>
      <Filters />
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
          display: "flex",
          flexDirection: "column",
          gap: { xs: [3], md: [4] },
        }}
      >
        <Typography variant="h5">Найдено 25 895 документов</Typography>

        <Box
          className="table"
          display="grid"
          gridAutoFlow={{ xs: "column", md: "row" }}
          gridTemplateColumns={{
            xs: "auto 1fr",
            md: "minmax(80px, 200px) auto minmax(80px, 200px)",
          }}
          gridTemplateRows={{ xs: "repeat(3, auto)", md: "40px auto" }}
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
            Документ
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
            ID
          </Box>
          <Box>06.03.2023</Box>
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
              onClick={handleOpen}
            >
              Определение №А49-4822/2022
            </Typography>
            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              {tags.map((tag, i) => {
                return <Chip key={i} label={tag} />;
              })}
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            123456
            <IconButton
              onClick={handleDocumentMenuClick}
              sx={{
                mt: "-8px",
                position: { xs: "absolute", md: "relative" },
                top: 0,
                right: 0,
                display: {
                  height: "40px",
                },
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
      <Menu
        anchorEl={isDocumentMenuOpen}
        id="folder-menu"
        open={openDocumentMenu}
        onClose={handleDocumentMenuClose}
        onClick={handleDocumentMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: "220px",
            overflow: "visible",
            boxShadow:
              "0px 5px 5px -3px rgba(0, 0, 0, 0.20), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",

            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <MenuItem onClick={handleDocumentMenuClose}>Посмотреть</MenuItem>
        <MenuItem onClick={handleDocumentMenuClose}>
          Отправить на почту
        </MenuItem>
        <MenuItem onClick={handleDocumentMenuClose}>Скачать</MenuItem>
        <Divider />
        <MenuItem onClick={handleDocumentMenuClose}>
          Добавить в избранное
        </MenuItem>
      </Menu>
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
          <IconButton
            onClick={handleDocumentMenuClick}
            sx={{
              position: "absolute",
              right: { xs: "16px", md: "32px" },
              top: { xs: "64px", md: "32px" },
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Stack sx={{ pr: { xs: 11, md: 7 }, pl: { xs: 0, md: 7 } }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Определение ВС РФ №305-ЭС201-14249
            </Typography>
          </Stack>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: { xs: 2, md: 4 }, pl: { xs: 0, md: 7 } }}
          >
            от 05 июня 2023 г. по делу №А41-16675/2019
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
              Изготовлено в полном объеме 20 октября 2022 года
            </Typography>
            <Typography color="text.secondary">ID 123456</Typography>
          </Stack>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Суды не приняли во внимание, что недействительность договора может
            быть связана не только с нарушением самих правил проведения торгов,
            но и с иными нарушениями требований закона. Заключение договора об
            отчуждении недвижимого имущества, принадлежащего обществу,
            допускалось исключительно посредством торгов. Согласно пункту 8
            статьи 448 ГК РФ условия соответствующего договора могли быть
            изменены сторонами после проведения торгов по основаниям,
            установленным законом, или по иным основаниям, если изменение
            договора не повлияло на те его условия, которые имели существенное
            значение для определения цены на торгах. Однако условие
            относительного того, что продается имущество, обремененное арестом в
            пользу ФНС России, имело существенное значение для правильного
            определения цены договора. У судов не имелось достаточных оснований
            полагать, что в случае изначального предложения договора на
            измененном условии (о продаже имущества, не находящегося под
            арестом) состав участников торгов, равно как и предложения по цене,
            остались бы прежними и победителем торгов все равно был бы признан
            центр. При отчуждении арестованного имущества круг потенциальных
            покупателей всегда сужается, цена продажи – снижается. Действия
            сторон по изменению условия договора, сформулированного в
            документации о торгах и значительным образом влиявшего на их
            результат, могли указывать на то, что в отношении объекта,
            предлагавшегося к продаже на торгах (арестованный бизнес-центр)
            договор купли-продажи не был заключен, а в отношении существенно
            отличавшегося объекта (бизнес-центр, не обремененный правами
            третьего лица) торги не проводились и был заключен обычный прямой
            договор. Такие действия могут быть квалифицированы как обход норм о
            продаже имущества несостоятельного должника на торгах, а договор,
            условия которого изменены по сравнению с условиями документации о
            торгах, – как ничтожная сделка, нарушающая требования закона и при
            этом посягающая на права и охраняемые законом интересы третьих лиц –
            кредиторов несостоятельного продавца (пункт 3 статьи 139 Закон о
            банкротстве, пункт 2 статьи 168 и пункт 8 статьи 448 ГК РФ). К
            требованиям о признании ничтожной сделки недействительной и о
            применении последствий ее недействительности применим трехлетний
            срок исковой давности (пункт 1 статьи 181 ГК РФ). Следовательно, для
            правильного разрешения обособленного спора существенное значение
            имели доводы налогового органа относительно того, что центр не имел
            намерения заключить договор на условиях, раскрытых в публикациях о
            торгах, фактически была заключена сделка на иных условиях, настольно
            отличающихся от первоначальных, что она не может считаться
            совершенной по результатам торгов.
          </Typography>
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 1,
              mb: 8,
            }}
          >
            <Chip label="ООО" />
            <Chip label="Конкурсное производство" />
            <Chip label="Торги" />
            <Chip label="Недействительные торги" />
            <Chip label="Договор купли-продажи" />
            <Chip label="ООО" />
            <Chip label="Конкурсное производство" />
            <Chip label="Торги" />
            <Chip label="Недействительные торги" />
            <Chip label="Договор купли-продажи" />
            <Chip label="ООО" />
            <Chip label="Конкурсное производство" />
            <Chip label="Торги" />
            <Chip label="Недействительные торги" />
            <Chip label="Договор купли-продажи" />
          </Stack>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Судебные акты
          </Typography>
          <Stack spacing={2}>
            <Link
              href="#"
              sx={{
                display: "flex",
                maxWidth: "430px",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <DescriptionOutlinedIcon />
              <Typography>
                Об отказе в принятии обеспечительных (предварительных
                обеспечительных) мер
              </Typography>
            </Link>
            <Link
              href="#"
              sx={{
                display: "flex",
                maxWidth: "430px",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <DescriptionOutlinedIcon />
              <Typography>
                Об отказе в принятии обеспечительных (предварительных
                обеспечительных) мер
              </Typography>
            </Link>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default Catalog;
