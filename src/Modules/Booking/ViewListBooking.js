import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import Pagination from "../../Pagination";

const ViewListBooking = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [total, setTotal] = useState(0);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const fetchMovies = async () => {
        try {
            const response = await axios.post(`https://cinema.dummywebsite.me/Booking/View-List-Bookings`, {
                pageSize,
                currentPage,
                accountId: 0,
                tab: ""
            });

            setMovies(response.data);
            setTotal(response.data.data.total);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleDelete = (id) => {
        axios.delete("https://cinema.dummywebsite.me/Booking/Cancel-Booking/" + id, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
    }

    const handleReceived = (id) => {
        axios.put("https://cinema.dummywebsite.me/Booking/Change-Status-Booking/" + id, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
    }
    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card mb-5 mb-xl-8">
                {/*begin::Header*/}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">View List Booking Management</span>
                    </h3>
                    {/*<div className="card-toolbar">
                        <a href="/add-category" className="btn btn-sm btn-light btn-active-primary">
                            <i className="ki-duotone ki-plus fs-2"></i>New Category</a>
                    </div>*/}
                </div>
                {/*end::Header*/}
                {/*begin::Body*/}
                <div className="card-body py-3">
                    {/*begin::Table container*/}
                    <div className="table-responsive">
                        {/*begin::Table*/}
                        <table className="table align-middle gs-0 gy-4">
                            {/*begin::Table head*/}
                            <thead>
                            <tr className="fw-bold text-muted bg-light">
                                <th className="min-w-200px">Name</th>
                                <th className="min-w-200px">Film</th>
                                <th className="min-w-200px">Scheduler - Room</th>
                                <th className="min-w-200px">Time</th>
                                <th className="min-w-125px">Status</th>
                                <th className="min-w-125px">IsReceived</th>
                                <th className="min-w-200px text-end rounded-end"></th>
                            </tr>
                            </thead>
                            {/*end::Table head*/}
                            {/*begin::Table body*/}
                            <tbody>
                            {movies?.data?.data.map((movie) => (
                                <tr>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.account.fullName} - {movie.account.phoneNumber}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.seats[0].filmName}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.seats[0].theaterName} - {movie.seats[0].roomName}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{new Date(movie.seats[0].scheduler.startTime).toLocaleDateString('en-GB')} - {new Date(movie.seats[0].scheduler.startTime).toLocaleTimeString('en-GB', {hour12: false,})} -> {new Date(movie.seats[0].scheduler.endTime).toLocaleDateString('en-GB')} - {new Date(movie.seats[0].scheduler.endTime).toLocaleTimeString('en-GB', {hour12: false,})}</a>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${movie.status == "RECEIVED" ? "badge-success" : movie.status == "CANCELED" ? "badge-danger" : "badge-warning"}`}>{movie.status}</span>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${movie.isReceived == 1 ? "badge-success" : "badge-danger"} `}>{movie.isReceived == 1 ? "Đã nhận" : "Chưa nhận"}</span>
                                    </td>
                                    <td className="text-end">
                                        <a onClick={() => handleDelete(movie.id)}
                                           className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4">Cancel</a>
                                        <a onClick={() => handleReceived(movie.id)}
                                           className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4">Received</a>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                            {/*end::Table body*/}
                        </table>
                        {/*end::Table*/}
                        <Pagination
                            currentPage={currentPage}
                            pageSize={pageSize}
                            total={total}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    {/*end::Table container*/}
                </div>
            </div>
        </div>
    );
};

export default ViewListBooking;
