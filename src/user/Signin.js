import React from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

class Signin extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    signin(user).then((data) => {
      if (data.error) this.setState({ error: data.error, loading: false });
      else {
        this.setState({
          error: "",
          email: "",
          password: "",
          loading: false,
        });

        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  signinForm = () => {
    const { email, password } = this.state;
    return (
      <form>
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
    const { error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign In</h2>

        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            {" "}
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        {this.signinForm()}
      </div>
    );
  }
}

export default Signin;
