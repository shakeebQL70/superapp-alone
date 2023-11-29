import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomButton } from "UI/button";

const Home = () => {
  return (
    <Box>
      <Typography> Welcome Home </Typography>
      <CustomButton variant="contained"> Upload </CustomButton>

    </Box>
  );
};

export default Home;
