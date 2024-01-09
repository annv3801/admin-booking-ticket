import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
    const [updatedName, setUpdatedName] = useState('');
    const [theaterOptions, setTheaterOptions] = useState([]);
    const [updatedTheater, setUpdatedTheater] = useState(0);
    const navigate = useNavigate();
    const config = {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };

    const handleCreate = async () => {
        try {
            // Make an API call to update the category name
            await axios
                .post(
                    'https://cinema.dummywebsite.me/Room/Create-Room',
                    {
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

    const fetchGroups = async () => {
        try {
            const response = await axios.post('https://cinema.dummywebsite.me/theater/View-List-Theaters', {}, config);
            // Assuming the API response contains an array of categories
            const theaters = response?.data?.data?.data;
            setTheaterOptions(theaters);

            // Set the updatedTheater with the ID of the first theater if available
            if (theaters.length > 0) {
                setUpdatedTheater(theaters[0].id);
            }
        } catch (error) {
            console.error('Error fetching theaters:', error);
        }
    };

    useEffect(() => {
        fetchGroups(); // Fetch theaters when the component mounts
    }, []);

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card mb-5 mb-xl-8">
                {/* begin::Header */}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">Add Room</span>
                    </h3>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
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
                    <div className="d-flex flex-stack mb-8">
                        <div></div>
                        <button
                            type="button"
                            className="btn btn-lg btn-primary"
                            data-kt-element="settings-next"
                            onClick={handleCreate}
                        >
                            <span className="indicator-label">Create</span>
                        </button>
                    </div>
                    {/* end::Table container */}
                </div>
            </div>
        </div>
    );
};

export default AddRoom;
