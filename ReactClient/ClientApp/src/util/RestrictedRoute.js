import React from 'react';
import { Redirect, Route } from "react-router-dom";
const RestrictedRoute = ({ component: Component, token, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            token
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                />}
    />;

export default RestrictedRoute;