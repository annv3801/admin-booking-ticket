import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from './authService';
import axios from 'axios';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoggedIn, setLoggedIn] = React.useState(authService.isAuthenticated());

    const handleLogin = async () => {
        const response = await axios.post('https://cinema.dummywebsite.tech/Account/Sign-In', { phoneNumber, password });
        if (response.data.success) {
            localStorage.setItem('token', response.data.data.accessToken);
            window.location.reload()
            setError('');
            setLoggedIn(true);
        } else {
            setError(response.data.message);
        }
    };

    // Redirect to /movies if logged in
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="d-flex flex-column flex-root" id="kt_app_root">
            <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
                    <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                        <div className="w-lg-500px p-10">
                            <div className="form w-100">
                                <div className="text-center mb-11">
                                    <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
                                    {/*<div className="text-gray-500 fw-semibold fs-6">Your Social Campaigns</div>*/}
                                </div>
                                {/*<div className="row g-3 mb-9">*/}
                                {/*    <div className="col-md-6">*/}
                                {/*        <a href="#"*/}
                                {/*           className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">*/}
                                {/*            <img alt="Logo" src="assets/media/svg/brand-logos/google-icon.svg"*/}
                                {/*                 className="h-15px me-3"/>Sign in with Google</a>*/}
                                {/*    </div>*/}
                                {/*    <div className="col-md-6">*/}
                                {/*        <a href="#"*/}
                                {/*           className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">*/}
                                {/*            <img alt="Logo" src="assets/media/svg/brand-logos/apple-black.svg"*/}
                                {/*                 className="theme-light-show h-15px me-3"/>*/}
                                {/*            <img alt="Logo" src="assets/media/svg/brand-logos/apple-black-dark.svg"*/}
                                {/*                 className="theme-dark-show h-15px me-3"/>Sign in with Apple</a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="separator separator-content my-14">*/}
                                {/*    <span className="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>*/}
                                {/*</div>*/}
                                <div className="fv-row mb-8">
                                    <input type="text" placeholder="Phone Number" name="phoneNumber" autoComplete="off"
                                           className="form-control bg-transparent" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                </div>
                                <div className="fv-row mb-3">
                                    <input type="password" placeholder="Password" name="password" autoComplete="off"
                                           className="form-control bg-transparent" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                                    <div></div>
                                    {/*<a href="../../demo1/dist/authentication/layouts/corporate/reset-password.html"*/}
                                    {/*   className="link-primary">Forgot Password ?</a>*/}
                                </div>
                                <div className="d-grid mb-10">
                                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                                        <span className="indicator-label">Sign In</span>
                                        <span className="indicator-progress">Please wait...
										<span
                                            className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                    </button>
                                </div>
                                <div>{error}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;