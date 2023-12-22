import React from "react";
import { Paper, Typography, Button, Stack, Link } from "@mui/material";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import qa from "../data/qa.json";

const QA = () => {
  console.log(qa);
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
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: { xs: 2, md: 4 } }}>
          Часто задаваемые вопросы
        </Typography>
        {qa.map(({ question, answer }, i) => {
          return (
            <Accordion
              key={i}
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
                <Typography variant="h5">{question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0, pb: 4 }}>
                <Typography
                  variant="p"
                  color="text.secondary"
                  sx={{ maxWidth: "860px" }}
                >
                  {answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>
    </Container>
  );
};

export default QA;
