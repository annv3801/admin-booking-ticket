import React from 'react';
import authService from "../authService";
import {Navigate} from "react-router-dom";


const Sidebar = () => {
    const isLoggedIn = authService.isAuthenticated();
    if(!isLoggedIn) {<Navigate to="/login" />}
    return (
        <div id="kt_app_sidebar" className="app-sidebar flex-column" data-kt-drawer="true"
             data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}"
             data-kt-drawer-overlay="true" data-kt-drawer-width="225px" data-kt-drawer-direction="start"
             data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
            <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
                <a href="../../demo1/dist/index.html">
                    <img alt="Logo" src="assets/media/logos/default-dark.svg"
                         className="h-25px app-sidebar-logo-default"/>
                    <img alt="Logo" src="assets/media/logos/default-small.svg"
                         className="h-20px app-sidebar-logo-minimize"/>
                </a>
                <div id="kt_app_sidebar_toggle"
                     className="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
                     data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body"
                     data-kt-toggle-name="app-sidebar-minimize">
                    <i className="ki-duotone ki-black-left-line fs-3 rotate-180">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>
                </div>
            </div>
            <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
                <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper">
                    <div id="kt_app_sidebar_menu_scroll" className="scroll-y my-5 mx-3" data-kt-scroll="true"
                         data-kt-scroll-activate="true" data-kt-scroll-height="auto"
                         data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
                         data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px"
                         data-kt-scroll-save-state="true">
                        <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6"
                             id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
                            <div className="menu-item">
                                <a className="menu-link"
                                   href="/dashboard">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                    <span className="menu-title">Dashboards</span>
                                </a>
                            </div>

                            <div className="menu-item pt-5">
                                <div className="menu-content">
                                    <span className="menu-heading fw-bold text-uppercase fs-7">Pages</span>
                                </div>
                            </div>
                            {/* Category */}

                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
												<span className="menu-icon">
													<i className="ki-duotone ki-address-book fs-2">
														<span className="path1"></span>
														<span className="path2"></span>
														<span className="path3"></span>
													</i>
												</span>
												<span className="menu-title">Category Management</span>
												<span className="menu-arrow"></span>
											</span>
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/category">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">View List Category</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/add-category">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Add Category</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/*  End category  */}
                            {/* Group */}
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
												<span className="menu-icon">
													<i className="ki-duotone ki-address-book fs-2">
														<span className="path1"></span>
														<span className="path2"></span>
														<span className="path3"></span>
													</i>
												</span>
												<span className="menu-title">Group Management</span>
												<span className="menu-arrow"></span>
											</span>
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/group">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">View List Group</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/add-group">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Add Group</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* End Group */}

                            {/* Film */}
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-duotone ki-address-book fs-2">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                        </i>
                                    </span>
                                    <span className="menu-title">Film Management</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/film">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">View List Film</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/add-film">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Add Film</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* End Film */}

                            {/* Theater */}
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-duotone ki-address-book fs-2">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                        </i>
                                    </span>
                                    <span className="menu-title">Theater Management</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/theater">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">View List Theater</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/add-theater">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Add Theater</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* End Theater */}

                            {/* Room */}
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-duotone ki-address-book fs-2">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                        </i>
                                    </span>
                                    <span className="menu-title">Room Management</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/room">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">View List Room</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/add-room">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Add Room</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* End Room */}

                            {/* Ticket */}
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-duotone ki-address-book fs-2">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                        </i>
                                    </span>
                                    <span className="menu-title">Ticket Management</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/ticket">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">View List Ticket</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/add-ticket">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Add Ticket</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* End ticket */}

                            {/* Scheduler */}
                            <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                <span className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-duotone ki-address-book fs-2">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                        </i>
                                    </span>
                                    <span className="menu-title">Scheduler Management</span>
                                    <span className="menu-arrow"></span>
                                </span>
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/scheduler">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">View List Scheduler</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link"
                                           href="/add-scheduler">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Add Scheduler</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* End scheduler */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
