import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import Pagination from "../../Pagination";

const ViewListTicket = () => {
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
            const response = await axios.post(`https://cinema.dummywebsite.me/Ticket/View-List-Tickets`, {
                pageSize,
                currentPage,
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
        axios.delete("https://cinema.dummywebsite.me/ticket/delete-ticket/" + id, config)
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
                        <span className="card-label fw-bold fs-3 mb-1">View List Ticket Management</span>
                    </h3>
                    <div className="card-toolbar">
                        <a href="/add-ticket" className="btn btn-sm btn-light btn-active-primary">
                            <i className="ki-duotone ki-plus fs-2"></i>New Ticket</a>
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
                                <th className="min-w-500px">Name</th>
                                <th className="min-w-125px">Type</th>
                                <th className="min-w-125px">Price</th>
                                <th className="min-w-125px">Color</th>
                                <th className="min-w-125px">Status</th>
                                <th className="min-w-200px text-end rounded-end"></th>
                            </tr>
                            </thead>
                            {/*end::Table head*/}
                            {/*begin::Table body*/}
                            <tbody>
                            {movies?.data?.data.map((movie) => (
                                <tr>
                                    <td>
                                        <a href="#" className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.id}</a>
                                    </td>
                                    <td>
                                        <a href="#" className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.title}</a>
                                    </td>
                                    <td>
                                        <a href="#" className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.type}</a>
                                    </td>
                                    <td>
                                        <a href="#" className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.price}</a>
                                    </td>
                                    <td>
                                        <a href="#" className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.color}</a>
                                    </td>
                                    <td>
                                        <span className="badge badge-light-success">{movie.status}</span>
                                    </td>
                                    <td className="text-end">
                                        <NavLink to={`/ticket/${movie.id}`} className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2">View</NavLink>
                                        <a onClick={() => handleDelete(movie.id)} className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4">Delete</a>
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

export default ViewListTicket;
