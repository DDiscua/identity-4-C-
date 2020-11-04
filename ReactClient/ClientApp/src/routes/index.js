import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserList from "../pages/Dashboard/UserList";

const RoutesApp = ({ match }) => {
    console.log(match);
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route
                    path={`${match.url}dashboard`}
                    component={Dashboard}
                />
                <Route
                    path={`${match.url}users`}
                    component={UserList}
                />
            </Switch>
        </div>
    );
};

export default RoutesApp;
