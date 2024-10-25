import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
    // Check if the token exists in cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    // If token doesn't exist, redirect to the login page
    if (!token) {
        return <Navigate to="/Signin" replace />;
    }

    // If token exists, render the protected component
    return children;
};

export default Protected;
