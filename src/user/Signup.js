import React from "react";
import { Redirect } from "react-router-dom";
import { signup } from "../auth";

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
      redirectToSignin: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;

    const user = {
      name,
      email,
      password,
    };

    signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true,
        });

        setTimeout(() => {
          this.setState({
            redirectToSignin: true,
          });
        }, 1000);
      }
    });
  };

  signupForm = () => {
    const { name, email, password } = this.state;
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={this.handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
          Submit
        </button>
      </form>
    );
  };

  render() {
    const { error, open, redirectToSignin } = this.state;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign Up</h2>

        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
          {error}
        </div>

        <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
          Your account has been successfuly created!! You will be redirectd to sign in page shortly.
        </div>

        {this.signupForm()}
      </div>
    );
  }
}

export default Signup;
