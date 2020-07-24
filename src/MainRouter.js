import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import Users from "./user/Users";
import FindPeople from "./user/FindPeople";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import NewPost from "./post/NewPost";
import Posts from "./post/Posts";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/" component={Posts} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/post/create" component={NewPost} />
      <Route exact path="/post/:postId" component={SinglePost} />
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      <PrivateRoute exact path="/findpeople" component={FindPeople} />
    </Switch>
  </div>
);

export default MainRouter;
