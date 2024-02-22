import React from "react";
import { Paper, Typography, Button, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputMask from "react-input-mask";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

const Questions = () => {
  // modal controller
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
          display: "flex",
          flexDirection: "column",
          gap: { xs: [3], md: [4] },
        }}
      >
        <Typography variant="h5">Есть вопросы?</Typography>
        <Typography variant="p">
          Заполните форму и наш менеджер свяжется с вами
        </Typography>
        <Button
          variant="contained"
          sx={{ width: { xs: "100%", md: "200px" } }}
          onClick={handleOpen}
        >
          Задать вопрос
        </Button>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "300px", md: "580px" },
            bgcolor: "background.paper",
            p: { xs: 2, md: 4 },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: { xs: "4px", md: "16px" },
              top: { xs: "4px", md: "16px" },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Есть вопросы?
          </Typography>
          <Typography variant="p" color="text.secondary">
            Укажите свой вопрос, и наш специалист свяжется с вами
          </Typography>
          <TextField
            label="Имя"
            variant="standard"
            size="medium"
            required
            fullWidth
            id="name"
            name="name"
            sx={{ mb: 2, mt: 3 }}
          />
          <InputMask mask="+7 (999) 999 99 99">
            <TextField
              label="Телефон"
              variant="standard"
              size="medium"
              required
              fullWidth
              id="phone"
              name="phone"
              sx={{ mb: 2 }}
            />
          </InputMask>
          <TextField
            label="Email"
            variant="standard"
            size="medium"
            required
            fullWidth
            id="email"
            name="email"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Ваш вопрос"
            variant="standard"
            size="medium"
            required
            fullWidth
            id="question"
            name="question"
            sx={{ mb: 4 }}
          />
          <FormControlLabel
            control={<Checkbox value="policy" />}
            label={
              <Typography display="inline" color="text.secondary">
                Я соглашаюсь с
                <Link href="#" target="_blank" color="primary.main">
                  {" "}
                  политикой конфиденциальности
                </Link>
              </Typography>
            }
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Отправить
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Questions;
