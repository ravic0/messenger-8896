import React from "react";
import Bubbles from "../../../assets/images/bubble.svg";
import { Box, Typography } from "@material-ui/core";

export function BannerPlaceholder(props) {
  return (
    <Box className="login-left__container--content">
      <Box className="login-left__container--content-image">
        <img src={Bubbles} alt="Message bubbles icon" />
      </Box>

      <Typography className="heading-secondary color-white" variant="h4">
        Converse with anyone with any language
      </Typography>
    </Box>
  );
}
