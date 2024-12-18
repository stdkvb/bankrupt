import { Modal, Box } from "@mui/material";

const Popup = ({ isPopupOpen, onClose, children }) => {
  return (
    <Modal open={isPopupOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "auto",
          maxWidth: { xs: "90%", sm: "580px" },
          height: "fit-content",
          bgcolor: "background.paper",
          p: { xs: 2, md: 4 },
          outline: "none",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default Popup;
