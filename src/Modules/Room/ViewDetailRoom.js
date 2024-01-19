import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

const ViewDetailRoom = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedTheater, setUpdatedTheater] = useState('');
    const [theaterOptions, setTheaterOptions] = useState([]);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const navigate = useNavigate();
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`https://cinema.dummywebsite.me/room/View-Room/${id}`);
            setMovies(response.data);
            setUpdatedName(response.data.data?.name || '');
            setUpdatedTheater(response.data.data?.theaterId || '');
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            // Make an API call to update the category name
            await axios
                .put(
                    'https://cinema.dummywebsite.me/Room/Update-Room',
                    {
                        id: id,
                        name: updatedName,
                        theaterId: updatedTheater,
                    },
                    config
                )
                .then(() => {
                    navigate('/room');
                });
        } catch (error) {
            console.error('Error creating room name:', error);
        }
    };

    useEffect(() => {
        fetchMovies(); // Fetch movies when the component mounts
        fetchGroups(); // Fetch theaters when the component mounts
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axios.post('https://cinema.dummywebsite.me/theater/View-List-Theaters', {}, config);
            const theaters = response?.data?.data?.data;
            setTheaterOptions(theaters);

            // Log to check values
            console.log('theaterOptions:', theaters);
            console.log('updatedTheaterFromApi:', updatedTheater);
        } catch (error) {
            console.error('Error fetching theaters:', error);
        }
    };

    console.log("movies",movies)

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card mb-5 mb-xl-8">
                {/*begin::Header*/}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">View Detail Room</span>
                    </h3>
                </div>
                {/*end::Header*/}
                {/*begin::Body*/}
                <div className="card-body py-3">
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Name</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="name"
                            placeholder="Input category name"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="required fs-6 fw-semibold mb-2">Theater</label>
                        <select
                            className="form-select form-select-solid"
                            name="settings_customer"
                            value={updatedTheater}
                            onChange={(e) => setUpdatedTheater(e.target.value)}
                        >
                            {theaterOptions.map((theater) => (
                                <option key={theater.id} value={theater.id}>
                                    {theater.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*<div className="fv-row mb-8">*/}
                    {/*    <label className="required fs-6 fw-semibold mb-2">Status</label>*/}
                    {/*    <select className="form-select form-select-solid" data-control="select2"*/}
                    {/*            data-placeholder="Select an status" name="status">*/}
                    {/*        <option></option>*/}
                    {/*        <option value="1" selected="selected">Active</option>*/}
                    {/*        <option value="2">In-Active</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <div className="d-flex flex-stack mb-8">
                        <div></div>
                        <button
                            type="button"
                            className="btn btn-lg btn-primary"
                            data-kt-element="settings-next"
                            onClick={handleUpdate}
                        >
                            <span className="indicator-label">Update</span>
                        </button>
                    </div>
                    {/*end::Table container*/}
                </div>
            </div>
        </div>
    );
};

export default ViewDetailRoom;
