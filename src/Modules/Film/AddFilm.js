import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddFilm = () => {
    const [movies, setMovies] = useState([]);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedSlug, setUpdatedSlug] = useState('');
    const [updatedDirector, setUpdatedDirector] = useState('');
    const [updatedActor, setUpdatedActor] = useState('');
    const [updatedPremiere, setUpdatedPremiere] = useState('');
    const [updatedDuration, setUpdatedDuration] = useState(0);
    const [updatedLanguage, setUpdatedLanguage] = useState('');
    const [updatedRated, setUpdatedRated] = useState('');
    const [updatedTrailer, setUpdatedTrailer] = useState('');
    const [updatedTotalRating, setUpdatedTotalRating] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedGroup, setUpdatedGroup] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [filmImage, setFilmImage] = useState('');
    const config = {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    const navigate = useNavigate();

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', updatedName);
            formData.append('slug', updatedSlug);
            selectedCategories.forEach((categoryId) => {
                formData.append('categoryIds', categoryId);
            });
            formData.append('groupId', updatedGroup);
            formData.append('description', updatedDescription);
            formData.append('director', updatedDirector);
            formData.append('actor', updatedActor);
            formData.append('premiere', updatedPremiere);
            formData.append('duration', updatedDuration);
            formData.append('language', updatedLanguage);
            formData.append('rated', updatedRated);
            formData.append('trailer', updatedTrailer);
            formData.append('totalRating', updatedTotalRating);

            // Append the file directly to the FormData
            formData.append('image', filmImage);

            // Make an API call to update the film using FormData
            await axios.put(`https://cinema.dummywebsite.me/Film/Create-Film`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(() => {
                navigate("/film")
            });

        } catch (error) {
            console.error('Error updating film:', error);
        }
    };


    const fetchCategories = async () => {
        try {
            const response = await axios.post('https://cinema.dummywebsite.me/Category/View-List-Categories', {}, config);
            // Assuming the API response contains an array of categories
            setCategoryOptions(response?.data?.data?.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await axios.post('https://cinema.dummywebsite.me/Group/View-List-Groups-Not-Have-Type', {}, config);
            // Assuming the API response contains an array of categories
            setGroupOptions(response?.data?.data?.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchGroups();
    }, []);

    // Handle multiple selections
    const handleTypeChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedCategories(selectedValues);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFilmImage(file);
    };

    console.log(groupOptions)
    console.log(updatedGroup)

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card mb-5 mb-xl-8">
                {/*begin::Header*/}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">Add Film</span>
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
                            placeholder="Input name"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Description</span>
                        </label>
                        <textarea
                            className="form-control form-control-lg form-control-solid"
                            name="description"
                            placeholder="Input description"
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Image</span>
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-lg form-control-solid"
                            name="filmImage"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    {filmImage && (
                        <div className="fv-row mb-8">
                            <img
                                src={`https://cinema.dummywebsite.me/resources/${filmImage}`}
                                alt="Film Image"
                                className="img-fluid"
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                        </div>
                    )}
                    <div className="fv-row mb-8">
                        <label className="required fs-6 fw-semibold mb-2">Category Ids</label>
                        <select
                            className="form-select form-select-solid"
                            data-control="select2"
                            data-hide-search="true"
                            data-placeholder="Select..."
                            name="settings_customer"
                            onChange={handleTypeChange}
                            multiple
                        >
                            {categoryOptions.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                    selected={selectedCategories.includes(category.id)}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="fv-row mb-8">
                        <label className="required fs-6 fw-semibold mb-2">Group</label>
                        <select
                            className="form-select form-select-solid"
                            data-control="select2"
                            data-hide-search="true"
                            data-placeholder="Select..."
                            name="settings_customer"
                            value={updatedGroup}
                            onChange={(e) => setUpdatedGroup(e.target.value)}
                        >
                            {groupOptions.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Director</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="director"
                            placeholder="Input director"
                            value={updatedDirector}
                            onChange={(e) => setUpdatedDirector(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Actor</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="actor"
                            placeholder="Input actor"
                            value={updatedActor}
                            onChange={(e) => setUpdatedActor(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Duration</span>
                        </label>
                        <input
                            type="number"
                            className="form-control form-control-lg form-control-solid"
                            name="duration"
                            placeholder="Input duration"
                            value={updatedDuration}
                            onChange={(e) => setUpdatedDuration(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Premiere</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="premiere"
                            placeholder="Input premiere"
                            value={updatedPremiere}
                            onChange={(e) => setUpdatedPremiere(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Language</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="language"
                            placeholder="Input language"
                            value={updatedLanguage}
                            onChange={(e) => setUpdatedLanguage(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Rated</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="rated"
                            placeholder="Input rated"
                            value={updatedRated}
                            onChange={(e) => setUpdatedRated(e.target.value)}
                        />
                    </div>
                    <div className="fv-row mb-8">
                        <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
                            <span className="required">Trailer</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            name="trailer"
                            placeholder="Input trailer"
                            value={updatedTrailer}
                            onChange={(e) => setUpdatedTrailer(e.target.value)}
                        />
                    </div>
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

export default AddFilm;
