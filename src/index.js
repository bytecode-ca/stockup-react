import React from "react";
import ReactDOM from "react-dom";
import ListItem from "./ListItem";
import CreateItem from "./CreateItem";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function AppWithRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/createitem" component={CreateItem} />
        <Route exact path="/listitem" component={ListItem} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<AppWithRouter />, document.getElementById("root"));
