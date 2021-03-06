import React, { Component } from "react";
import { Link } from "react-router-dom";

import { list } from "./apiUser";
import Placeholder from "../assets/avatar.png";

export class Users extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = (users) => {
    return (
      <div className="row">
        {users.map((user, i) => (
          <div className="col-md-4 p-3" key={i}>
            <div className="card" style={{ padding: "10px" }}>
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
                <Link to={`/user/${user._id}`} className="btn btn-raised  btn-small">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
