import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import Pagination from "../../Pagination";

const Seat = ({ seat, onSeatSelect, selectedSeats, className, style }) => {
    const navigate = useNavigate();

    const isSeatSelected = selectedSeats.find(selectedSeat => selectedSeat.id === seat.id);

    let seatClass = 'bg-white';
    if (seat.status === "BOOKED") {
        seatClass = '!bg-gray-400 cursor-not-allowed';
    } else if (isSeatSelected) {
        seatClass = '!bg-green-500';
    }

    return (
        <button className={`w-10 h-10 ${seatClass} ${className}`} style={style}>
            {seat.roomSeat.name}
        </button>
    );
};

const ViewListRoomSeat = () => {
    const { id } = useParams();
    const [seats, setSeats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [total, setTotal] = useState(0);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };

    useEffect(() => {
        axios
            .get(`https://cinema.dummywebsite.me/RoomSeat/View-RoomSeat-By-Room/${id}`)
            .then((res) => {
                const listSeat = res.data?.data;
                // Sort seats by name
                listSeat.sort((a, b) => {
                    const aNameParts = a.roomSeat.name.split('');
                    const bNameParts = b.roomSeat.name.split('');
                    if (aNameParts[0] !== bNameParts[0]) {
                        return aNameParts[0].localeCompare(bNameParts[0]);
                    }
                    return parseInt(aNameParts.slice(1).join('')) - parseInt(bNameParts.slice(1).join(''));
                });
                // Map ticket type to seat
                const updatedSeats = listSeat.map(seat => {
                    if (seat.ticket) {
                        return {
                            ...seat,
                            price: seat.ticket.price
                        };
                    }
                    return seat;
                });
                setSeats(updatedSeats);
            })
    }, []);

    // Group seats by first letter of name
    const seatGroups = seats.reduce((groups, seat) => {
        const groupName = seat.roomSeat.name.charAt(0);
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(seat);
        return groups;
    }, {});

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">

        </div>
    );
};

export default ViewListRoomSeat;
