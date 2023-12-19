import React from "react";
import { Paper, Typography, Button, Stack, Link } from "@mui/material";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const QA = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        gap: { xs: [2], md: [4] },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: { xs: 2, md: 4 } }}>
          Часто задаваемые вопросы
        </Typography>
        <Accordion
          square={true}
          sx={{
            boxShadow: "none",
            borderBottom: "solid 1px rgba(101, 108, 101, 0.20)",
          }}
        >
          <AccordionSummary
            sx={{ p: 0, my: 2, borderRadius: "0" }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h5">
              На что не распространяется банкротство физического лица?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 0, pb: 4 }}>
            <Typography
              variant="p"
              color="text.secondary"
              sx={{ maxWidth: "860px" }}
            >
              Суды не приняли во внимание, что недействительность договора может
              быть связана не только с нарушением самих правил проведения
              торгов, но и с иными нарушениями требований закона. Заключение
              договора об отчуждении недвижимого имущества, принадлежащего
              обществу, допускалось исключительно посредством торгов. Согласно
              пункту 8 статьи 448 ГК РФ условия соответствующего договора могли
              быть изменены сторонами после проведения торгов по основаниям,
              установленным законом, или по иным основаниям, если изменение
              договора не повлияло на те его условия, которые имели существенное
              значение для определения цены на торгах. Однако условие
              относительного того, что продается имущество, обремененное арестом
              в пользу ФНС России, имело существенное значение для правильного
              определения цены договора.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square={true}
          sx={{
            boxShadow: "none",
            borderBottom: "solid 1px rgba(101, 108, 101, 0.20)",
          }}
        >
          <AccordionSummary
            sx={{ p: 0, my: 2, borderRadius: "0" }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h5">
              На что не распространяется банкротство физического лица?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 0, pb: 4 }}>
            <Typography
              variant="p"
              color="text.secondary"
              sx={{ maxWidth: "860px" }}
            >
              Суды не приняли во внимание, что недействительность договора может
              быть связана не только с нарушением самих правил проведения
              торгов, но и с иными нарушениями требований закона. Заключение
              договора об отчуждении недвижимого имущества, принадлежащего
              обществу, допускалось исключительно посредством торгов. Согласно
              пункту 8 статьи 448 ГК РФ условия соответствующего договора могли
              быть изменены сторонами после проведения торгов по основаниям,
              установленным законом, или по иным основаниям, если изменение
              договора не повлияло на те его условия, которые имели существенное
              значение для определения цены на торгах. Однако условие
              относительного того, что продается имущество, обремененное арестом
              в пользу ФНС России, имело существенное значение для правильного
              определения цены договора.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};

export default QA;
