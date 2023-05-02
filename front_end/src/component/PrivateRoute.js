import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckUserLogIn from "./CheckUserLogIn";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
    return (

        <Routes>
            <Route {...rest} element={<CheckUserLogIn isLoggedIn={isLoggedIn}></CheckUserLogIn>}
            />
        </Routes>

        

    )
};

export default PrivateRoute

