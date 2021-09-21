import React from "react";
import Bubbles from "../../../assets/images/bubble.svg";
import { Typography } from "@material-ui/core";

export function BannerPlaceholder(props) {
  return (
    <div className="login-left__container--content">
      <div className="login-left__container--content-image">
        <img src={Bubbles} alt="Message bubbles icon" />
      </div>

      <Typography className="heading-secondary color-white" variant="h4">
        Converse with anyone with any language
      </Typography>
    </div>
  );
}
