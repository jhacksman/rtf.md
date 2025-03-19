import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DataTable.css';

/**
 * A reusable data table component with sorting and pagination
 */
const DataTable = ({ 
  data, 
  columns, 
  pageSize = 10,
  defaultSortColumn = null,
  onRowClick = null
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedData, setSortedData] = useState([]);
  
  // Sort and paginate data when dependencies change
  useEffect(() => {
    let result = [...data];
    
    // Apply sorting if a sort column is specified
    if (sortColumn) {
      result.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    setSortedData(result);
  }, [data, sortColumn, sortDirection]);
  
  // Handle column header click for sorting
  const handleHeaderClick = (columnId) => {
    if (sortColumn === columnId) {
      // Toggle direction if already sorting by this column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and default to ascending
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);
  
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th 
                key={column.id}
                onClick={() => handleHeaderClick(column.id)}
                className={sortColumn === column.id ? `sorted-${sortDirection}` : ''}
              >
                {column.header}
                {sortColumn === column.id && (
                  <span className="sort-indicator">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map(column => (
                <td key={column.id}>{row[column.id]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired
    })
  ).isRequired,
  pageSize: PropTypes.number,
  defaultSortColumn: PropTypes.string,
  onRowClick: PropTypes.func
};

export default DataTable;
