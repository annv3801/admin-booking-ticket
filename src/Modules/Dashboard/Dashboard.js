import React, {useEffect, useState} from 'react';
import axios from "axios";

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const fetchGroups = async () => {
        try {
            const response = await axios.get('https://cinema.dummywebsite.tech/Dashboard/Dashboard', {});
            const theaters = response?.data?.data;
            setMovies(theaters);

        } catch (error) {
            console.error('Error fetching theaters:', error);
        }
    };

    useEffect(() => {
        fetchGroups(); // Fetch theaters when the component mounts
    }, []);

    const CurrencyFormatter = ({ value }) => {
        // Formatting the number in Vietnamese style
        const formattedNumber = new Intl.NumberFormat('vi-VN').format(value);

        // Appending 'VND' at the end
        const formattedCurrency = `${formattedNumber} VNĐ`;

        return <div>{formattedCurrency}</div>;
    };

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card-header border-0 pt-5">
                <h1 className="card-title align-items-start flex-column my-5">
                    <span className="card-label fw-bold mb-1">Dashboard</span>
                </h1>
            </div>
            <div className="row g-5 gx-xl-10 mb-5 mb-xl-10">
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
                    <div className="card card-flush mb-xl-10">
                        <div className="card-header py-5">
                            <div className="card-title d-flex flex-column">
                                <span className="text-gray-500 pt-1 fw-semibold fs-6 mb-3">Tổng số phim hiện tại</span>
                                <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">{movies.countFilm}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
                    <div className="card card-flush mb-xl-10">
                        <div className="card-header py-5">
                            <div className="card-title d-flex flex-column">
                                <span className="text-gray-500 pt-1 fw-semibold fs-6 mb-3">Tổng số khách hàng</span>
                                <span
                                    className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">{movies.countCustomer}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
                    <div className="card card-flush mb-xl-10">
                        <div className="card-header py-5">
                            <div className="card-title d-flex flex-column">
                                <span className="text-gray-500 pt-1 fw-semibold fs-6 mb-3">Tổng số ghế đã bán</span>
                                <span
                                    className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2"> {movies.countSeatSell}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
                    <div className="card card-flush mb-xl-10">
                        <div className="card-header py-5">
                            <div className="card-title d-flex flex-column">
                                <span className="text-gray-500 pt-1 fw-semibold fs-6 mb-3">Tổng tiền</span>
                                <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2"><CurrencyFormatter
                                    value={movies.totalPrice}/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
