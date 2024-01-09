import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Seat = ({ seat, onSeatClick, selectedTicketColor }) => {
    const handleClick = () => {
        onSeatClick(seat);
    };

    return (
        <button
            onClick={handleClick}
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

const ViewDetailSeat = () => {
    const { id } = useParams();
    const [seats, setSeats] = useState([]);
    const [schedulers, setSchedulers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [selectedScheduler, setSelectedScheduler] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectedTicketColor, setSelectedTicketColor] = useState(null);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [firstSeatClick, setFirstSeatClick] = useState(true);

    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };

    const createSeat = async (seatData) => {
        try {
            const response = await axios.post('https://cinema.dummywebsite.me/Seat/Create-Seat', seatData, config);
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error('Error creating seat:', error);
        }
    };

    useEffect(() => {
        // Fetch list of schedulers
        axios.get(`https://cinema.dummywebsite.me/Scheduler/View-Scheduler/${id}`, {
            pageSize: 100,
            currentPage: 1,
        })
            .then((res) => {
                setSchedulers(res.data?.data);
            });

        // Fetch list of tickets
        axios.post(`https://cinema.dummywebsite.me/Ticket/View-List-Tickets`, {
            pageSize: 100,
            currentPage: 1,
        })
            .then((res) => {
                setTickets(res.data?.data?.data);
            });
    }, []);
    console.log("schedulers",schedulers)
    useEffect(() => {
        if (schedulers && schedulers.roomId) {
            axios.get(`https://cinema.dummywebsite.me/RoomSeat/View-RoomSeat-By-Room/${schedulers.roomId}`)
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
        }
    }, [schedulers, tickets, id]);

    const seatGroups = seats.reduce((groups, seat) => {
        const groupName = seat.name.charAt(0);
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(seat);
        return groups;
    }, {});
    const handleSeatClick = (seat) => {
        if (selectedTicket) {
            if (firstSeatClick) {
                // Add all seats to selectedPairs with type 0 and the corresponding ticket ID on the first seat click
                const seatsToAdd = seats.map((s) => ({
                    schedulerId: schedulers.id,
                    ticketId: selectedTicket.id,
                    roomSeatId: s.id,
                    type: 0,
                }));

                setSelectedPairs(seatsToAdd);
                setFirstSeatClick(false);
            } else {
                // Update the selected seat in selectedPairs with type 1 and the corresponding ticket ID
                setSelectedPairs((prevPairs) => {
                    const updatedPairs = prevPairs.map((pair) =>
                        pair.roomSeatId === seat.id ? { ...pair, type: 1, ticketId: selectedTicket.id } : pair
                    );
                    return updatedPairs;
                });
            }

            const updatedSeats = seats.map((s) => {
                if (s.id === seat.id) {
                    return {
                        ...s,
                        color: selectedTicketColor || 'pink',
                    };
                }
                return s;
            });

            setSeats(updatedSeats);
        }
    };

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket);
        setSelectedTicketColor(ticket.color || null);
    };

    const createSeats = async () => {
        try {
            const seatRequests = selectedPairs.map(pair => ({
                schedulerId: schedulers.id, // Replace with the actual schedulerId
                roomSeatId: pair.roomSeatId,
                ticketId: pair.ticketId,
                type: pair.type,
            }));

            const requestData = {
                createSeatRequests: seatRequests
            };

            await createSeat(requestData);
        } catch (error) {
            console.error('Error creating seats:', error);
        }
    };

    console.log("selectedScheduler",selectedPairs)

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card mb-5 mb-xl-8">
                <div className="card-header border-0 pt-5">
                    <div className="d-flex align-items-center">
                        <label className="form-label fw-bold">Select Scheduler: </label>
                        <select
                            className="form-select form-select-solid"
                            onChange={(e) => setSelectedScheduler(schedulers.id)}
                        >
                                <option key={schedulers.id} value={schedulers.id}>
                                    {schedulers?.room?.name} - {schedulers?.room?.theater?.name} - {schedulers?.film?.name} - {schedulers?.startTime}
                                </option>
                        </select>
                    </div>
                </div>

                <div style={{ margin: '10px 0' }}>
                    {tickets.map((ticket) => (
                        <Ticket key={ticket.id} ticket={ticket} onTicketClick={handleTicketClick} />
                    ))}
                </div>

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
                                        onSeatClick={handleSeatClick}
                                        selectedTicketColor={selectedTicketColor}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={createSeats}>Create Seats</button>
            </div>
        </div>
    );
};

export default ViewDetailSeat;
