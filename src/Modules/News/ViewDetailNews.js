import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ViewDetailNews = () => {
    const { id } = useParams();
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

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`https://cinema.dummywebsite.me/News/View-News/${id}`);
            setMovies(response.data);

            const selectedCategories = response.data.data?.categoryIds || [];
            setSelectedCategories(selectedCategories);

            setUpdatedName(response.data.data?.title || '');
            setUpdatedDescription(response.data.data?.description || '');
            setFilmImage(response.data.data?.image || '');
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('title', updatedName);
            formData.append('id', id);
            formData.append('description', updatedDescription);
            // Append the file directly to the FormData
            formData.append('image', filmImage);

            // Make an API call to update the film using FormData
            await axios.put(`https://cinema.dummywebsite.me/News/Update-News`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });

            // Optionally, you can refetch the data to update the UI with the latest changes
            await fetchMovies().then(() => {
                navigate('/news');
            });
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
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
                        <span className="card-label fw-bold fs-3 mb-1">View Detail News</span>
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

export default ViewDetailNews;
