import React, { Component } from "react";
import { Link } from "react-router-dom";
import Placeholder from "../assets/avatar.png";

class ProfileTabs extends Component {
  state = {
    isPostLoading: false,
  };

  render() {
    const { following, followers, posts } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-primary">Followers</h5>
            <hr />
            {followers.map((person, i) => (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      style={{ borderRadius: "50%", border: "1px solid black" }}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${
                        person._id
                      }?${new Date().getTime()}`}
                      alt={person.name}
                      onError={(i) => (i.target.src = `${Placeholder}`)}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                  <p style={{ clear: "both" }}>{person.about}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h5 className="text-primary">Following</h5>
            <hr />
            {following.map((person, i) => (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      style={{ borderRadius: "50%", border: "1px solid black" }}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${
                        person._id
                      }?${new Date().getTime()}`}
                      alt={person.name}
                      onError={(i) => (i.target.src = `${Placeholder}`)}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                  <p style={{ clear: "both" }}>{person.about}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h5 className="text-primary">{posts.length} Posts</h5>
            <hr />
            {this.state.isPostLoading ? (
              <div> Loading Posts... </div>
            ) : (
              posts.map((post, i) => (
                <div key={i}>
                  <div>
                    <Link to={`/post/${post._id}`}>
                      <div>
                        <div className="mb-2">{post.title}</div>
                      </div>
                      <hr />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
