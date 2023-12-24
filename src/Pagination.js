import React from 'react';
import './Pagination.css'; // Import the CSS file

const Pagination = ({ currentPage, pageSize, total, onPageChange }) => {
    const totalPages = Math.ceil(total / pageSize);
    const maxPageNumbersToShow = 5;

    const getPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
        let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

        if (endPage - startPage + 1 < maxPageNumbersToShow) {
            startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className="my-8 d-flex justify-content-between">
            <div></div>
            <ul className="pagination">
                <li className="page-item previous">
                    <a href="#" className={`page-link ${currentPage === 1 ? 'd-none' : ''}`} onClick={() => onPageChange(currentPage - 1)}>
                        <i className="previous"></i>
                    </a>
                </li>
                {currentPage > Math.ceil(maxPageNumbersToShow / 2) && (
                    <>
                        <li className="page-item">
                            <a href="#" className="page-link" onClick={() => onPageChange(1)}>
                                1
                            </a>
                        </li>
                        {currentPage > Math.ceil(maxPageNumbersToShow / 2) + 1 && (
                            <li className="page-item">
                                <span className="page-link">...</span>
                            </li>
                        )}
                    </>
                )}

                {getPageNumbers().map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <a href="#" className="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                ))}

                {currentPage < totalPages - Math.floor(maxPageNumbersToShow / 2) && (
                    <>
                        {currentPage < totalPages - Math.floor(maxPageNumbersToShow / 2) && (
                            <li className="page-item">
                                <span className="page-link">...</span>
                            </li>
                        )}
                        <li className="page-item">
                            <a href="#" className="page-link" onClick={() => onPageChange(totalPages)}>
                                {totalPages}
                            </a>
                        </li>
                    </>
                )}
                <li className="page-item next">
                    <a href="#"  className={`page-link ${currentPage === totalPages ? 'd-none' : ''}`} onClick={() => onPageChange(currentPage + 1)}>
                        <i className="next"></i>
                    </a>
                </li>
            </ul>
        </div>

    );
};

export default Pagination;
