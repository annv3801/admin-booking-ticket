import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const AddRoomSeat = () => {
    const [room, setRoom] = useState([]);
    const [updatedTheater, setUpdatedTheater] = useState(0);
    const [numRows1, setNumRows1] = useState(0);
    const [numSeatsPerRow1, setNumSeatsPerRow1] = useState(0);
    const navigate = useNavigate();
    const config = {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };

    var urlParams = new URLSearchParams(window.location.search);
    var roomseatId = urlParams.get('roomseatId');

    const fetchRoom = async () => {
        try {
            const response = await axios.get(`https://cinema.dummywebsite.me/Room/View-Room/${roomseatId}`);
            setRoom(response.data.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    useEffect(() => {
        fetchRoom();
    }, []);

    const handleCreate = async (e) => {
        try {
            const seats = [];
            const numRowsInt1 = parseInt(numRows1);
            const numSeatsPerRowInt1 = parseInt(numSeatsPerRow1);
            for (let i = 0; i < numRowsInt1; i++) {
                const rowName = String.fromCharCode(65 + i);
                for (let j = 1; j <= numSeatsPerRowInt1; j++) {
                    const seatName = `${rowName}${j}`;
                    seats.push({ name: seatName });
                }
            }

            const requestData = {
                roomSeat: seats.map(seat => ({
                    name: seat.name,
                    roomId: roomseatId
                }))
            };
            console.log(requestData)
            await axios.post(
                'https://cinema.dummywebsite.me/RoomSeat/Create-RoomSeat',
                requestData,
                config
            );

            navigate('/room');
        } catch (error) {
            console.error('Error creating room name:', error);
        }
    };

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card mb-5 mb-xl-8">
                {/* begin::Header */}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">Add Room Seats</span>
                    </h3>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className="card-body py-3">
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Row</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="name"
                            placeholder="Input row"
                            value={numRows1} onChange={(event) => setNumRows1(event.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Number of Row</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="name"
                            placeholder="Input number of row"
                            value={numSeatsPerRow1} onChange={(event) => setNumSeatsPerRow1(event.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="required fs-6 fw-semibold mb-2">Room</label>
                        <select
                            className="form-select form-select-solid"
                            name="settings_customer"
                            value={updatedTheater}
                            onChange={(e) => setUpdatedTheater(e.target.value)}
                            disabled={true}
                        >
                            <option key={room.id} value={room.id}>
                                {room.name} - {room?.theater?.name}
                            </option>
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

export default AddRoomSeat;
