import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import Pagination from "../../Pagination";

const ViewListGroup = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const pageSize = 10;
    const [total, setTotal] = useState(0);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const fetchMovies = async () => {
        try {
            const response = await axios.post(`https://cinema.dummywebsite.tech/Group/View-List-Groups-Not-Have-Type`, {
                pageSize,
                currentPage,
                searchByFields: [
                    {
                        searchFieldName: "title",
                        searchValue: searchValue // add the search value here
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
    }, [currentPage, searchValue]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleDelete = (id) => {
        axios.delete("https://cinema.dummywebsite.tech/Group/delete-Group/" + id, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
    }

    const handleSearch = (e) => {
        // Update the searchValue state when the input value changes
        setSearchValue(e.target.value);
    };
    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                <h1 className="page-heading d-flex text-dark fw-bold flex-column justify-content-center mb-5">View
                    List Group Management</h1>
            </div>
            <div className="card mb-5 mb-xl-8">
                {/*begin::Header*/}
                <div className="card-header border-0 pt-5">
                    <form className="position-relative" autoComplete="off">
                        <i className="ki-duotone ki-magnifier fs-3 text-gray-500 position-absolute ms-5 translate-middle-y"
                           style={{top: '43%'}}><span
                            className="path1"></span><span className="path2"></span></i>

                        <input
                            type="text"
                            className="form-control form-control-solid px-13"
                            name="search"
                            value={searchValue} // bind the value to the searchValue state
                            onChange={handleSearch} // handle input changes
                            placeholder="Search by name..."
                        />
                    </form>
                    <div className="card-toolbar">
                        <a href="/add-Group" className="btn btn-sm btn-light btn-active-primary">
                            <i className="ki-duotone ki-plus fs-2"></i>New Group</a>
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
                                <th className="min-w-700px">Title</th>
                                <th className="min-w-125px">Type</th>
                                <th className="min-w-125px">Index</th>
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
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.id}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.title}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.type}</a>
                                    </td>
                                    <td>
                                        <a href="#"
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{movie.index}</a>
                                    </td>
                                    <td>
                                        <span className="badge badge-light-success">{movie.status}</span>
                                    </td>
                                    <td className="text-end">
                                        <NavLink to={`/Group/${movie.id}`}
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

export default ViewListGroup;
