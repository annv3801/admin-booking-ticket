import React from 'react';
import {Navigate} from "react-router-dom";
import authService from "../authService";


const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
    };
    return (
        <div id="kt_app_header" className="app-header" data-kt-sticky="true"
             data-kt-sticky-activate="{default: true, lg: true}" data-kt-sticky-name="app-header-minimize"
             data-kt-sticky-offset="{default: '200px', lg: '0'}" data-kt-sticky-animation="false">
            {/*begin::Header container*/}
            <div className="app-container container-fluid d-flex align-items-stretch justify-content-between"
                 id="kt_app_header_container">
                {/*begin::Sidebar mobile toggle*/}
                <div className="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" title="Show sidebar menu">
                    <div className="btn btn-icon btn-active-color-primary w-35px h-35px"
                         id="kt_app_sidebar_mobile_toggle">
                        <i className="ki-duotone ki-abstract-14 fs-2 fs-md-1">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                    </div>
                </div>
                {/*end::Sidebar mobile toggle*/}
                {/*begin::Mobile logo*/}
                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <a href="../../demo1/dist/index.html" className="d-lg-none">
                        <img alt="Logo" src="assets/media/logos/default-small.svg" className="h-30px"/>
                    </a>
                </div>
                {/*end::Mobile logo*/}
                {/*begin::Header wrapper*/}
                <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
                     id="kt_app_header_wrapper">
                    {/*begin::Menu wrapper*/}
                    <div className="app-header-menu app-header-mobile-drawer align-items-stretch" data-kt-drawer="true"
                         data-kt-drawer-name="app-header-menu" data-kt-drawer-activate="{default: true, lg: false}"
                         data-kt-drawer-overlay="true" data-kt-drawer-width="250px" data-kt-drawer-direction="end"
                         data-kt-drawer-toggle="#kt_app_header_menu_toggle" data-kt-swapper="true"
                         data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                         data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}">

                    </div>
                    {/*end::Menu wrapper*/}
                    {/*begin::Navbar*/}
                    <div className="app-navbar flex-shrink-0">
                        {/*begin::User menu*/}
                        <div className="app-navbar-item ms-1 ms-md-4" id="kt_header_user_menu_toggle">
                            {/*begin::Menu wrapper*/}
                            <div className="cursor-pointer symbol symbol-35px"
                                 data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent"
                                 data-kt-menu-placement="bottom-end">
                                <img src="assets/media/avatars/300-3.jpg" className="rounded-3" alt="user"/>
                            </div>
                            {/*begin::User account menu*/}
                            <div
                                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                                data-kt-menu="true">
                                {/*begin::Menu item*/}
                                <div className="menu-item px-3">
                                    <div className="menu-content d-flex align-items-center px-3">
                                        {/*begin::Avatar*/}
                                        <div className="symbol symbol-50px me-5">
                                            <img alt="Logo" src="assets/media/avatars/300-3.jpg"/>
                                        </div>
                                        {/*end::Avatar*/}
                                        {/*begin::Username*/}
                                        <div className="d-flex flex-column">
                                            <div className="fw-bold d-flex align-items-center fs-5">Robert Fox
                                                <span
                                                    className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Pro</span>
                                            </div>
                                            <a href="#"
                                               className="fw-semibold text-muted text-hover-primary fs-7">robert@kt.com</a>
                                        </div>
                                        {/*end::Username*/}
                                    </div>
                                </div>
                                {/*end::Menu item*/}
                                {/*begin::Menu separator*/}
                                <div className="separator my-2"></div>
                                {/*end::Menu separator*/}
                                {/*begin::Menu item*/}
                                <div className="menu-item px-5">
                                    <a href="../../demo1/dist/account/overview.html" className="menu-link px-5">My
                                        Profile</a>
                                </div>
                                {/*end::Menu item*/}
                                {/*begin::Menu item*/}
                                <div className="menu-item px-5">
                                    <a href="../../demo1/dist/apps/projects/list.html" className="menu-link px-5">
                                        <span className="menu-text">My Projects</span>
                                        <span className="menu-badge">
													<span
                                                        className="badge badge-light-danger badge-circle fw-bold fs-7">3</span>
												</span>
                                    </a>
                                </div>
                                {/*end::Menu item*/}
                                {/*begin::Menu item*/}
                                <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                                     data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                    <a href="#" className="menu-link px-5">
                                        <span className="menu-title">My Subscription</span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    {/*begin::Menu sub*/}
                                    <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                        {/*begin::Menu item*/}
                                        <div className="menu-item px-3">
                                            <a href="../../demo1/dist/account/referrals.html"
                                               className="menu-link px-5">Referrals</a>
                                        </div>
                                        {/*end::Menu item*/}
                                        {/*begin::Menu item*/}
                                        <div className="menu-item px-3">
                                            <a href="../../demo1/dist/account/billing.html"
                                               className="menu-link px-5">Billing</a>
                                        </div>
                                        {/*end::Menu item*/}
                                        {/*begin::Menu item*/}
                                        <div className="menu-item px-3">
                                            <a href="../../demo1/dist/account/statements.html"
                                               className="menu-link px-5">Payments</a>
                                        </div>
                                        {/*end::Menu item*/}
                                        {/*begin::Menu item*/}
                                        <div className="menu-item px-3">
                                            <a href="../../demo1/dist/account/statements.html"
                                               className="menu-link d-flex flex-stack px-5">Statements
                                                <span className="ms-2 lh-0" data-bs-toggle="tooltip"
                                                      title="View your statements">
														<i className="ki-duotone ki-information-5 fs-5">
															<span className="path1"></span>
															<span className="path2"></span>
															<span className="path3"></span>
														</i>
													</span></a>
                                        </div>
                                        {/*end::Menu item*/}
                                        {/*begin::Menu separator*/}
                                        <div className="separator my-2"></div>
                                        {/*end::Menu separator*/}
                                        {/*begin::Menu item*/}
                                        <div className="menu-item px-3">
                                            <div className="menu-content px-3">
                                                <label
                                                    className="form-check form-switch form-check-custom form-check-solid">
                                                    <input className="form-check-input w-30px h-20px" type="checkbox"
                                                           value="1" checked="checked" name="notifications"/>
                                                    <span
                                                        className="form-check-label text-muted fs-7">Notifications</span>
                                                </label>
                                            </div>
                                        </div>
                                        {/*end::Menu item*/}
                                    </div>
                                    {/*end::Menu sub*/}
                                </div>
                                {/*end::Menu item*/}
                                {/*begin::Menu item*/}
                                <div className="menu-item px-5">
                                    <a href="../../demo1/dist/account/statements.html" className="menu-link px-5">My
                                        Statements</a>
                                </div>
                                {/*end::Menu item*/}
                                {/*begin::Menu separator*/}
                                <div className="separator my-2"></div>
                                {/*end::Menu separator*/}
                                {/*begin::Menu item*/}
                                <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                                     data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                    <a href="#" className="menu-link px-5">
												<span className="menu-title position-relative">Mode
												<span
                                                    className="ms-5 position-absolute translate-middle-y top-50 end-0">
													<i className="ki-duotone ki-night-day theme-light-show fs-2">
														<span className="path1"></span>
														<span className="path2"></span>
														<span className="path3"></span>
														<span className="path4"></span>
														<span className="path5"></span>
														<span className="path6"></span>
														<span className="path7"></span>
														<span className="path8"></span>
														<span className="path9"></span>
														<span className="path10"></span>
													</i>
													<i className="ki-duotone ki-moon theme-dark-show fs-2">
														<span className="path1"></span>
														<span className="path2"></span>
													</i>
												</span></span>
                                    </a>
                                    {/*begin::Menu*/}
                                    <div
                                        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px"
                                        data-kt-menu="true" data-kt-element="theme-mode-menu">
                                        {/*begin::Menu item*/}
                                        <div className="menu-item px-3 my-0">
                                            <a href="#" className="menu-link px-3 py-2" data-kt-element="mode"
                                               data-kt-value="light">
														<span className="menu-icon" data-kt-element="icon">
															<i className="ki-duotone ki-night-day fs-2">
																<span className="path1"></span>
																<span className="path2"></span>
																<span className="path3"></span>
																<span className="path4"></span>
																<span className="path5"></span>
																<span className="path6"></span>
																<span className="path7"></span>
																<span className="path8"></span>
																<span className="path9"></span>
																<span className="path10"></span>
															</i>
														</span>
                                                <span className="menu-title">Light</span>
                                            </a>
                                        </div>
                                        {/*end::Menu item*/}
                                        {/*begin::Menu item*/}
                                        <div className="menu-item px-3 my-0">
                                            <a href="#" className="menu-link px-3 py-2" data-kt-element="mode"
                                               data-kt-value="dark">
														<span className="menu-icon" data-kt-element="icon">
															<i className="ki-duotone ki-moon fs-2">
																<span className="path1"></span>
																<span className="path2"></span>
															</i>
														</span>
                                                <span className="menu-title">Dark</span>
                                            </a>
                                        </div>
                                        {/*end::Menu item*/}
                                        {/*begin::Menu item*/}
                                        <div className="menu-item px-3 my-0">
                                            <a href="#" className="menu-link px-3 py-2" data-kt-element="mode"
                                               data-kt-value="system">
														<span className="menu-icon" data-kt-element="icon">
															<i className="ki-duotone ki-screen fs-2">
																<span className="path1"></span>
																<span className="path2"></span>
																<span className="path3"></span>
																<span className="path4"></span>
															</i>
														</span>
                                                <span className="menu-title">System</span>
                                            </a>
                                        </div>
                                        {/*end::Menu item*/}
                                    </div>
                                    {/*end::Menu*/}
                                </div>
                                {/*end::Menu item*/}
                                {/*begin::Menu item*/}
                                <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                                     data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                    <a href="#" className="menu-link px-5">
												<span className="menu-title position-relative">Language
												<span
                                                    className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">English
												<img className="w-15px h-15px rounded-1 ms-2"
                                                     src="assets/media/flags/united-states.svg" alt=""/></span></span>
                                    </a>
                                </div>
                                {/*end::Menu item*/}
                                {/*begin::Menu item*/}
                                <div className="menu-item px-5 my-1">
                                    <a href="../../demo1/dist/account/settings.html" className="menu-link px-5">Account
                                        Settings</a>
                                </div>
                                {/*end::Menu item*/}
                                {/*begin::Menu item*/}
                                <div className="menu-item px-5">
                                    <button onClick={handleLogout}
                                       className="menu-link px-5">Sign Out</button>
                                </div>
                                {/*end::Menu item*/}
                            </div>
                            {/*end::User account menu*/}
                            {/*end::Menu wrapper*/}
                        </div>
                        {/*end::User menu*/}
                        {/*begin::Header menu toggle*/}
                        <div className="app-navbar-item d-lg-none ms-2 me-n2" title="Show header menu">
                            <div className="btn btn-flex btn-icon btn-active-color-primary w-30px h-30px"
                                 id="kt_app_header_menu_toggle">
                                <i className="ki-duotone ki-element-4 fs-1">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </div>
                        </div>
                        {/*end::Header menu toggle*/}
                        {/*begin::Aside toggle*/}
                        {/*end::Header menu toggle*/}
                    </div>
                    {/*end::Navbar*/}
                </div>
                {/*end::Header wrapper*/}
            </div>
            {/*end::Header container*/}
        </div>
    );
};

export default Header;
