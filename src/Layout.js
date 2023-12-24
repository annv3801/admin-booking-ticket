import React from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

const Layout = (props) => {
    return (
        <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
            <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                <Header></Header>
                <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                    <Sidebar></Sidebar>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout