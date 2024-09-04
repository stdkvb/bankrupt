import { useContext, useState, useEffect } from "react";
import {
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
import api from "../utils/Api";
import Popup from "../components/Popup";

const Trial = () => {
  //modal controller
  const [modalOpen, setModalOpen] = useState(false);

  //current user
  const user = useContext(UserContext).user.personal;

  const personalInputs = [
    {
      label: "Имя",
      name: "name",
      defaultValue: `${user && user.lastName} ${user && user.firstName} ${
        user && user.secondName
      }`,
    },
    { label: "Телефон", name: "phone", defaultValue: `${user && user.phone}` },
    { label: "Email", name: "email", defaultValue: `${user && user.email}` },
  ];

  //success popup
  const [isSuccess, setIsSuccess] = useState(false);

  //form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    api
      .requestDemoAccess(formData)
      .then((data) => {
        if (data.status === "success") {
          setModalOpen(false);
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsReadOnly(true);
  };

  //get policy url
  const [policyUrl, setPolicyUrl] = useState("");
  const getPolicyUrl = () => {
    api
      .getPolicy()
      .then((data) => {
        if (data.status === "success") {
          setPolicyUrl(data.data.url);
        } else {
          console.log("Failed to fetch data:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching catalog data:", error);
      });
  };
  useEffect(getPolicyUrl, []);

  return (
    <>
      <Button
        type="submit"
        variant="outlined"
        sx={{ maxWidth: { xs: "100%", md: "300px" } }}
        onClick={() => setModalOpen(true)}
      >
        Активировать демо-доступ
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
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
            width: "90%",
            maxWidth: "580px",
            bgcolor: "background.paper",
            p: { xs: 2, md: 4 },
          }}
        >
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{
              position: "absolute",
              right: { xs: "4px", md: "16px" },
              top: { xs: "4px", md: "16px" },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Демо-доступ
          </Typography>
          <Typography variant="p" color="text.secondary">
            Заполните форму для активации демо-доступа и наш специалист свяжется
            с вами в ближайшее время
          </Typography>
          <Stack direction="column" spacing={2} sx={{ my: 2 }}>
            {personalInputs.map((input, i) => (
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
            control={<Checkbox value="policy" required checked />}
            label={
              <Typography display="inline" color="text.secondary">
                Я соглашаюсь с
                <Link href={policyUrl} target="_blank" color="primary.main">
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
      <Popup
        isPopupOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          // updateFavorites();
        }}
      >
        <IconButton
          onClick={() => {
            setIsSuccess(false);
            // updateFavorites();
          }}
          sx={{
            position: "absolute",
            right: { xs: 1, md: 2 },
            top: { xs: 1, md: 2 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={2} sx={{ maxWidth: "90%" }}>
          Ваша заявка принята!
        </Typography>
        <Typography mb={3} sx={{ maxWidth: "90%" }}>
          Мы свяжемся с Вами в ближайшее время
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

export default Trial;
