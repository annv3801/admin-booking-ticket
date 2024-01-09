import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

const ViewDetailTheater = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedLocation, setUpdatedLocation] = useState('');
    const [updatedLongitude, setUpdatedLongitude] = useState(0);
    const [updatedLatitude, setUpdatedLatitude] = useState(0);
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
    const [updatedTotalRating, setUpdatedTotalRating] = useState(0);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const navigate = useNavigate();
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`https://cinema.dummywebsite.me/theater/View-theater/${id}`);
            setMovies(response.data);
            setUpdatedName(response.data?.data?.name || '');
            setUpdatedTotalRating(response.data?.data?.totalRating || 0);
            setUpdatedLocation(response.data?.data?.location || '');
            setUpdatedPhoneNumber(response.data?.data?.phoneNumber || '');
            setUpdatedLongitude(response.data?.data?.longitude || 0);
            setUpdatedLatitude(response.data?.data?.latitude || 0);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            // Make an API call to update the category name
            await axios.put(`https://cinema.dummywebsite.me/theater/Update-Theater`, {
                id: id,
                name: updatedName,
                totalRating: updatedTotalRating,
                location: updatedLocation,
                longitude: parseFloat(updatedLongitude),
                latitude: parseFloat(updatedLatitude),
                phoneNumber: updatedPhoneNumber
            }, config);
            // Optionally, you can refetch the data to update the UI with the latest changes
            await fetchMovies()
            .then(() => {
                navigate('/theater');
            });
        } catch (error) {
            console.error('Error updating theater name:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);


    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card mb-5 mb-xl-8">
                {/*begin::Header*/}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">View Detail Theater</span>
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
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Location</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="name"
                            placeholder="Input location"
                            value={updatedLocation}
                            onChange={(e) => setUpdatedLocation(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Longitude</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="longitude"
                            placeholder="Input longitude"
                            value={updatedLongitude}
                            onChange={(e) => setUpdatedLongitude(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Latitude</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="latitude"
                            placeholder="Input latitude"
                            value={updatedLatitude}
                            onChange={(e) => setUpdatedLatitude(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Phone Number</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="phoneNumber"
                            placeholder="Input phone number"
                            value={updatedPhoneNumber}
                            onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                        />
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

export default ViewDetailTheater;
