import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import User from "./components/User";
import Comments from "./components/Comments";

const App = () => {
  return (
    <div className="light">
      <div className="container">
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Posts type="top" />} />
          <Route path="/new" render={() => <Posts type="new" />} />
          <Route path="/comments/:post" component={Comments} />
          <Route path="/user/:username" component={User} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
