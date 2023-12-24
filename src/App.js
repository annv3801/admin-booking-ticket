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


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout><Dashboard /></Layout>} />

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
            </Routes>
        </Router>
    );
};

export default App;
