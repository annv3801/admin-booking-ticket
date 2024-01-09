import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddScheduler = () => {
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [theaterOptions, setTheaterOptions] = useState([]);
    const [updatedTheater, setUpdatedTheater] = useState(0);
    const [filmOptions, setFilmOptions] = useState([]);
    const [updatedFilm, setUpdatedFilm] = useState(0);
    const [roomOptions, setRoomOptions] = useState([]);
    const [updatedRoom, setUpdatedRoom] = useState(0);
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
                    'https://cinema.dummywebsite.me/scheduler/Create-scheduler',
                    {
                        theaterId: updatedTheater,
                        roomId: updatedRoom,
                        filmId: updatedFilm,
                        startTime: selectedStartDate,
                        endTime: selectedEndDate
                    },
                    config
                )
                .then(() => {
                    navigate('/scheduler');
                });
        } catch (error) {
            console.error('Error creating scheduler:', error);
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

    const fetchFilms = async () => {
        try {
            const response = await axios.post('https://cinema.dummywebsite.me/film/View-List-films', {}, config);
            // Assuming the API response contains an array of categories
            const film = response?.data?.data?.data;
            setFilmOptions(film);

            // Set the updatedTheater with the ID of the first theater if available
            if (film.length > 0) {
                setUpdatedFilm(film[0].id);
            }
        } catch (error) {
            console.error('Error fetching films:', error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await axios.post('https://cinema.dummywebsite.me/room/View-List-rooms', {}, config);
            // Assuming the API response contains an array of categories
            const room = response?.data?.data?.data;
            setRoomOptions(room);

            // Set the updatedTheater with the ID of the first theater if available
            if (room.length > 0) {
                setUpdatedRoom(room[0].id);
            }
        } catch (error) {
            console.error('Error fetching theaters:', error);
        }
    };

    useEffect(() => {
        fetchGroups(); // Fetch theaters when the component mounts
        fetchFilms(); // Fetch theaters when the component mounts
        fetchRooms(); // Fetch theaters when the component mounts
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
                    <div className="fv-row mb-8">
                        <label className="required fs-6 fw-semibold mb-2">Room</label>
                        <select
                            className="form-select form-select-solid"
                            name="settings_customer"
                            value={updatedRoom}
                            onChange={(e) => setUpdatedRoom(e.target.value)}
                        >
                            {roomOptions.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.name} - {room.theater.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="fv-row mb-8">
                        <label className="required fs-6 fw-semibold mb-2">Film</label>
                        <select
                            className="form-select form-select-solid"
                            name="settings_customer"
                            value={updatedFilm}
                            onChange={(e) => setUpdatedFilm(e.target.value)}
                        >
                            {filmOptions.map((film) => (
                                <option key={film.id} value={film.id}>
                                    {film.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="fv-row mb-8">
                        <div className="mb-2">
                            <label className="required fs-6 fw-semibold">Select Start Date</label>
                        </div>
                        <div>
                            <DatePicker
                                selected={selectedStartDate}
                                onChange={(date) => setSelectedStartDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                                className="form-control form-select form-select-solid"
                            />
                        </div>
                    </div>
                    <div className="fv-row mb-8">
                        <div className="mb-2">
                            <label className="required fs-6 fw-semibold">Select End Date</label>
                        </div>
                        <div>
                            <DatePicker
                                selected={selectedEndDate}
                                onChange={(date) => setSelectedEndDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                                className="form-control form-select form-select-solid"
                            />
                        </div>
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

export default AddScheduler;
