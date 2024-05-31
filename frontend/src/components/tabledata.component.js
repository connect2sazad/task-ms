import React, { useState } from 'react';

const TableData = ({ styles, columns, data, additionalComponent }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

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

    const filteredAndSortedData = sortedData().filter(row =>
        columns.some(column =>
            String(column.selector(row)).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleItemsPerPageChange = e => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredAndSortedData.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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
                        <option value="50">50 rows per page</option>
                        <option value="100">100 rows per page</option>
                    </select>
                </div>
            </div>

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
                        <tr key={rowIndex} className={(row.is_active!=="Active") ? 'table-danger' : ''}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{column.selector(row)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

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
