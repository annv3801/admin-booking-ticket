import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import ViewDetailCategory from "./Modules/Category/ViewDetailCategory";
import Layout from "./Layout";
import ViewListCategory from "./Modules/Category/ViewListCategory";
import AddCategory from "./Modules/Category/AddCategory";
import AddGroup from "./Modules/Group/AddGroup";
import ViewListGroup from "./Modules/Group/ViewListGroup";
import Dashboard from "./Modules/Dashboard/Dashboard";
import ViewDetailGroup from "./Modules/Group/ViewDetailGroup";
import ViewListFilm from "./Modules/Film/ViewListFilm";
import ViewDetailFilm from "./Modules/Film/ViewDetailFilm";
import AddFilm from "./Modules/Film/AddFilm";
import ViewListTheater from "./Modules/Theater/ViewListTheater";
import ViewDetailTheater from "./Modules/Theater/ViewDetailTheater";
import AddTheater from "./Modules/Theater/AddTheater";
import ViewListRoom from "./Modules/Room/ViewListRoom";
import ViewDetailRoom from "./Modules/Room/ViewDetailRoom";
import AddRoom from "./Modules/Room/AddRoom";
import ViewListTicket from "./Modules/Ticket/ViewListTicket";
import ViewDetailTicket from "./Modules/Ticket/ViewDetailTicket";
import AddTicket from "./Modules/Ticket/AddTicket";
import ViewListScheduler from "./Modules/Scheduler/ViewListScheduler";
import ViewDetailScheduler from "./Modules/Scheduler/ViewDetailScheduler";
import AddScheduler from "./Modules/Scheduler/AddScheduler";
import ViewListRoomSeat from "./Modules/RoomSeat/ViewListRoomSeat";
import ViewDetailRoomSeat from "./Modules/RoomSeat/ViewDetailRoomSeat";
import AddRoomSeat from "./Modules/RoomSeat/AddRoomSeat";
import ViewListSeat from "./Modules/Seat/ViewListSeat";
import ViewDetailSeat from "./Modules/Seat/ViewDetailSeat";
import AddSeat from "./Modules/Seat/AddSeat";
import ViewListBooking from "./Modules/Booking/ViewListBooking";
import ViewDetailSeatAdded from "./Modules/Seat/ViewDetailSeatAdded";
import ViewListNews from "./Modules/News/ViewListNews";
import ViewDetailNews from "./Modules/News/ViewDetailNews";
import AddNews from "./Modules/News/AddNews";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout><Dashboard /></Layout>} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

                {/* Category */}
                <Route path="/category" element={<Layout><ViewListCategory /></Layout>} />
                <Route path="/category/:id" element={<Layout><ViewDetailCategory /></Layout>} />
                <Route path="/add-category" element={<Layout><AddCategory /></Layout>} />
                {/*  End category  */}

                {/* Group */}
                <Route path="/group" element={<Layout><ViewListGroup /></Layout>} />
                <Route path="/group/:id" element={<Layout><ViewDetailGroup /></Layout>} />
                <Route path="/add-group" element={<Layout><AddGroup /></Layout>} />
                {/*  End group  */}

                {/* Film */}
                <Route path="/film" element={<Layout><ViewListFilm /></Layout>} />
                <Route path="/film/:id" element={<Layout><ViewDetailFilm /></Layout>} />
                <Route path="/add-film" element={<Layout><AddFilm /></Layout>} />
                {/*  End film  */}

                {/* Theater */}
                <Route path="/theater" element={<Layout><ViewListTheater /></Layout>} />
                <Route path="/theater/:id" element={<Layout><ViewDetailTheater /></Layout>} />
                <Route path="/add-theater" element={<Layout><AddTheater /></Layout>} />
                {/*  End theater  */}

                {/* Room */}
                <Route path="/room" element={<Layout><ViewListRoom /></Layout>} />
                <Route path="/room/:id" element={<Layout><ViewDetailRoom /></Layout>} />
                <Route path="/add-room" element={<Layout><AddRoom /></Layout>} />
                {/*  End Room  */}

                {/* Room */}
                <Route path="/ticket" element={<Layout><ViewListTicket /></Layout>} />
                <Route path="/ticket/:id" element={<Layout><ViewDetailTicket /></Layout>} />
                <Route path="/add-ticket" element={<Layout><AddTicket /></Layout>} />
                {/*  End Room  */}

                {/* scheduler */}
                <Route path="/scheduler" element={<Layout><ViewListScheduler /></Layout>} />
                <Route path="/scheduler/:id" element={<Layout><ViewDetailScheduler /></Layout>} />
                <Route path="/add-scheduler" element={<Layout><AddScheduler /></Layout>} />
                {/*  End scheduler  */}

                {/* room seat */}
                <Route path="/room-seat" element={<Layout><ViewListRoomSeat /></Layout>} />
                <Route path="/room-seat/:id" element={<Layout><ViewDetailRoomSeat /></Layout>} />
                <Route path="/add-room-seat" element={<Layout><AddRoomSeat /></Layout>} />
                {/*  End room seat  */}

                {/* Seat */}
                <Route path="/seat" element={<Layout><ViewListSeat /></Layout>} />
                <Route path="/seat/:id" element={<Layout><ViewDetailSeat /></Layout>} />
                <Route path="/seat-added/:id" element={<Layout><ViewDetailSeatAdded /></Layout>} />
                <Route path="/add-seat" element={<Layout><AddSeat /></Layout>} />
                {/*  End seat  */}

                {/* Booking */}
                <Route path="/booking" element={<Layout><ViewListBooking /></Layout>} />
                {/* End Booking */}

                {/* room seat */}
                <Route path="/news" element={<Layout><ViewListNews /></Layout>} />
                <Route path="/news/:id" element={<Layout><ViewDetailNews /></Layout>} />
                <Route path="/add-news" element={<Layout><AddNews /></Layout>} />
                {/*  End room seat  */}
            </Routes>
        </Router>
    );
};

export default App;
