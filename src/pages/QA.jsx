import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import api from "../utils/Api";

const QA = () => {
  const defaultQA = [
    {
      question: "На что не распространяется банкротство физического лица?",
      answer:
        "Суды не приняли во внимание, что недействительность договора может",
    },
    {
      question: "На что не распространяется банкротство физического лица?",
      answer: "ния цены на торгах. Однако условие",
    },
    {
      question: "На что не распространяется банкротств?",
      answer:
        "Суды не приняли во внимание, что недействительность договора может",
    },
  ];

  const [qa, setQA] = useState(defaultQA);
  const [loading, setLoading] = useState(true);

  const getQA = () => {
    api
      .getQA()
      .then((data) => {
        if (data.status === "success") {
          setQA(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getQA, []);

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
      )}
    </Container>
  );
};

export default QA;
