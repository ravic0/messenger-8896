import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "../store/utils/thunkCreators";
import { BannerPlaceholder } from "../components";

export const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  if (user && user.id) {
    return <Redirect to="/home" />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  

  return (
    <Grid container className="login">

      {/* Left Container */}

      <Grid item xs={4} className="login-left__container">
        <BannerPlaceholder />
      </Grid>

      {/* Right Container */}

      <Grid item xs={8} className="login-right__container">

        <Grid item xs={12} className="login-right__container--redirect">
        <Typography className="heading-tertiary padding-small" color="secondary" variant="h6" display="inline">Need to register?</Typography>
          <Button className="btn" color="primary" onClick={() => history.push("/register")}>
          <span className="btn-text box-shadow">Register</span></Button>
        </Grid>

        <form  className="login-right__container--form" onSubmit={handleLogin}>
        <Typography className="heading-secondary text-bold" variant="h3">
           Welcome Back!
          </Typography>
          
          <Grid>
            <Grid className="login-right__container--form-field">
              <FormControl className="login-right__container--form-field--input" margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  className="login-right__container--form-input"
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid className="login-right__container--form-field">
            <FormControl className="login-right__container--form-field--input" margin="normal" required>
              <TextField
                label="Password"
                aria-label="password"
                type="password"
                className="login-right__container--form-input"
                name="password"
              />
            </FormControl>
            </Grid>
            <Grid>
              <Button className="btn btn-primary btn-center margin-small" type="submit" variant="contained" size="large">
              <span className="btn-text color-white">Login</span>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
