import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import Pagination from "../../Pagination";

const ViewListScheduler = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [total, setTotal] = useState(0);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const fetchMovies = async () => {
        try {
            const response = await axios.post(`https://cinema.dummywebsite.me/scheduler/View-List-Schedulers`, {
                pageSize,
                currentPage,
                sortByFields: [
                    {
                        colName: "createdTime",
                        sortDirection: "DESC"
                    }
                ]
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
        axios.delete("https://cinema.dummywebsite.me/scheduler/delete-scheduler/" + id, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
    }

    console.log(movies)
    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                <h1 className="page-heading d-flex text-dark fw-bold flex-column justify-content-center mb-5">View
                    List Schedulers Management</h1>
            </div>
            <div className="card mb-5 mb-xl-8">
                {/*begin::Header*/}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                    </h3>
                    <div className="card-toolbar">
                        <a href="/add-scheduler" className="btn btn-sm btn-light btn-active-primary">
                            <i className="ki-duotone ki-plus fs-2"></i>New Scheduler</a>
                    </div>
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
                                <th className="min-w-125px ps-4 rounded-start">Id</th>
                                <th className="min-w-125px">Room Name</th>
                                <th className="min-w-125px">Theater Name</th>
                                <th className="min-w-125px">Film Name</th>
                                <th className="min-w-125px">Start Time</th>
                                <th className="min-w-125px">End Time</th>
                                <th className="min-w-50px">Status</th>
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
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.id}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.room.name}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.theater.name}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.film.name}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{new Date(new Date(movie.startTime).getTime() - 7 * 60 * 60 * 1000).toLocaleDateString('en-GB')} - {new Date(new Date(movie.startTime).getTime() - 7 * 60 * 60 * 1000).toLocaleTimeString('en-GB', {hour12: false})}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{new Date(new Date(movie.endTime).getTime() - 7 * 60 * 60 * 1000).toLocaleDateString('en-GB')} - {new Date(new Date(movie.endTime).getTime() - 7 * 60 * 60 * 1000).toLocaleTimeString('en-GB', {hour12: false})}</a>
                                    </td>
                                    <td>
                                        <span className="badge badge-light-success">{movie.status}</span>
                                    </td>
                                    <td className="text-end">
                                        {movie.countSeat == 0 ? (
                                            <NavLink to={`/seat/${movie.id}`}
                                                     className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2">View
                                                List Seat</NavLink>
                                        ) : (
                                            <NavLink to={`/seat-added/${movie.id}`}
                                                     className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2">View
                                                List Seat</NavLink>
                                        )}
                                        <NavLink to={`/scheduler/${movie.id}`}
                                                 className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2">View</NavLink>
                                        <a onClick={() => handleDelete(movie.id)}
                                           className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4">Delete</a>
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

export default ViewListScheduler;
