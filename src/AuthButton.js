import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import authService from './authService';

const AuthButton = () => {
    const isLoggedIn = authService.isAuthenticated();

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Redirect to /login after logout
        window.location.reload();
        return <Navigate to="/login" />;
    };

    return (
        <div>
            {/*{isLoggedIn ? (*/}
            {/*    <>*/}
            {/*        <button onClick={handleLogout}>Logout</button>*/}
            {/*        <Link to="/movies">Movies</Link>*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <Link to="/login">Login</Link>*/}
            {/*)}*/}
        </div>
    );
};

export default AuthButton;