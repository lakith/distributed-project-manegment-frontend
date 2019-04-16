import React, { Component } from "react";
import {
  Grid,
  Segment,
  Header,
  Form,
  Button,
  Message,
  Icon,
} from "semantic-ui-react";
import { Redirect, NavLink } from "react-router-dom";
import * as authActions from "../../../store/index";
import { connect } from "react-redux";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    file: "",
    validationErrors: []
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      let userData = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        userName: this.state.username,
        file: this.state.file
      };

      this.props.onAuthSubmit(userData);
    }
  };

  handleInputErrors = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  displayErrors = errors =>
    errors.map((error, index) => <p key={index}>{error.message}</p>);

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isEmptyForm(this.state)) {
      error = { message: "Fill all the fields" };
      this.setState({ validationErrors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Invalied password" };
      this.setState({ validationErrors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    console.log("Form Validation - password");
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  isEmptyForm = ({
    username,
    email,
    password,
    passwordConfirmation,
    name,
    file
  }) => {
    console.log("Form Validation - required");
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation ||
      !name.length ||
      !file
    );
  };

  render() {
    let {
      validationErrors,
      username,
      email,
      password,
      passwordConfirmation,
      name
    } = this.state;

    let setRedirect = null;
    if (this.props.authSubmitRedirect) {
      setRedirect = <Redirect to="/login" />;
    }

    let setRirectAuthentic = null;
    if (this.props.isAuthenticated) {
      setRedirect = <Redirect to="/" />;
    }

    return (
      <div className="login-form">
        <style>
          {`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}
        </style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          {setRedirect}
          {setRirectAuthentic}
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Icon name="puzzle" size="massive" /> Register in to OPUS
            </Header>

            <Form size="large">
              <Segment stacked>
                <Form.Input
                  className={this.handleInputErrors(validationErrors, "name")}
                  fluid
                  name="name"
                  icon="user"
                  iconPosition="left"
                  placeholder="Name"
                  onChange={this.handleChange}
                  type="text"
                  value={name}
                  required
                />
                <Form.Input
                  className={this.handleInputErrors(
                    validationErrors,
                    "username"
                  )}
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={this.handleChange}
                  type="text"
                  value={username}
                  required
                />
                <Form.Input
                  className={this.handleInputErrors(validationErrors, "email")}
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                  type="email"
                  value={email}
                  required
                />
                <Form.Input
                  className={this.handleInputErrors(
                    validationErrors,
                    "password"
                  )}
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={this.handleChange}
                  type="password"
                  value={password}
                  required
                />
                <Form.Input
                  className={this.handleInputErrors(
                    validationErrors,
                    "password"
                  )}
                  fluid
                  name="passwordConfirmation"
                  icon="repeat"
                  iconPosition="left"
                  placeholder="Password Confirmation"
                  onChange={this.handleChange}
                  type="password"
                  value={passwordConfirmation}
                  required
                />
                <Form.Input
                  type="file"
                  icon="tags"
                  iconPosition="left"
                  name="file"
                  onChange={this.addFile}
                />
                <Button
                  disabled={this.props.loading}
                  className={this.props.loading ? "loading" : ""}
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Segment>
            </Form>
            {this.props.error ? (
              <Message error>
                <h3>Error</h3>
                {this.props.error}
              </Message>
            ) : null}
            {validationErrors.length > 0 ? (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(validationErrors)}
              </Message>
            ) : null}
            <Message>
              Already a member ? <NavLink to="/login">Login</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.errors,
    submit: state.auth.submit,
    authSubmitRedirect: state.auth.authSubmitRedirect,
    isAuthenticated: state.auth.accessToken != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthSubmit: userData => dispatch(authActions.authSubmit(userData)),
    onSubmitRedirect: () => dispatch(authActions.setAuthSubmitRedirectPath())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
