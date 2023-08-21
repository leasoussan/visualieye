import React from "react";
import { Outlet, Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn }) => {
    console.log("isLoging in private ", isLoggedIn);

    return (
        isLoggedIn ? 

        <Outlet />
        : 
        <Navigate to='/' />
    )
};

export default PrivateRoute;

// const PrivateRoute = ({ isLoggedIn }) => {
//     console.log("isLoging in private ", isLoggedIn);
//     return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
//   };
// export default PrivateRoute

