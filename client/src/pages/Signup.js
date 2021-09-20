import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "../store/utils/thunkCreators"; //../../store/utils/thunkCreators
import { BannerPlaceholder } from "../components";


export const Signup = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user && user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className="login">

      {/* Left Container */}

      <Grid item xs={4} className="login-left__container">
        <BannerPlaceholder />
      </Grid>

      {/* Right Container */}


      <Grid item xs={8} className="login-right__container">

        <Grid item xs={12} className="login-right__container--redirect">
          <Typography className="heading-tertiary padding-small" color="secondary" variant="h6" display="inline">Already have an account?</Typography>

          <Button className="btn" color="primary"
            onClick={() => history.push("/login")}>
            <span className="btn-text box-shadow">Login</span>
          </Button>

        </Grid>



        <form className="login-right__container--form" onSubmit={handleRegister}
        >
          <Typography className="heading-secondary text-bold" variant="h3">
            Create an account
          </Typography>

          <Grid>


            <Grid className="login-right__container--form-field">
              <FormControl className="login-right__container--form-field--input">
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  className="login-right__container--form-input"
                  required
                />
              </FormControl>
            </Grid>
            <Grid className="login-right__container--form-field">
              <FormControl className="login-right__container--form-field--input">
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  className="login-right__container--form-input"
                  required
                />
              </FormControl>
            </Grid>
            <Grid className="login-right__container--form-field">
              <FormControl className="login-right__container--form-field--input" error={!!formErrorMessage.confirmPassword}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  className="login-right__container--form-input"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className="login-right__container--form-field">
              <FormControl className="login-right__container--form-field--input" error={!!formErrorMessage.confirmPassword}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  className="login-right__container--form-input"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Button type="submit" className="btn btn-primary btn-center margin-small" variant="container" size="large">
              <span className="btn-text color-white">Create</span>
            </Button>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
