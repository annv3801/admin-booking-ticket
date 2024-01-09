import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Seat = ({ seat }) => {

    return (
        <button
            style={{
                width: '40px',
                height: '40px',
                backgroundColor: seat.color || 'pink', // Default color is pink
                border: '1px solid black',
            }}
        >
            {seat.name}
        </button>
    );
};

const Ticket = ({ ticket, onTicketClick }) => {
    const handleClick = () => {
        onTicketClick(ticket);
    };

    return (
        <div
            onClick={handleClick}
            style={{
                backgroundColor: ticket.color || 'gray', // Default color if not specified
                padding: '5px',
                margin: '5px',
                display: 'inline-block',
                cursor: 'pointer',
            }}
        >
            {ticket.title}
        </div>
    );
};

const ViewDetailRoomSeat = () => {
    const { id } = useParams();
    const [seats, setSeats] = useState([]);
    const [firstSeatClick, setFirstSeatClick] = useState(true);
    const [tickets, setTickets] = useState([]);

    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };

    useEffect(() => {
        // Fetch list of tickets
        axios.post(`https://cinema.dummywebsite.me/Ticket/View-List-Tickets`, {
            pageSize: 100,
            currentPage: 1,
        })
            .then((res) => {
                setTickets(res.data?.data?.data);
            });
    }, []);

    useEffect(() => {
        axios.get(`https://cinema.dummywebsite.me/RoomSeat/View-RoomSeat-By-Room/${id}`)
            .then((res) => {
                const listSeat = res.data?.data;
                listSeat.sort((a, b) => {
                    const aNameParts = a.name.split('');
                    const bNameParts = b.name.split('');
                    if (aNameParts[0] !== bNameParts[0]) {
                        return aNameParts[0].localeCompare(bNameParts[0]);
                    }
                    return parseInt(aNameParts.slice(1).join('')) - parseInt(bNameParts.slice(1).join(''));
                });
                const updatedSeats = listSeat.map((seat) => {
                    if (seat.ticket) {
                        const ticket = tickets.find((t) => t.id === seat.ticket.id);
                        return {
                            ...seat,
                            color: ticket ? ticket.color : 'green',
                        };
                    }
                    return seat;
                });

                setSeats(updatedSeats);
            });
    }, [id]);

    const seatGroups = seats.reduce((groups, seat) => {
        const groupName = seat.name.charAt(0);
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(seat);
        return groups;
    }, {});

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card mb-5 mb-xl-8">
                {/*begin::Header*/}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">View List Room Seat</span>
                    </h3>
                    {seats.length > 0 ? <div></div> : <div className="card-toolbar">
                        <a href={`/add-room-seat?roomseatId=${id}`} className="btn btn-sm btn-light btn-active-primary">
                            <i className="ki-duotone ki-plus fs-2"></i>New Room Seat</a>
                    </div>}

                </div>
                {/*end::Header*/}
                <div className="card-body py-3 mb-8">
                    {Object.entries(seatGroups).map(([groupName, groupSeats]) => (
                        <div key={groupName} className="d-flex" style={{ marginTop: '5px' }}>
                            <div className="text-xl font-semibold mt-5 mr-4" style={{ marginTop: '10px' }}>
                                {groupName}
                            </div>
                            <div className="d-flex gap-2 mx-auto text-black">
                                {groupSeats.map((seat) => (
                                    <Seat
                                        key={seat.id}
                                        seat={seat}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewDetailRoomSeat;
