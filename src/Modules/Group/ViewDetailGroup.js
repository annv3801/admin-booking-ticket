import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

const ViewDetailGroup = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedType, setUpdatedType] = useState('');
    const [updatedIndex, setUpdatedIndex] = useState('');
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const navigate = useNavigate();
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`https://cinema.dummywebsite.tech/Group/View-Group/${id}`);
            setMovies(response.data);
            setUpdatedName(response.data.data?.title || '');
            setUpdatedType(response.data.data?.type || '');
            setUpdatedIndex(response.data.data?.index || '');
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            // Make an API call to update the Group name
            await axios.put(`https://cinema.dummywebsite.tech/Group/Update-Group`, {
                title: updatedName,
                id: id,
                index: updatedIndex,
                type: updatedType
            }, config);
            // Optionally, you can refetch the data to update the UI with the latest changes
            await fetchMovies()
            .then(() => {
                navigate('/group');
            });
        } catch (error) {
            console.error('Error updating Group name:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    console.log("movies",movies)

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card mb-5 mb-xl-8">
                {/*begin::Header*/}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">View Detail Category</span>
                    </h3>
                </div>
                {/*end::Header*/}
                {/*begin::Body*/}
                <div className="card-body py-3">
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Title</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="name"
                            placeholder="Input group name"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="required fs-6 fw-semibold mb-2">Type</label>
                        <select
                            className="form-select form-select-solid"
                            data-control="select2"
                            data-hide-search="true"
                            data-placeholder="Select..."
                            name="settings_customer"
                            value={updatedType}
                            onChange={(e) => setUpdatedType(e.target.value)}
                        >
                            <option value="FILM">Film</option>
                            <option value="FOOD">Food</option>
                        </select>
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Index</span>
                        </label>
                        <input
                            type="number"
                            className="form-control form-control-lg form-control-solid"
                            name="index"
                            placeholder="Input group index"
                            value={updatedIndex}
                            onChange={(e) => setUpdatedIndex(e.target.value)}
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

export default ViewDetailGroup;
