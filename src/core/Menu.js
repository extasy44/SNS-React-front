import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#999999" };
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-light">
        <li className="nav-item --dark">
          <Link className="nav-link" to="/" style={isActive(history, "/")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users" style={isActive(history, "/users")}>
            Users
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>
                Sign Up
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                to={`/post/create`}
                style={isActive(history, `/post/create`)}
                className="nav-link"
              >
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/findpeople" style={isActive(history, "/findpeople")}>
                Find Users
              </Link>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#999999" }}
                onClick={() => signout(() => history.push("/"))}
              >
                Sign Out
              </span>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/user/${isAuthenticated().user._id}`}
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              >
                {isAuthenticated().user.name}'s Profile
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
