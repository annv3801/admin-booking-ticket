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
                            <div data-kt-menu-trigger="click" className="menu-item here show menu-accordion">
                                <span className="menu-link">
												<span className="menu-icon">
													<i className="ki-duotone ki-element-11 fs-2">
														<span className="path1"></span>
														<span className="path2"></span>
														<span className="path3"></span>
														<span className="path4"></span>
													</i>
												</span>
												<span className="menu-title">Dashboards</span>
												<span className="menu-arrow"></span>
											</span>
                                <div className="menu-sub menu-sub-accordion">
                                    <div className="menu-item">
                                        <a className="menu-link active" href="../../demo1/dist/index.html">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Default</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link" href="../../demo1/dist/dashboards/ecommerce.html">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">eCommerce</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link" href="../../demo1/dist/dashboards/projects.html">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Projects</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link" href="../../demo1/dist/dashboards/online-courses.html">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Online Courses</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link" href="../../demo1/dist/dashboards/marketing.html">
														<span className="menu-bullet">
															<span className="bullet bullet-dot"></span>
														</span>
                                            <span className="menu-title">Marketing</span>
                                        </a>
                                    </div>
                                    <div className="menu-inner flex-column collapse"
                                         id="kt_app_sidebar_menu_dashboards_collapse">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo1/dist/dashboards/bidding.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Bidding</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo1/dist/dashboards/pos.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">POS System</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link"
                                               href="../../demo1/dist/dashboards/call-center.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Call Center</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo1/dist/dashboards/logistics.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Logistics</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link"
                                               href="../../demo1/dist/dashboards/website-analytics.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Website Analytics</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link"
                                               href="../../demo1/dist/dashboards/finance-performance.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Finance Performance</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link"
                                               href="../../demo1/dist/dashboards/store-analytics.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Store Analytics</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo1/dist/dashboards/social.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Social</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo1/dist/dashboards/delivery.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Delivery</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo1/dist/dashboards/crypto.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Crypto</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo1/dist/dashboards/school.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">School</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo1/dist/dashboards/podcast.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Podcast</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo1/dist/landing.html">
															<span className="menu-bullet">
																<span className="bullet bullet-dot"></span>
															</span>
                                                <span className="menu-title">Landing</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="menu-item">
                                        <div className="menu-content">
                                            <a className="btn btn-flex btn-color-primary d-flex flex-stack fs-base p-0 ms-2 mb-2 toggle collapsible collapsed"
                                               data-bs-toggle="collapse" href="#kt_app_sidebar_menu_dashboards_collapse"
                                               data-kt-toggle-text="Show Less">
                                                <span data-kt-toggle-text-target="true">Show 12 More</span>
                                                <i className="ki-duotone ki-minus-square toggle-on fs-2 me-0">
                                                    <span className="path1"></span>
                                                    <span className="path2"></span>
                                                </i>
                                                <i className="ki-duotone ki-plus-square toggle-off fs-2 me-0">
                                                    <span className="path1"></span>
                                                    <span className="path2"></span>
                                                    <span className="path3"></span>
                                                </i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
