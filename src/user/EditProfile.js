import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import Placeholder from "../assets/avatar.png";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      id: "",
      name: "",
      email: "",
      password: "",
      about: "",
      redirectToProfile: false,
      fileSize: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  init = (userId) => {
    const token = isAuthenticated().token;

    read(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        this.setState({ redirectToSignIn: true });
      } else {
        this.setState({ id: data._id, name: data.name, email: data.email, about: data.about });
      }
    });
  };

  clickSubmit = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ loading: true });
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          updateUser(data, () => {});
          this.setState({
            redirectToProfile: true,
          });
        }
      });
    }
  };

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({ error: "File size should be less than 100Kb" });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
    if (email.length <= 1) {
      this.setState({ error: "email is required", loading: false });
      return false;
    }
    if (password.length === 0) {
      this.setState({ error: "password is required", loading: false });
      return false;
    }
    if (password.length <= 6) {
      this.setState({ error: "password must be longer than 6 charaters long", loading: false });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  signupForm = (name, email, about, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Profile Photo</label>
          <input
            onChange={this.handleChange("photo")}
            type="file"
            className="form-control"
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={this.handleChange("name")}
            type="text"
            className="form-control"
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">About</label>
          <input
            onChange={this.handleChange("about")}
            type="text"
            className="form-control"
            value={about}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value={password}
            required
          />
        </div>
        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
          Update
        </button>
      </form>
    );
  };

  render() {
    const { id, name, email, password, redirectToProfile, error, loading, about } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`
      : Placeholder;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
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

        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          alt={name}
          onError={(i) => (i.target.src = `${Placeholder}`)}
        />
        {this.signupForm(name, email, about, password)}
      </div>
    );
  }
}

export default EditProfile;
