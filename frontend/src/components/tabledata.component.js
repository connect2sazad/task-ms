import React, { useState } from 'react';

const TableData = ({ styles, columns, data, additionalComponent }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    // Function to reset current page to 1 when search term changes
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Function to sort data based on column and order
    const sortedData = () => {
        if (!sortColumn) return data;
        return data.slice().sort((a, b) => {
            const aValue = sortColumn.selector(a);
            const bValue = sortColumn.selector(b);
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    };

    // Filter and sort data based on search term, column, and order
    const filteredAndSortedData = sortedData().filter(row =>
        columns.some(column =>
            String(column.selector(row)).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Handle select menu change
    const handleItemsPerPageChange = e => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    // Next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredAndSortedData.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle column sorting
    const handleColumnSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    return (
        <>
            {/* Search and items per page select */}
            <div className="row my-3">
                <div className="col-3">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="col-6">{additionalComponent ? additionalComponent : ""}</div>
                <div className="col-3">
                    <select className="form-select mb-2" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value="5">5 rows per page</option>
                        <option value="10">10 rows per page</option>
                        <option value="15">20 rows per page</option>
                        <option value="15">50 rows per page</option>
                        <option value="15">100 rows per page</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
            </div>

            {/* Table */}
            <table className={styles ? styles : "table table-light table-hover"}>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} onClick={() => handleColumnSort(column)} style={{ cursor: 'pointer' }}>
                                {column.name}
                                {sortColumn === column && (
                                    <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{column.selector(row)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav aria-label="Pagination">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={prevPage}>Previous</button>
                    </li>
                    {Array.from({ length: Math.ceil(filteredAndSortedData.length / itemsPerPage) }, (_, index) => (
                        <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(filteredAndSortedData.length / itemsPerPage) ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default TableData;
