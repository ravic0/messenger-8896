import React from 'react';
import { TextsmsOutlined } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

export function BannerPlaceholder(props) {
    return (
        <div className="login-left__container--content">
        <div className="login-left__container--content-image">
          <TextsmsOutlined className="message" />
        </div>


        <Typography className="heading-secondary color-white" variant="h4">
          Converse with anyone with any language
        </Typography>

      </div>
    )
}