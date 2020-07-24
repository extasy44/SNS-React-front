import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import Placeholder from "../assets/avatar.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class FindPeople extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      open: false,
    };
  }

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    findPeople(userId, token).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ users: data });
      }
    });
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(i, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}`,
        });
      }
    });
  };

  renderUsers = (users) => (
    <div className="row">
      {users.map((user, i) => (
        <div className="col-md-4 p-2" key={i}>
          <div className="card">
            <img
              className="card-img-top"
              src={`${process.env.REACT_APP_API_URL}/user/photo/${
                user._id
              }?${new Date().getTime()}`}
              onError={(i) => (i.target.src = `${Placeholder}`)}
              alt={user.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "contain",
                border: "1px solid #eee",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-sm">
                View Profile
              </Link>

              <button
                onClick={() => this.clickFollow(user, i)}
                className="btn btn-raised btn-info float-right btn-sm"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users, open, followMessage } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Find People to Follow</h2>

        {open && <div className="alert alert-success">{followMessage}</div>}

        {this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
