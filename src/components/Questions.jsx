import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  Link,
  Stack,
  Box,
  Modal,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { UserContext } from "../utils/UserContext";
import TextInput from "./TextInput";
import Popup from "./Popup";
import api from "../utils/Api";

const Questions = () => {
  //current user
  const user = useContext(UserContext).user.personal;

  const fields = [
    {
      label: "Имя",
      name: "name",
      defaultValue: `${user.lastName} ${user.firstName} ${user.secondName}`,
    },
    { label: "Телефон", name: "phone", defaultValue: `${user.phone}` },
    { label: "Email", name: "email", defaultValue: `${user.email}` },
    { label: "Ваш вопрос", name: "question", defaultValue: "" },
  ];

  const [policyError, setPolicyError] = useState(false);
  const policyValidator = (e) => {
    if (e.target.validity.valid) {
      setPolicyError(false);
    } else {
      setPolicyError(true);
    }
  };

  // modal controller
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //success popup
  const [isSuccess, setIsSuccess] = useState(false);

  //form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    api
      .sendQuestion(formData)
      .then((data) => {
        if (data.status === "success") {
          handleClose();
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          sx={{ width: { xs: "100%", md: "300px" } }}
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
          onSubmit={handleFormSubmit}
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
          <Stack direction="column" spacing={2} my={3}>
            {fields.map((input, i) => (
              <TextInput
                key={i}
                label={input.label}
                name={input.name}
                defaultValue={input.defaultValue}
                required={true}
                multiline={false}
                readOnly={false}
              />
            ))}
          </Stack>
          <FormControlLabel
            control={
              <Checkbox
                value="policy"
                defaultChecked
                required
                onChange={policyValidator}
              />
            }
            label={
              <Typography
                display="inline"
                color="text.secondary"
                fontSize={"15px"}
              >
                Я соглашаюсь с&nbsp;
                <Link
                  component={RouterLink}
                  to="/policy"
                  target="_blank"
                  color="primary.main"
                >
                  политикой конфиденциальности
                </Link>
              </Typography>
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={policyError}
          >
            Отправить
          </Button>
        </Box>
      </Modal>
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
        <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
          Ваш вопрос успешно отправлен
        </Typography>
        <Typography mb={3}>
          Наш специалист свяжется с вами в ближайшее время{" "}
        </Typography>
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

export default Questions;
