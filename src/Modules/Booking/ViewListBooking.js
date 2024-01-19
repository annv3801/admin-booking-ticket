import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../../Pagination";

const ViewListBooking = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [total, setTotal] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const fetchMovies = async () => {
        try {
            const response = await axios.post(`https://cinema.dummywebsite.tech/Booking/View-List-Bookings`, {
                pageSize,
                currentPage,
                accountId: 0,
                tab: "",
                searchByFields: [
                    {
                        searchFieldName: "id",
                        searchValue: searchValue // add the search value here
                    }
                ],
                sortByFields: [
                    {
                        colName: "createdTime",
                        sortDirection: "DESC"
                    }
                ],
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
        axios.delete("https://cinema.dummywebsite.tech/Booking/Cancel-Booking/" + id, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
    }

    const handleReceived = (id) => {
        axios.put("https://cinema.dummywebsite.tech/Booking/Change-Status-Booking/" + id, config)
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
                    List Bookings Management</h1>
            </div>
            <div className="card mb-5 mb-xl-8">
                {/*begin::Header*/}
                <div className="card-header border-0 pt-5 d-flex justify-content-between">
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
                            placeholder="Search by id..."
                        />
                    </form>
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
                                           className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{new Date(new Date(movie.seats[0].scheduler.startTime).getTime() - 7 * 60 * 60 * 1000).toLocaleDateString('en-GB')} - {new Date(new Date(movie.seats[0].scheduler.startTime).getTime() - 7 * 60 * 60 * 1000).toLocaleTimeString('en-GB', {hour12: false})} - {new Date(new Date(movie.seats[0].scheduler.endTime).getTime() - 7 * 60 * 60 * 1000).toLocaleDateString('en-GB')} - {new Date(new Date(movie.seats[0].scheduler.endTime).getTime() - 7 * 60 * 60 * 1000).toLocaleTimeString('en-GB', {hour12: false})}</a>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${movie.status == "RECEIVED" ? "badge-success" : movie.status == "CANCELED" ? "badge-danger" : "badge-warning"}`}>{movie.status}</span>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${movie.isReceived == 1 ? "badge-success" : "badge-danger"} `}>{movie.isReceived == 1 ? "Received" : "Not Received"}</span>
                                    </td>
                                    <td className="text-end">
                                        <a onClick={() => handleDelete(movie.id)}
                                           className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4">Cancel</a>
                                        <a onClick={() => handleReceived(movie.id)}
                                           className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 mx-2">Received</a>
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
