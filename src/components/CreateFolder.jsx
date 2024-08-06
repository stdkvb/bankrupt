import { useState } from "react";
import { Typography, Button, TextField, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import api from "../utils/Api";
import Popup from "../components/Popup";

const CreateFolder = ({ isPopupOpen, onClose, updateFolders }) => {
  //create new folder
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = (event) => {
    event.preventDefault();
    api
      .createFolder(folderName)
      .then((data) => {
        if (data.status === "success") {
          updateFolders();
        } else {
          alert("Ошибка сервера, попробуйте позже");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    onClose();
    setFolderName("");
  };

  return (
    <Popup isPopupOpen={isPopupOpen} onClose={onClose} component="form">
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: { xs: 1, md: 2 },
          top: { xs: 1, md: 2 },
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" mb={3}>
        Создать папку
      </Typography>
      <Box component="form" onSubmit={handleCreateFolder}>
        <TextField
          label="Название папки"
          variant="standard"
          size="medium"
          fullWidth
          id="folderName"
          name="folderName"
          sx={{ mb: 2 }}
          required
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          type="submit"
          disabled={!folderName}
        >
          Создать
        </Button>
      </Box>
    </Popup>
  );
};

export default CreateFolder;
