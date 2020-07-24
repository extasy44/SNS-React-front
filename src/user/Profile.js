import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";

import { read } from "./apiUser";
import Placeholder from "../assets/avatar.png";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "../post/apiPost";

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: { following: [], followers: [] },
      redirectToSignIn: false,
      following: false,
      error: "",
      posts: [],
    };
  }

  checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = (userId) => {
    const token = isAuthenticated().token;

    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignIn: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
        this.loadPosts(data._id);
      }
    });
  };

  loadPosts = (userId) => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then((data) => {
      this.setState({ posts: data });
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.init(this.props.match.params.userId);
    }
  }

  render() {
    const { redirectToSignIn, user, posts } = this.state;
    const id = user._id;
    if (redirectToSignIn) return <Redirect to="/signin" />;

    let photoUrl = id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`
      : Placeholder;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-4">
            <img
              style={{
                height: "200px",
                width: "auto",
                border: "1px solid black",
              }}
              className="img-thumbnail"
              src={photoUrl}
              alt={user.name}
              onError={(i) => (i.target.src = `${Placeholder}`)}
            />
          </div>

          <div className="col-md-8">
            <div className="lead">
              <div>Hello, {user.name} </div>
              <div>Email : {user.email} </div>
              <div>{`Joined ${new Date(user.created).toDateString()}`}</div>
            </div>
            <hr />
            {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
              <div className="d-inline-block">
                <Link className="btn btn-raised btn-info mr-2" to={`/post/create`}>
                  Create Post
                </Link>

                <Link className="btn btn-raised btn-success mr-2" to={`/user/edit/${user._id}`}>
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col md-12">
            <p className="lead">{user.about}</p>
          </div>
        </div>
        <hr />
        <ProfileTabs followers={user.followers} following={user.following} posts={posts} />
      </div>
    );
  }
}

export default Profile;
