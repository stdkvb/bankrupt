import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Link } from "@mui/material";

const Form = ({
  title,
  buttonText,
  onSubmit,
  onHandleSubmit,
  children,
  submitError,
}) => {
  return (
    <Box
      component="form"
      onSubmit={onHandleSubmit(onSubmit)}
      sx={{
        maxWidth: "400px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 2, textAlign: { xs: "center", md: "left" } }}
      >
        {title}
      </Typography>
      {children}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        {buttonText}
      </Button>
      <Typography color="error.main" sx={{ mt: 2 }}>
        {submitError}
      </Typography>
    </Box>
  );
};

export default Form;
